'use client';

import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { app } from '../firebase';
import Moment from 'react-moment';
import { toast } from 'sonner';
import { FaRegComment } from 'react-icons/fa';

export default function AddComment({ id }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const db = getFirestore(app);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!session) {
      toast.info('You need to login');
      return;
    }

    // Add comment to Firestore
    const commentToPost = comment;
    setComment('');
    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToPost,
      username: session?.user?.username,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    });
  }

  useEffect(() => {
    const commentsQuery = query(
      collection(db, 'posts', id, 'comments'),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
      setComments(snapshot.docs);
    });

    return () => unsubscribe();
  }, [db, id]);

  return (
    <div className="overflow-hidden">
      {comments.length > 0 && (
        <div className='mx-2 md:mx-4 max-h-24 md:max-h-48 pt-4 overflow-y-scroll'>
          {comments.map((comment, index) => (
            <div
              key={index}
              className='flex items-center space-x-2 mb-2 justify-between'
            >
              <img
                src={comment.data().userImage}
                alt='userimage'
                className='h-6 w-6 md:h-8 md:w-8 rounded-full object-cover border p-[2px]'
              />
              <p className='text-xs md:text-sm flex-1 truncate'>
                <span className='font-bold text-gray-700'>
                  {comment.data().username}
                </span>{' '}
                {comment.data().comment}
              </p>
              <Moment fromNow className='text-xs text-gray-400 pr-2'>
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}
      {session ? (
        <form onSubmit={handleSubmit} className='flex items-center p-0 md:p-4 md:gap-2 gap-1'>
          <img
            src={session.user.image}
            alt='userimage'
            className='h-8 w-8 md:h-10 md:w-10 rounded-full border p-[2px] md:p-[4px] object-cover'
          />
          <input
            type='text'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Add a comment...'
            className='border-none flex-1 focus:ring-0 outline-none text-xs md:text-sm'
          />
          <button
            disabled={!comment.trim()}
            type='submit'
            className='text-blue-400 disabled:cursor-not-allowed disabled:text-gray-400 text-xs md:text-base'
          >
            Post
          </button>
        </form>
      ) : (
        <div className='py-4 px-2'>
          <FaRegComment className='text-2xl md:text-3xl' />
        </div>
      )}
    </div>
  );
}
