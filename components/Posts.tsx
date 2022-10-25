import React from "react";
import type { NextPage } from "next";
import { Post } from "./Post";
import post from "../assets/post.jpeg";

export const Posts: NextPage = () => {
  const posts = [
    {
      id: "1",
      username: "himanshukashyap",
      profileImg: post?.src,
      image: post?.src,
      caption: "abcd",
    },
    {
      id: "2",
      username: "kashyaphimanshu",
      profileImg: post?.src,
      image: post?.src,
      caption: "pqrs",
    },
  ];

  return (
    <div>
      {posts?.map(post => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          userImg={post.profileImg}
          img={post.image}
          caption={post.caption}
        />
      ))}
    </div>
  );
};
