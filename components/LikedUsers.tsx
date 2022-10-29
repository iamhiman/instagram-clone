import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import type { NextPage } from "next";
import { Button, Modal } from "antd";
import { db } from "../firebase";
import { collection, onSnapshot, DocumentData } from "firebase/firestore";

interface ILikedUsersProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
}

export const LikedUsers: NextPage<ILikedUsersProps> = ({ open, setOpen, id }) => {
  const [likedUsers, setLikedUsers] = useState<DocumentData>([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), snapshot => setLikedUsers(snapshot.docs)),
    [id]
  );

  return (
    <Modal title="Likes" open={open} footer={null} onCancel={() => setOpen(false)} width={450}>
      {likedUsers?.map((d: DocumentData, i: number) => (
        <div className="flex justify-between" key={`${d.data().username}-${i}`}>
          <div className="flex">
            <img
              src={d?.data()?.userImg!}
              alt=""
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-solid object-contain"
            />
            <div className="ml-2">
              <p className="font-bold mb-0">{d?.data()?.username!}</p>
              <p className="text-gray-500">{d?.data()?.name!}</p>
            </div>
          </div>
          <Button type="primary">Follow</Button>
        </div>
      ))}
    </Modal>
  );
};
