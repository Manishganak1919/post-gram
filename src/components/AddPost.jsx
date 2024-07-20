import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoLogoYoutube } from "react-icons/io";
import { FaSquareInstagram } from "react-icons/fa6";
import { SiFacebook } from "react-icons/si";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

import AddLike from "./AddLike";
import Addcomment from "./Addcomment";
import Link from "next/link";

export default function AddPost({ post }) {
  return (
    <div className="bg-white my-7 border rounded-md mx-2 md:mx-0">
      <div className="flex items-center p-5 border-b border-gray-100">
        <img
          src={post.profileImg}
          alt={post.username}
          className="h-12 rounded-full object-cover border p-1 mr-3"
        />
        <p className="flex-1 font-bold">{post.username}</p>
        <div className="flex flex-row md:gap-5">
          <Link href="https:youtube.com">
            <IoLogoYoutube className="text-3xl text-red-500" />
          </Link>
          <Link href="https:instagram.com">
            <FaSquareInstagram className="hidden sm:block text-3xl text-pink-500" />
          </Link>
          <Link href="https:facebook.com">
            <SiFacebook className="hidden sm:block text-3xl text-blue-500" />
          </Link>
          <Link href="https:x.com">
            <FaSquareXTwitter className="hidden sm:block text-3xl" />
          </Link>
          <Link href="https:linkedin.com">
            <FaLinkedin className="hidden sm:block text-3xl text-blue-700" />
          </Link>
        </div>
        {/* <HiOutlineDotsVertical className="h-5 cursor-pointer" /> */}
      </div>
      <img
        src={post.image}
        alt={post.caption}
        className="object-cover w-full"
      />
      <p className="p-5 truncate">
        <span className="font-bold mr-2">{post.username}</span>
        {post.caption}
      </p>
      <div className="flex gap-4 ml-5 my-4">
        <AddLike id={post.id} />
        <Addcomment id={post.id} />
      </div>
    </div>
  );
}
