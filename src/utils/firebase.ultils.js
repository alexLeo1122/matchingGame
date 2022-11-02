import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { initializeApp } from 'firebase/app';
import { addDoc, setDoc, doc, getDoc } from 'firebase/firestore/lite';
import { basedHallOfFameData } from './basedData.ultils';

const firebaseConfig = {
    apiKey: 'AIzaSyDxRA-JKmvI2yX5Dn4dJoUmULRXavFaFTk',
    authDomain: 'gameprojects-b04ee.firebaseapp.com',
    projectId: 'gameprojects-b04ee',
    storageBucket: 'gameprojects-b04ee.appspot.com',
    messagingSenderId: '500145337575',
    appId: '1:500145337575:web:4abdd555a8862c3d439e42',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
let userRef = collection(db, 'users');

// Get a list of cities from your database

export async function iniData() {
    await setDoc(doc(userRef, 'topUsers'), {
        data: basedHallOfFameData,
    });
}

export const getTopUsers = async () => {
    const docRef = doc(db, 'users', 'topUsers');
    const docSnap = await getDoc(docRef);
    let topUsersDoc = docSnap.data();
    return topUsersDoc.data;
};
export async function setTopUsersAsync(dataArr) {
    await setDoc(doc(userRef, 'topUsers'), {
        data: dataArr,
    });
}
