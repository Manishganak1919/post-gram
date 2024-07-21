import React from 'react';
import Post from './Post';
import MiniProfile from './MiniProfile';

export default function Feed() {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-3 lg:max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
      {/** For post section */}
      <section className="lg:col-span-2">
        <Post />
      </section>
      {/** For mini profile */}
      <section className="hidden lg:inline-grid lg:col-span-1">
        <div className='lg:fixed w-full lg:w-[300px] xl:w-[427px]'>
          <MiniProfile />
        </div>
      </section>
    </main>
  );
}
