import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDWLYN8_60ie_FFf4ZfSGnVtqualCKqR74',
  authDomain: 'niryoned-af52f.firebaseapp.com',
  projectId: 'niryoned-af52f',
  storageBucket: 'niryoned-af52f.firebasestorage.app',
  messagingSenderId: '339792524893',
  appId: '1:339792524893:web:7cfea47b7ca48ed1047fb4'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
