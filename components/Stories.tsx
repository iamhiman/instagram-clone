import React from "react";
import type { NextPage } from "next";
import { Carousel } from "antd";
import { useMediaQuery } from "react-responsive";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/outline";
import { Story } from "./Story";

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
        <Story key={user?.id} img={user?.avatar} username={user?.username} />
      ))}
    </Carousel>
  );
};
