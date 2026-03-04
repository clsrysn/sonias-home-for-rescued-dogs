import { db } from "./config";
import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, where, orderBy, limit, serverTimestamp, Timestamp } from "firebase/firestore";

// Types for our data
export interface Dog {
  id?: string;
  name: string;
  age: string;
  description: string;
  image: string;
  adopted: boolean;
  category: string;
  backgroundStory?: string;
  personality?: string;
  medicalInformation?: string;
  adoptionDetails?: string;
  galleryImages?: string; // Directory path for photo gallery
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Donation {
  id?: string;
  name: string;
  email: string;
  amount: number;
  type: 'one-time' | 'monthly' | 'sponsor';
  dogId?: string;
  message?: string;
  createdAt?: Date;
}

// Dogs collection operations
export const dogsCollection = collection(db, "dogs");

export const getAllDogs = async (): Promise<Dog[]> => {
  const snapshot = await getDocs(dogsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Dog));
};

export const getDogById = async (id: string): Promise<Dog | null> => {
  const docRef = doc(db, "dogs", id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Dog : null;
};

export const addDog = async (dog: Omit<Dog, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  const docRef = await addDoc(dogsCollection, {
    ...dog,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return docRef.id;
};

export const updateDog = async (id: string, dog: Partial<Dog>): Promise<void> => {
  const docRef = doc(db, "dogs", id);
  await updateDoc(docRef, { ...dog, updatedAt: serverTimestamp() });
};

export const deleteDog = async (id: string): Promise<void> => {
  const docRef = doc(db, "dogs", id);
  await deleteDoc(docRef);
};

export const getAvailableDogs = async (): Promise<Dog[]> => {
  const q = query(dogsCollection, where("adopted", "==", false), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Dog));
};

// Donations collection operations
export const donationsCollection = collection(db, "donations");

export const getAllDonations = async (): Promise<Donation[]> => {
  const snapshot = await getDocs(donationsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Donation));
};

export const addDonation = async (donation: Omit<Donation, 'id' | 'createdAt'>): Promise<string> => {
  const docRef = await addDoc(donationsCollection, {
    ...donation,
    createdAt: new Date()
  });
  return docRef.id;
};

export const getDonationsByDog = async (dogId: string): Promise<Donation[]> => {
  const q = query(donationsCollection, where("dogId", "==", dogId), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Donation));
};
