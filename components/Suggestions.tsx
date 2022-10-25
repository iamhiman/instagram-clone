import React from "react";
import type { NextPage } from "next";

interface IUsers {
  id: string;
  username: string;
  avatar: string;
  country: string;
}

interface ISuggestionsProps {
  users: IUsers[];
}

export const Suggestions: NextPage<ISuggestionsProps> = ({ users }) => {
  return (
    <div>
      <div className="mt-4 ml-10">
        <div className="mb-5 flex justify-between text-sm">
          <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
          <button className="font-semibold text-gray-600">See All</button>
        </div>
      </div>
      {users?.slice(10, 15).map(profile => (
        <div key={profile?.id} className="mt-3 ml-10 flex items-center justify-between">
          <img
            className="h-10 w-10 rounded-full border p-[2px]"
            src={profile?.avatar}
            referrerPolicy="no-referrer"
            alt=""
          />

          <div className="ml-4 flex-1">
            <h2 className="text-sm font-semibold">{profile?.username}</h2>
            <h3 className="text-xs text-gray-400">Works in {profile?.country}</h3>
          </div>
          <button className="text-sm text-blue-400">Follow</button>
        </div>
      ))}
    </div>
  );
};
