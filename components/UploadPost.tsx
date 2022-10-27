import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { CameraIcon } from "@heroicons/react/outline";
import { Modal } from "antd";
import { ref, getDownloadURL, uploadString } from "@firebase/storage";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "@firebase/firestore";
import { db, storage } from "../firebase";

interface IUploadPostProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const UploadPost: NextPage<IUploadPostProps> = ({ open, setOpen }) => {
  const { data: session } = useSession();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const filePickerRef = useRef<HTMLInputElement | null>(null);
  const captionRef = useRef<HTMLInputElement | null>(null);

  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      username: session?.user?.name,
      caption: captionRef?.current?.value,
      profileImg: session?.user?.image,
      timestamp: serverTimestamp(),
    });
    console.log("docref", docRef);

    console.log("New doc added with ID", docRef.id);

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, selectedFile!, "data_url").then(async () => {
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, "posts", docRef.id), {
        image: downloadURL,
      });
    });

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

  const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (e?.target?.files?.[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = renderEvent => {
      setSelectedFile(renderEvent?.target?.result as string);
    }; //console.log("selectedFile", selectedFile);
  };

  return (
    <Modal
      open={open}
      footer={null}
      maskClosable={false}
      onCancel={() => setOpen(false)}
      width={380}
    >
      {selectedFile ? (
        <img
          src={selectedFile}
          referrerPolicy="no-referrer"
          className="w-full cursor-pointer object-contain"
          onClick={() => setSelectedFile(null)}
          alt=""
        />
      ) : (
        <div
          onClick={() => filePickerRef?.current?.click()}
          className="mx-auto flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-red-100"
        >
          <CameraIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
        </div>
      )}

      <div>
        <div className="mt-3 text-center sm:mt-5">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Upload a photo</h3>

          <div>
            <input ref={filePickerRef} type="file" hidden onChange={addImageToPost} />
          </div>

          <div className="mt-2">
            <input
              className="w-full border-none text-center focus:ring-0"
              ref={captionRef}
              type="text"
              placeholder="Please enter a caption..."
            />
          </div>
        </div>
      </div>

      <div className="mt-5 sm:mt-6">
        <button
          type="button"
          disabled={!selectedFile}
          onClick={uploadPost}
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 hover:bg-red-700 hover:disabled:bg-gray-300 sm:text-sm"
        >
          {loading ? "Uploading..." : "Upload Post"}
        </button>
      </div>
    </Modal>
  );
};
