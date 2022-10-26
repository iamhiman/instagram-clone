import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { Stories } from "./Stories";
import { fakeData } from "../fakeData";
import { MiniProfile } from "./MiniProfile";
import { Suggestions } from "./Suggestions";
import { Posts } from "./Posts";

interface IUsers {
  id: string;
  username: string;
  avatar: string;
  country: string;
}

export const Feed: NextPage = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState<IUsers[]>([]);

  useEffect(() => {
    setUsers(fakeData);
  }, []);

  return (
    <main className="w-[85vw] md:w-[55vw] lg:w-[75vw] mx-auto flex">
      <section className="w-[100%] max-w-lg lg:w-[60%] mx-auto">
        <div className="mx-auto mt-6 rounded-lg border border-gray-200 bg-white">
          <Stories users={users} />
        </div>
        <Posts />
      </section>

      {session && (
        <section className="w-[40%] hidden lg:block ml-4">
          <div className="fixed top-20">
            <MiniProfile />
            <Suggestions users={users} />
          </div>
        </section>
      )}
    </main>
  );
};

export default Feed;
