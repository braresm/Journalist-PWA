import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  CollectionReference,
  DocumentData,
  Firestore,
  serverTimestamp,
} from '@angular/fire/firestore';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  listAll,
} from '@angular/fire/storage';
import { ArchiveMetadata } from '../interfaces/archive-metadata';
import { UploadFileResult } from '../interfaces/upload-file-result';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private archivesCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.archivesCollection = collection(this.firestore, 'archives');
  }

  async uploadFile(bucket: string, file: File): Promise<UploadFileResult> {
    const filePath = `${this.generateFilePath(bucket)}/${file.name}`;
    return this.uploadFileToPath(file, filePath);
  }

  async uploadFileToPath(file: File, path: string): Promise<UploadFileResult> {
    const storage = getStorage();
    const fileRef = ref(storage, path);

    const uploadSnapshot = await uploadBytes(fileRef, file);
    const downloadUrl = await getDownloadURL(uploadSnapshot.ref);

    // save file metadata in firestore collection
    const metadata: ArchiveMetadata = {
      name: file.name,
      extension: file.name.split('.').pop() || '',
      downloadUrl: downloadUrl,
      uploadedDate: serverTimestamp(),
    };
    const metadataDocument = await addDoc(this.archivesCollection, metadata);

    return {
      documentId: metadataDocument.id,
      downloadUrl: downloadUrl,
    };
  }

  private generateFilePath(bucket: string): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    return `${bucket}/${year}/${month}/${day}`;
  }
}
