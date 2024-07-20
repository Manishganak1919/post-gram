import React from 'react';
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from 'firebase/firestore';
import { app } from '@/firebase';
import AddPost from './AddPost';

export default async function Post() {
  const db = getFirestore(app);
  const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
  const querSnapshot = await getDocs(q);
  let data = [];
  querSnapshot.forEach((doc)=>{
    data.push({ id: doc.id, ...doc.data() });
  })
  return (
    <div>
    {data.map((post) => (
      <AddPost key={post.id} post={post} />
    ))}
  </div>
  )
}
