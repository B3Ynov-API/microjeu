import { Injectable } from '@angular/core';
import { initializeApp } from '@firebase/app';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable, finalize } from 'rxjs';
import { FileStorage } from './file-storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private basePath = '/uploads';
  app = initializeApp(environment.firebase);
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  // push file details to database
  async pushFileToStorage(fileStorage: FileStorage, id: string): Promise<Observable<number | undefined>> {
    if (!fileStorage.file) {
      throw new Error('File is null');
    }
    const filePath = `${this.basePath}/${id}`;
    console.log(filePath);
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileStorage.file);
  
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileStorage.url = downloadURL;
          fileStorage.name = fileStorage.file?.name || '';
          this.saveFileData(fileStorage);
        });
      })
    ).subscribe();
  
    return uploadTask.percentageChanges();
  }
  
  

  // Writes the file details to the realtime db
  private saveFileData(fileStorage: FileStorage): void {
    this.db.list(this.basePath).push(fileStorage);
  }
  
  //recup file details from database
  async getFile(key: string): Promise<FileStorage> {
    const itemRef = this.storage.ref(`${this.basePath}/${key}`);
    const url = await itemRef.getDownloadURL().toPromise();
    const metadata = await itemRef.getMetadata().toPromise();
    const fileStorage: FileStorage = {
      key: key,
      name: metadata.name || '',
      url: url,
      file: metadata.contentType ? new File([], metadata.name || '') : null,
      type: metadata.contentType || ''
    };
    return fileStorage;
  }
  
  //recup files details from database
  getFiles(numberItems: number): AngularFireList<FileStorage> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  //delete file details from database
  deleteFile(fileStorage: FileStorage): void {
    this.deleteFileDatabase(fileStorage.key)
      .then(() => {
        this.deleteFileStorage(fileStorage.name);
      })
      .catch(error => console.log(error));
  }

  //delete file details from database
  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  //delete file details from storage
  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
