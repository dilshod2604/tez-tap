"use client";
import React, { useEffect, useState } from "react";
import { Modal, Spin } from "antd";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";
import { LoadingOutlined } from "@ant-design/icons";

const About = () => {
  const [isLodaing, setIsLoading] = useState<boolean>(true);
  const [translate, setTranslate] = useState<string>("kg");
  const changeLangueage = () => {
    if (translate === "kg") {
      setTranslate("ru");
    } else {
      setTranslate("kg");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <div>
      <div className="container  bg-slate-50">
        <div className="w-full h-[650px] p-4 overflow-y-auto scroll-hidden">
          <div className="flex items-center justify-center gap-x-5  relative py-5 ">
            <h1 className="text-[30px]  text-gray-800 font-bold">О нас</h1>
            <Link href="/" className="absolute top-[27px] left-0 ">
              <FaChevronLeft size={30} className="text-gray-800 " />
            </Link>
          </div>
          {isLodaing ? (
            <div className="w-full h-full flex items-center justify-center">
              <Spin
                spinning={true}
                indicator={<LoadingOutlined spin />}
                size="large"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-y-4 ">
              <div className="flex items-center justify-center w-full">
                <div className=" flex items-center ">
                  <button
                    className={
                      translate === "kg"
                        ? "px-4 py-1 flex items-center justify-center rounded-l-md border bg-blue-500 text-white transition-all duration-500"
                        : "px-4 py-1 flex items-center justify-center rounded-l-md border"
                    }
                    onClick={changeLangueage}
                  >
                    Кыргызча
                  </button>
                  <button
                    className={
                      translate === "ru"
                        ? "px-4 py-1 flex items-center justify-center rounded-r-md border bg-blue-500 text-white transition-all duration-500"
                        : "px-4 py-1 flex items-center justify-center rounded-r-md border"
                    }
                    onClick={changeLangueage}
                  >
                    Русский
                  </button>
                </div>
              </div>
              <div className="w-full flex items-center justify-center flex-col gap-y-5 ">
                {translate === "ru" ? (
                  <p className="text-neutral-600 text-[20px] font-normal text-center">
                    Если у вас возникли трудности с поиском запчастей,
                    обращайтесь к нам. Мы привезем запчасти из Дубая, России,
                    Кореи, Германии, Грузии и Бишкека для любого автомобиля.
                  </p>
                ) : (
                  <p className="text-neutral-600 text-[20px] font-normal text-center">
                    Эгер сизде запчасть табуу боюнча кыйынчылыктар болсо, сиз
                    бизге кайрылыңыз. Биз Дубайдан, Россиядан , Кореядан,
                    Германиядан, Грузиядан жана Бишкектен бардык автоунаага
                    запчасттарды алып келебиз
                  </p>
                )}
                <div className="flex items-center gap-x-2 flex-wrap gap-y-2 justify-center ">
                  <div className="w-[150px] h-[150px] border border-blue-300 rounded-md "></div>
                  <div className="w-[150px] h-[150px] border border-blue-300 rounded-md"></div>
                  <div className="w-[150px] h-[150px] border border-blue-300 rounded-md"></div>
                </div>
                <div className="flex items-center gap-x-4 gap-y-4 max-450:flex-col">
                  <p className="text-[18px] text-neutral-700 font-normal">
                    Тел: +996 (709) 340-054
                  </p>
                  <p className="text-[18px] text-neutral-700 font-normal">
                    Тел: +996 (223) 230-009
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
