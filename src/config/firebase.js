import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAIfTr46Rp4j_HlJ9fFUpKFQ3dBjDveUoA',
  authDomain: 'niryoned.firebaseapp.com',
  projectId: 'niryoned',
  storageBucket: 'niryoned.firebasestorage.app',
  messagingSenderId: '466421279068',
  appId: '1:466421279068:web:3af5e96d1eb452020bf999'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
