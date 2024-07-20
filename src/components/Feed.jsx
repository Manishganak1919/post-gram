import React from 'react'
import Post from './Post'
import MiniProfile from './MiniProfile'

export default function Feed() {
  return (
    <main className='grid grid-cols-1 md:grid-cols-3 md:max-w-7xl mx-auto'>
      {/**for post section */}
      <section className='md:col-span-2'>
        <Post />
      </section>

      {/***for mini profile **/}
      <section className='hidden md:inline-grid md:col-span-1'>
        <MiniProfile />
      </section>
    </main>
  )
}
