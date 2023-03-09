import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, getDoc, doc, query, where } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyDKIevVslWpWGQCCyMnqVaEIGrUBF4qBOc',
  authDomain: 'vanlife-b75e6.firebaseapp.com',
  projectId: 'vanlife-b75e6',
  storageBucket: 'vanlife-b75e6.appspot.com',
  messagingSenderId: '479201759319',
  appId: '1:479201759319:web:cabd80f0074ebe9a215312',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//reference to the collention of vans in our database
const vansCollectionRef = collection(db, 'vans');
//get all documents in the collection
//save in an array of objects and add the id of the document id to each one
export async function getAllVans() {
  const querySnapshot = await getDocs(vansCollectionRef);
  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return dataArr;
}
//get a vans from database with the dociment id of id
export async function getVan(id) {
  const docRef = doc(db, 'vans', id);
  const vanSnapshot = await getDoc(docRef);
  return {
    ...vanSnapshot.data(),
    id: vanSnapshot.id,
  };
}
//create a querry to find the vans with the hostId 123 and pas that querry to the detDocs
export async function getHostVans() {
  const q = query(vansCollectionRef, where('hostId', '==', '123'));
  const querySnapshot = await getDocs(q);
  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return dataArr;
}
