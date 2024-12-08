import SignUpForm from "@/components/ui/SignUpForm";
import Link from "next/link";
import React from "react";
import { SlArrowLeft } from "react-icons/sl";

const SignUp = () => {
  return (
    <div className="w-full pt-[30px] h-screen ">
      <div className="container px-4 relative  h-full flex items-center w-full ">
        <div className="flex flex-col gap-y-5 w-full  ">
          <div className="flex flex-col items-center">
            <h1 className="text-black font-bold text-[30px]">Регистрация</h1>
            <p className="text-black text-center text-[18px]">( Покупатель )</p>
          </div>
          <SignUpForm />
          <div className="flex items-center gap-x-1 justify-center">
            <p className="tex-black text-[16px] font-thin">
              У вас уже есть аккаунт?
            </p>
            <Link
              href="/auth/login"
              className="text-black font-bold text-[16px]"
            >
              Войти
            </Link>
          </div>
        </div>
        <Link href="/auth" className="absolute top-[30px] left-0">
          <SlArrowLeft size={30} className=" text-black" />
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
