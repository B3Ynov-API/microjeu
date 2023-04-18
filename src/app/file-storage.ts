export class FileStorage {
  key!: string;
  name!: string;
  url!: string;
  file: File | null;
  type!: string;

  constructor(file: File | null) {
    this.file = file ?? new File([], '');
  }
}
