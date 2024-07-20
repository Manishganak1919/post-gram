"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function MiniProfile() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="flex items-center justify-between mt-14 w-full">
      <div className="flex items-center gap-5 ml-10">
        <img
          src={session?.user?.image || "/verified.png"}
          alt="user-profile-pic or post-gram logo"
          className="w-16 h-16 rounded-full border p-[2px]"
        />
        <div>
          <h3 className="text-normal text-blue-800 font-semibold">
            {session?.user?.username}
          </h3>
          <span className="text-base text-gray-500">Welcome to Tick</span>
        </div>
      </div>

      {session ? (
        <button
          onClick={signOut}
          className="text-red-500 text-sm font-semibold"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={signIn}
          className="text-blue-500 text-sm font-semibold"
        >
          Sign In
        </button>
      )}
    </div>
  );
}
