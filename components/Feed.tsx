import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { Stories } from "./Stories";
import { fakeData } from "../fakeData";
import { MiniProfile } from "./MiniProfile";
import { Suggestions } from "./Suggestions";

interface IUsers {
  id: string;
  username: string;
  avatar: string;
  country: string;
}

export const Feed: NextPage = () => {
  const [users, setUsers] = useState<IUsers[]>([]);

  useEffect(() => {
    setUsers(fakeData);
  }, []);

  return (
    <main className="w-[85vw] lg:w-[75vw] mx-auto flex">
      <section className="w-[100%] lg:w-[60%]">
        <div className="max-w-lg mx-auto mt-6 lg:mr-5 rounded-lg border border-gray-200 bg-white">
          <Stories users={users} />
        </div>
        <div className="h-[2000px]"></div>
      </section>

      <section className="w-[40%] hidden lg:block">
        <div className="fixed top-20">
          <MiniProfile />
          <Suggestions users={users} />
        </div>
      </section>
    </main>
  );
};

export default Feed;
