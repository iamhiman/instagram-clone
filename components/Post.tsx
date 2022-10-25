import React from "react";
import type { NextPage } from "next";
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

interface IPostProps {
  id: string;
  username: string;
  userImg: string;
  img: string;
  caption: string;
}

export const Post: NextPage<IPostProps> = ({ id, username, userImg, img, caption }) => {
  const isMobile500 = useMediaQuery({ query: "(max-width: 500px)" });

  return (
    <div className="my-7 rounded-lg border border-gray-200 bg-white">
      <div className="flex items-center p-5">
        <img
          src={userImg}
          referrerPolicy="no-referrer"
          alt=""
          className="mr-3 h-12 w-12 rounded-full border object-contain p-1"
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      <img src={img} referrerPolicy="no-referrer" className="w-screen object-contain" alt="" />

      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-4">
          <HeartIcon className="btn" />

          <ChatIcon className="btn" />
          <PaperAirplaneIcon className="btn" />
        </div>

        <BookmarkIcon className="btn" />
      </div>

      <div className="truncate p-5">
        <p className="mb-1 font-bold">5 likes</p>

        <span className="mr-1 font-bold">{username}</span>
        {caption}
      </div>

      <Form name="basic" initialValues={{ remember: true }} autoComplete="off">
        <Row>
          <Col span={isMobile500 ? 18 : 20}>
            <Form.Item name="comment">
              <Input
                placeholder="Add a comment..."
                bordered={false}
                prefix={<EmojiHappyIcon className="h-7" />}
              />
            </Form.Item>
          </Col>
          <Col span={isMobile500 ? 2 : 4}>
            <Form.Item>
              <Button type="text" htmlType="submit" className="font-semibold text-blue-400">
                Post
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      {/* <form className="flex items-center p-4">
        <EmojiHappyIcon className="h-7" />
        <input
          type="text"
          placeholder=" Add a comment..."
          className="flex-1 border-none outline-none focus:ring-0"
        />
        <button type="submit" className="font-semibold text-blue-400">
          Post
        </button>
      </form> */}
    </div>
  );
};
