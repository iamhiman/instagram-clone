import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { Button, Form, Input, Row, Col } from "antd";
import { useMediaQuery } from "react-responsive";
import Moment from "react-moment";
import { db } from "../firebase";
import { LikedUsers } from "./LikedUsers";

interface IPostProps {
  id: string;
  username: string;
  userImg: string;
  img: string;
  caption: string;
}

interface IFormValue {
  comment: string;
}

export const Post: NextPage<IPostProps> = ({ id, username, userImg, img, caption }) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [likes, setLikes] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const isMobile500 = useMediaQuery({ query: "(max-width: 500px)" });
  const [form] = Form.useForm<IFormValue>();

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts", id, "comments"), orderBy("timestamp", "desc")),
        snapshot => setComments(snapshot.docs)
      ),
    [id]
  );

  useEffect(
    () => onSnapshot(collection(db, "posts", id, "likes"), snapshot => setLikes(snapshot.docs)),
    [id]
  );

  useEffect(
    () => setHasLiked(likes?.findIndex(like => like.id === session?.user?.uid) !== -1),
    [likes, session?.user?.uid]
  );

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid!));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session?.user?.uid!), {
        username: session?.user?.username,
        userImg: session?.user?.image,
        name: session?.user?.name,
      });
    }
  };

  const sendComment = async (values: IFormValue) => {
    const val = { ...values };
    form.resetFields();

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: val?.comment,
      username: session?.user?.username,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="my-7 rounded-lg border border-gray-200 bg-white">
      <div className="flex items-center p-5">
        <img
          src={userImg}
          referrerPolicy="no-referrer"
          alt=""
          className="mr-3 h-12 w-12 rounded-full border object-contain p-1"
        />
        <p className="flex-1 font-bold mb-0">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      <img src={img} referrerPolicy="no-referrer" className="w-screen object-contain" alt="" />

      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled className="btn text-red-500" onClick={likePost} />
            ) : (
              <HeartIcon className="btn" onClick={likePost} />
            )}

            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>

          <BookmarkIcon className="btn" />
        </div>
      )}

      <div className="truncate p-5 pt-3 pb-0">
        {likes.length > 0 && (
          <p className="mb-1 font-bold" onClick={() => session && setOpen(true)}>
            {likes.length} likes
          </p>
        )}

        {open && <LikedUsers open={open} setOpen={setOpen} id={id} />}

        <p className="">
          <span className="mr-1 font-bold">{username}</span>
          <span>{caption}</span>
        </p>
      </div>

      {comments.length > 0 && (
        <div className="ml-5 max-h-40 overflow-y-scroll hideScroll">
          {comments?.map(comment => (
            <div key={comment.id} className="mb-3 flex">
              <img
                className="h-7 rounded-full mr-2"
                src={comment.data().userImage}
                alt=""
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="text-sm mb-0 pr-4">
                  <span className="font-bold">{comment.data().username}</span>{" "}
                  {comment.data().comment}
                </p>
                <Moment fromNow className="pr-5 text-xs">
                  {comment.data().timestamp?.toDate()}
                </Moment>
              </div>
            </div>
          ))}
        </div>
      )}

      {session && (
        <Form
          form={form}
          name="basic"
          initialValues={{ comment: "" }}
          autoComplete="off"
          onFinish={sendComment}
        >
          <Row>
            <Col span={isMobile500 ? 18 : 20}>
              <Form.Item name="comment">
                <Input
                  placeholder="Add a comment..."
                  bordered={false}
                  prefix={<EmojiHappyIcon className="h-7" />}
                  className="flex-1 border-none outline-none focus:ring-0"
                />
              </Form.Item>
            </Col>
            <Col span={isMobile500 ? 2 : 4}>
              <Form.Item noStyle shouldUpdate>
                {({ getFieldsValue }) => {
                  const { comment } = getFieldsValue();
                  const formIsComplete = comment?.trim();
                  return (
                    <Button
                      type="text"
                      htmlType="submit"
                      disabled={!formIsComplete}
                      className="font-semibold text-blue-400"
                    >
                      Post
                    </Button>
                  );
                }}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </div>
  );
};
