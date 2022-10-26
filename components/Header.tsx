import type { NextPage } from "next";
import React from "react";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { Input } from "antd";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Instagram from "../assets/instagram.webp";
import InstaIcon from "../assets/instaicon.webp";

export const Header: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="sticky top-0 z-50 border-b bg-white shadow-sm flex justify-around items-center p-4">
      <div>
        <img
          src={Instagram?.src}
          alt=""
          className="hidden h-6 sm:h-8 sm:block cursor-pointer"
          onClick={() => router.push("/")}
        />
        <img
          src={InstaIcon?.src}
          alt=""
          className="h-6 sm:h-8 sm:hidden cursor-pointer"
          onClick={() => router.push("/")}
        />
      </div>

      <div>
        <Input
          placeholder="Search"
          prefix={<SearchIcon className="w-6 text-gray-200" />}
          className="rounded-md hidden sm:flex"
          allowClear={true}
        />
      </div>

      <div className="flex items-center justify-end space-x-4">
        <HomeIcon className="navBtn" onClick={() => router.push("/")} />

        {session ? (
          <>
            <div className="navBtn relative">
              <PaperAirplaneIcon className="navBtn rotate-45" />
              <div className="absolute -top-1 -right-2 flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-red-500 text-xs text-white">
                3
              </div>
            </div>
            <PlusCircleIcon className="navBtn" />
            <UserGroupIcon className="navBtn" />
            <HeartIcon className="navBtn" />
            <img
              src={session?.user?.image!}
              alt="profile pic"
              className="h-10 w-10 cursor-pointer rounded-full"
              referrerPolicy="no-referrer"
              onClick={() => signOut()}
            />
          </>
        ) : (
          <button onClick={() => signIn()}>Sign In</button>
        )}
      </div>
    </div>
  );
};
