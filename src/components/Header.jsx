"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Modal from "react-modal";
import { ImCross } from "react-icons/im";
import { BsFillCloudUploadFill } from "react-icons/bs";

export default function Header() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
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
            className="hidden sm:block" // Hide logo on mobile
          />
        </Link>
        {/** search input **/}
        <input
          type="text"
          placeholder="Search...."
          className="hidden sm:block bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[310px]" // Hide search bar on mobile
        />

        {/** menu items **/}
        {session ? (
          <div className="flex justify-between w-full sm:w-auto lg:gap-6 gap-3">
            <div className="flex items-center">
              <button
                className="px-6 py-3 bg-blue-700 text-white rounded-md"
                onClick={() => setIsOpen(true)}
              >
                Post Now
              </button>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={session.user.image}
                alt={session.user.name}
                className="w-14 h-14 rounded-full cursor-pointer"
                onClick={signOut}
              />
              <span>{session.user.name}</span>
            </div>
          </div>
        ) : (
          <button onClick={signIn} className="text-sm font-semibold">
            Log In
          </button>
        )}
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-gray-300 border-2 rounded-md shadow-md"
        >
          <div className="flex flex-col justify-center items-center h-[100%]">
            <BsFillCloudUploadFill className="text-7xl text-blue-800" />
          </div>
          <input
            type="text"
            maxLength="150"
            placeholder="write something about post..."
            className="m-4 border-none text-black text-center bg-gray-300 w-full focus:ring-0 outline-none"
          />
          <button
            disabled
            className="w-full bg-blue-700 text-white p-2 shadow-md rounded-lg hover:brightness-105 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
          >
            Upload Post
          </button>
          <ImCross
            className="cursor-pointer absolute top-2 right-2 text-2xl text-red-600 transition duration-300"
            onClick={() => setIsOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
