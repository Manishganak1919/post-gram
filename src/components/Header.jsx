"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Modal from "react-modal";
import { ImCross } from "react-icons/im";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { app } from "@/firebase";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export default function Header() {
  const { data: session } = useSession();
  console.log(session);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [postuploading, setPostuploading] = useState(false);
  const [caption, setCaption] = useState('');
  const filepickerRef = useRef(null);

  const addImagetoPost = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  async function uploadImageToStorage() {
    if (!selectedFile) return;

    setImageFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + selectedFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error(error);
        setImageFileUploading(false);
        setImageFileUrl(null);
        setSelectedFile(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setImageFileUploading(false);
        });
      }
    );
  }

  async function handleSubmit() {
    setPostuploading(true);
    try {
      const docRef = await addDoc(collection(getFirestore(app), "posts"), {
        username: session.user.username,
        caption: caption,
        profileImg: session.user.image,
        image: imageFileUrl,
        timestamp: serverTimestamp(),
      });
      setPostuploading(false);
      setIsOpen(false);
      location.reload();
    } catch (error) {
      console.error("Error adding document: ", error);
      setPostuploading(false);
    }
  }

  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage();
    }
  }, [selectedFile]);

  return (
    <div className="shadow-sm border-b sticky top-0 bg-blue-100 z-30 p-3">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/">
          <Image
            src="/verified.png"
            width={76}
            height={76}
            alt="postgram logo"
            className={`${!session ? "hidden sm:block" : ""}`}
          />
        </Link>
        <input
          type="text"
          placeholder="Search...."
          className="hidden sm:block bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[310px]"
        />
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
            </div>
          </div>
        ) : (
          <button
            onClick={signIn}
            className="text-sm px-6 py-2 bg-blue-500 text-white rounded-2xl font-semibold"
          >
            Log In
          </button>
        )}
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-gray-300 border-2 rounded-md shadow-md"
        >
          <div className="flex flex-col justify-center items-center h-[100%] cursor-pointer mt-3">
            {selectedFile ? (
              <img
                onClick={() => setSelectedFile(null)}
                src={imageFileUrl}
                alt="selected file"
                className="w-full max-h-[310px] object-cover cursor-pointer"
              />
            ) : (
              <BsFillCloudUploadFill
                onClick={() => filepickerRef.current.click()}
                className="text-7xl text-blue-800"
              />
            )}
            <input
              hidden
              ref={filepickerRef}
              type="file"
              accept="image/*"
              onChange={addImagetoPost}
            />
          </div>
          <input
            type="text"
            maxLength="150"
            placeholder="Write something about the post..."
            className="m-4 border-none text-black text-center bg-gray-300 w-full focus:ring-0 outline-none"
            onChange={(e) => setCaption(e.target.value)}
          />
          {imageFileUploading && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
          <button
            disabled={
              !selectedFile ||
              caption.trim() === '' ||
              postuploading ||
              imageFileUploading
            }
            className="w-full bg-blue-700 text-white p-2 shadow-md rounded-lg hover:brightness-105 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
            onClick={handleSubmit}
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
