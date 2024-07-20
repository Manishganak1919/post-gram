import Feed from '@/components/Feed'
import React from 'react'
import { Toaster, toast } from "sonner";

export default function Home() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <Feed />
    </>
  )
}
