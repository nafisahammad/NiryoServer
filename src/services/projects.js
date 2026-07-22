import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  query,
  orderBy,
  limit,
  where,
  startAfter,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '../config/firebase'

const COLLECTION = 'projects'

export const fetchProjects = async (options = {}) => {
  const { pageSize = 12, lastDoc = null, category = null } = options

  let q = query(
    collection(db, COLLECTION),
    orderBy('createdAt', 'desc')
  )

  if (category) {
    q = query(q, where('category', '==', category))
  }

  if (lastDoc) {
    q = query(q, startAfter(lastDoc))
  }

  q = query(q, limit(pageSize))

  const snapshot = await getDocs(q)
  const projects = snapshot.docs.map(d => ({
    id: d.id,
    ...d.data(),
    createdAt: d.data().createdAt?.toDate?.() || new Date(),
    updatedAt: d.data().updatedAt?.toDate?.() || new Date()
  }))

  return {
    projects,
    lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
    hasMore: snapshot.docs.length === pageSize
  }
}

export const fetchProject = async (projectId) => {
  const docRef = doc(db, COLLECTION, projectId)
  const snapshot = await getDoc(docRef)

  if (!snapshot.exists()) {
    throw new Error('Project not found')
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
    createdAt: snapshot.data().createdAt?.toDate?.() || new Date(),
    updatedAt: snapshot.data().updatedAt?.toDate?.() || new Date()
  }
}

export const createProject = async (data) => {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  })

  return docRef.id
}
