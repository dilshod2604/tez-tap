"use client";
import { useGetOrderQuery } from "@/redux/api/order";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { BiSolidCopy } from "react-icons/bi";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const RequestId = () => {
  const { requestId } = useParams();
  const { data: order, isLoading } = useGetOrderQuery(Number(requestId));

  const handleCopy = async (copyText: string) => {
    try {
      await navigator.clipboard.writeText(copyText);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="container bg-slate-50">
        <div className="w-full h-[650px] p-4 overflow-y-auto scroll-hidden ">
          <div className="flex items-center justify-center gap-x-5  relative py-5 ">
            <h1 className="text-[30px]  text-gray-800 font-bold">Заявка</h1>
            <Link href="/request" className="absolute top-[27px] left-0 ">
              <FaChevronLeft size={30} className="text-gray-800 " />
            </Link>
          </div>

          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Spin
                spinning={true}
                indicator={<LoadingOutlined spin />}
                size="large"
              />
            </div>
          ) : (
            <div className="p-4 flex flex-col gap-y-4   ">
              <Image
                src={order?.images[0].image!}
                alt="image"
                width={300}
                height={300}
                className="rounded-lg border"
              />
              <div className="flex flex-col gap-y-2 justify-start">
                <div className="flex items-center gap-x-2">
                  <span className="text-neutral-600 text-[18px] font-normal">
                    Марка и модель:
                  </span>
                  <h1 className="text-black font-semibold text-[18px]">
                    {order?.car_make_model}
                  </h1>
                </div>
                <div className="flex items-center gap-x-2">
                  <span className="text-neutral-600 text-[18px] font-normal">
                    Год выпуска:
                  </span>
                  <h1 className="text-black font-semibold text-[18px]">
                    {order?.car_year}- год
                  </h1>
                </div>
                <div className="flex items-center gap-x-2">
                  <span className="text-neutral-600 text-[18px] font-normal">
                    Тип кузова:
                  </span>
                  <h1 className="text-black font-semibold text-[18px]">
                    {order?.car_body}
                  </h1>
                </div>
                <div className="flex items-center gap-x-2">
                  <span className="text-neutral-600 text-[18px] font-normal">
                    Vin код:
                  </span>
                  <h1 className="text-black font-semibold text-[18px]">
                    {order?.vin_code}
                  </h1>
                  <BiSolidCopy
                    onClick={() => handleCopy(order?.vin_code!)}
                    className="text-blue-500 hover:scale-110 transition-all hover:text-blue-600 cursor-pointer"
                  />
                </div>
                <div className="flex items-center gap-x-2">
                  <span className="text-neutral-600 text-[18px] font-normal">
                    Номер телефона:
                  </span>
                  <h1 className="text-black font-semibold text-[18px]">
                    {order?.second_phone}
                  </h1>
                  <BiSolidCopy
                    onClick={() => handleCopy(order?.second_phone!)}
                    className="text-blue-500 hover:scale-110 transition-all hover:text-blue-600 cursor-pointer"
                  />
                </div>
                <div className="flex items-center gap-x-2">
                  <span className="text-neutral-600 text-[18px] font-normal">
                    Статус:
                  </span>
                  {order?.status === "pending" ? (
                    <span className=" font-normal text-[16px] bg-blue-500 text-white px-4 py-1 rounded-lg">
                      Ожидает
                    </span>
                  ) : order?.status === "processing" ? (
                    <span className=" font-normal text-[16px] bg-green-500 text-white px-4 py-1 rounded-lg">
                      В процессе
                    </span>
                  ) : order?.status === "completed" ? (
                    <span className=" font-normal text-[16px] bg-orange-500 text-white px-4 py-1 rounded-lg">
                      Завершен
                    </span>
                  ) : (
                    <span className=" font-normal text-[16px] bg-red-500 text-white px-4 py-1 rounded-lg">
                      Отменен
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestId;
