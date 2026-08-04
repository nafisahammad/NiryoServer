import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDWLYN8_60ie_FFf4ZfSGnVtqualCKqR74',
  authDomain: 'niryoned-af52f.firebaseapp.com',
  projectId: 'niryoned-af52f',
  storageBucket: 'niryoned-af52f.firebasestorage.app',
  messagingSenderId: '339792524893',
  appId: '1:339792524893:web:7cfea47b7ca48ed1047fb4'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const samples = [
  {
    title: 'Pick and Place Demo',
    author: 'AI & Robotics Lab',
    category: 'Pick and Place',
    description: 'Classic Niryo NED pick-and-place routine using the vision kit to detect and relocate blocks. Check the code for the full calibration and sequence.',
    repoUrl: 'https://github.com/nafisahammad/NiryoServer',
    tags: ['vision', 'pick-and-place'],
    images: []
  },
  {
    title: 'Custom End Effector',
    author: 'Lab Student',
    category: 'Robotics',
    description: 'A 3D-printed gripper attachment designed for the NED flange to handle soft objects without damage.',
    repoUrl: '',
    tags: ['hardware'],
    images: []
  }
]

for (const s of samples) {
  await addDoc(collection(db, 'projects'), { ...s, createdAt: serverTimestamp() })
  console.log('Seeded:', s.title)
}

console.log('Done')
process.exit(0)
