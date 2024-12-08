"use client";
import React from "react";
import Order from "../ui/Order";
import { useGetUserQuery } from "@/redux/api/auth";
import Cookies from "js-cookie";
import Image from "next/image";
import userIcon from "../../assets/img/user_icon.png";
import Link from "next/link";

const HomePage = () => {
  const userId = Cookies.get("userId");
  const { data } = useGetUserQuery(Number(userId));
  return (
    <div className="container">
      <div className="bg-neutral-900 h-[130px] flex items-center justify-start  px-6 gap-x-4">
        <Link
          href="/profile"
          className="w-[70px] h-[70px] rounded-full  overflow-hidden bg-white cursor-pointer  "
        >
          <Image src={userIcon} alt="userIcon" width={80} height={80} />
        </Link>
        <div className="flex flex-col gap-y-1 r">
          <Link
            href="/profile"
            className="text-[20px] text-white font-bold cursor-pointer  "
          >
            {data?.first_name} {data?.last_name}
          </Link>
          <Link
            href="/profile"
            className="text-[18px] text-neutral-400 cursor-pointer "
          >
            Профил
          </Link>
        </div>
      </div>
      <div className="content p-4 overflow-y-auto scroll-hidden bg-slate-50">
        <div className="flex  justify-center w-full pt-[20px] ">
          <Order />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
