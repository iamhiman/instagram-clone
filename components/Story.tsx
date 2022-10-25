import React from "react";
import type { NextPage } from "next";

interface IStoryProps {
  img: string | undefined | null;
  username: string | undefined | null;
}

export const Story: NextPage<IStoryProps> = ({ img, username }) => {
  return (
    <div className="pt-4 pl-2">
      <img
        src={img!}
        referrerPolicy="no-referrer"
        alt=""
        className="h-14 w-14 transform cursor-pointer rounded-full border-2 border-solid border-red-500 object-contain p-[1.5px] transition duration-200 ease-out hover:scale-110"
      />
      <p className="w-14 truncate text-center text-xs">{username}</p>
    </div>
  );
};
