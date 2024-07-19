"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { signIn , signOut, useSession} from "next-auth/react";

export default function Header() {

  const {data: session} = useSession();
  console.log(session);


  return (
    <div className="shadow-sm border-b sticky top-0 bg-blue-100 z-30 p-3">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="">
          <Image
            src="/verified.png"
            width={76}
            height={76}
            alt="postgram logo"
          />
        </Link>
        {/**serach input** */}
        <input
          type="text"
          placeholder="Search...."
          className="bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[310px]"
        />

        {/**menu items */}

        {session ? (
          <div className="flex flex-col items-center">
             <img src={session.user.image} alt={session.user.name} className="w-14 h-14 rounded-full cursor-pointer" onClick={signOut}/>
             <span>{session.user.name}</span>
          </div>
        ):(
           <button onClick={signIn} className="text-sm font-semibold">
           Log In
          </button>
        )}
       
      </div>
    </div>
  );
}
