"use client";
import SignInForm from "@/components/ui/SignInForm";
import Link from "next/link";
import React from "react";
import { SlArrowLeft } from "react-icons/sl";

const Login = () => {
  return (
    <div>
      <div className="container px-4  relative   ">
        <div className="flex flex-col gap-y-[40px] w-full h-screen  justify-center ">
          <h1 className="text-black font-bold text-[30px] text-center">Вход</h1>
          <SignInForm />
        </div>
        <Link href="/auth" className="absolute top-[50px] left-0">
          <SlArrowLeft size={30} className=" text-black" />
        </Link>
      </div>
    </div>
  );
};

export default Login;
