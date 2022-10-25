import type { NextPage } from "next";

export const MiniProfile: NextPage = () => {
  return (
    <div className="mt-8 ml-10 flex items-center justify-between">
      <img
        src={"https://randomuser.me/api/portraits/men/98.jpg"}
        referrerPolicy="no-referrer"
        alt="kk"
        className="h-16 w-16 rounded-full border p-[2px]"
      />

      <div className="mx-4 flex-1">
        <h2 className="font-bold">username</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
      </div>

      <button className="text-sm font-semibold text-blue-400">Sign Out</button>
    </div>
  );
};
