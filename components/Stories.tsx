import React from "react";
import type { NextPage } from "next";
import { Carousel } from "antd";
import { useMediaQuery } from "react-responsive";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/outline";

interface IUsers {
  id: string;
  username: string;
  avatar: string;
  country: string;
}

interface IStoriesProps {
  users: IUsers[];
}

interface IArrowProps {
  className?: string;
  style?: React.CSSProperties;
  arrowType?: JSX.Element;
  onClick?: () => void;
}

export const Stories: NextPage<IStoriesProps> = ({ users }) => {
  const isMobile640 = useMediaQuery({ query: "(max-width: 640px)" });
  const isMobile450 = useMediaQuery({ query: "(max-width: 450px)" });
  const isMobile400 = useMediaQuery({ query: "(max-width: 400px)" });

  const ArrowClick = ({ className, style, arrowType, onClick }: IArrowProps) => {
    return (
      <div
        className={className}
        style={{
          ...style,
          color: "black",
          fontSize: "16px",
          lineHeight: "1.5",
        }}
        onClick={onClick}
      >
        {arrowType}
      </div>
    );
  };

  return (
    <Carousel
      slidesToShow={isMobile400 ? 4 : isMobile450 ? 5 : isMobile640 ? 6 : 7}
      slidesToScroll={isMobile400 ? 4 : isMobile450 ? 5 : isMobile640 ? 6 : 7}
      dots={false}
      arrows={true}
      infinite={false}
      nextArrow={<ArrowClick arrowType={<ChevronRightIcon />} />}
      prevArrow={<ArrowClick arrowType={<ChevronLeftIcon />} />}
    >
      {users?.map(user => (
        <div key={user?.id} className="pt-4 pl-2">
          <img
            src={user?.avatar!}
            referrerPolicy="no-referrer"
            alt=""
            className="h-14 w-14 transform cursor-pointer rounded-full border-2 border-solid border-red-500 object-contain p-[1.5px] transition duration-200 ease-out hover:scale-110"
          />
          <p className="w-14 truncate text-center text-xs">{user?.username}</p>
        </div>
      ))}
    </Carousel>
  );
};
