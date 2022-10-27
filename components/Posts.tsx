import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  DocumentData,
} from "@firebase/firestore";
import type { NextPage } from "next";
import { db } from "../firebase";
import { Post } from "./Post";

export const Posts: NextPage = () => {
  const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

  useEffect(
    () =>
      onSnapshot(query(collection(db, "posts"), orderBy("timestamp", "desc")), snapshot => {
        setPosts(snapshot.docs);
      }),
    []
  );

  return (
    <div>
      {posts?.map(post => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
};
