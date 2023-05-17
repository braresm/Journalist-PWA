import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  collection,
  doc,
  docData,
  serverTimestamp,
  addDoc,
  updateDoc,
  deleteDoc,
  collectionData,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PlannerItem } from '../interfaces/planner-item';

@Injectable({
  providedIn: 'root',
})
export class PlannerService {
  private plannerItemsCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.plannerItemsCollection = collection(this.firestore, 'plannerItems');
  }

  getPlannerItem(id: string) {
    const feedDocumentReference = doc(this.firestore, `plannerItems/${id}`);
    return docData(feedDocumentReference, { idField: 'id' });
  }

  create(plannerItem: PlannerItem) {
    plannerItem.createdDate = serverTimestamp();
    return addDoc(this.plannerItemsCollection, plannerItem);
  }

  update(plannerItem: PlannerItem) {
    const itemDocumentReference = doc(
      this.firestore,
      `plannerItems/${plannerItem.id}`
    );
    return updateDoc(itemDocumentReference, { ...plannerItem });
  }

  delete(id: string) {
    const itemDocumentReference = doc(this.firestore, `plannerItems/${id}`);
    return deleteDoc(itemDocumentReference);
  }

  getPlannerItems() {
    const plannerQuery = query(
      this.plannerItemsCollection,
      where('active', '==', true)
    );

    return collectionData(plannerQuery, {
      idField: 'id',
    }) as Observable<PlannerItem[]>;
  }
}
