"use client";
import { useGetUserQuery } from "@/redux/api/auth";
import Cookies from "js-cookie";
import Image from "next/image";
import React from "react";
import userIcon from "../../assets/img/user_icon.png";

const Header = () => {
  const userId = Cookies.get("userId");
  const { data } = useGetUserQuery(Number(userId));

  return (
    <header>
      <div className="container">
        <div className="bg-neutral-900 h-[130px] flex items-center justify-start  px-6 gap-x-4">
          <div className="w-[70px] h-[70px] rounded-full  overflow-hidden bg-white cursor-pointer  ">
            <Image src={userIcon} alt="userIcon" width={80} height={80} />
          </div>
          <div className="flex flex-col gap-y-1 r">
            <p className="text-[20px] text-white font-bold cursor-pointer ">
              {data?.first_name} {data?.last_name}
            </p>
            <p className="text-[18px] text-neutral-400 cursor-pointer ">
              Профил
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
