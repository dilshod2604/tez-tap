"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import logo from "../../../assets/logo/logo.jpg";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useGetUserQuery } from "@/redux/api/auth";
import Preloader from "@/components/ui/Preloader";

const Welcome = () => {
  const userId = Cookies.get("userId");
  const userIdNumber = Number(userId);
  const router = useRouter();
  const {
    data,
    error,
    isLoading: queryLoading,
  } = useGetUserQuery(userIdNumber, { skip: !userIdNumber });

  useEffect(() => {
    if (!data?.email || error) {
      router.push("/auth");
    } else if (data.email) {
      router.push("/");
    }
  }, [data, router]);

  if (queryLoading) {
    return <Preloader />;
  }

  return (
    <div className="w-full h-full pt-[100px]">
      <div className="container p-4">
        <div className="flex flex-col gap-y-[150px] justify-center w-full h-full">
          <div className="flex flex-col gap-y-[50px]">
            <div className="flex flex-col items-center gap-y-2">
              <Image
                src={logo}
                alt="logo"
                width={100}
                height={100}
                className="rounded-full"
              />
              <p className="text-black font-bold">Tez Tap</p>
            </div>
            <div className="flex items-center flex-col gap-y-4">
              <h1 className="text-black font-bold text-[30px] text-center">
                Быстрый поиск запчастей
              </h1>
              <p className="text-black font-normal text-[18px] text-center">
                Найдите нужные запчасти для вашего автомобиля
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-[20px] items-center">
            <Link
              href="/dashboard"
              className="w-full flex items-center justify-center bg-black text-white font-bold text-[18px] py-4 rounded-xl"
            >
              Продолжить
            </Link>
            <div className="flex items-center gap-x-1">
              <Link
                href="/auth/sign_up"
                className="text-black font-semibold text-[16px]"
              >
                Создать аккаунт
              </Link>
              <p className="text-black text-[16px]">или</p>
              <Link
                href="/auth/login"
                className="text-black font-semibold text-[16px]"
              >
                Войти
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
