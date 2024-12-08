"use client";
import { useGetOrdersQuery } from "@/redux/api/order";
import Image from "next/image";
import React from "react";
import OrderActions from "../ui/OrderActions";
import { Modal, Spin } from "antd";
import { useEditOrderStore } from "@/store/useEditOrderStore";
import EditOrder from "../ui/EditOrder";
import emptyBox from "../../assets/empty/emty_box.jpg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa6";
import { LoadingOutlined } from "@ant-design/icons";

const Requests = () => {
  const { close, isOpen, oredrId } = useEditOrderStore();
  const { data: orders, isLoading } = useGetOrdersQuery();
  const router = useRouter();

  const toOrderPage = (id: number) => {
    router.push(`request/${id}`);
  };
 
  if (orders?.length === 0) {
    return (
      <div className="container bg-slate-50">
        <div className="">
          <div className=" w-full h-full flex items-center justify-center flex-col gap-y-5">
            <Image src={emptyBox} alt="emptyBox" width={200} height={200} />
            <p className="text-[18px] text-neutral-500 font-normal text-cneter">
              У вас нет активных заявок для добавление нажмите кнопку Добавить
            </p>
            <Link
              href="/"
              className="flex items-center justify-center bg-blue-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
            >
              Добавить
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container  bg-slate-50">
        <div className="w-full h-[650px] p-4 overflow-y-auto scroll-hidden">
          <div className="flex items-center justify-center gap-x-5  relative py-5 ">
            <h1 className="text-[30px]  text-gray-800 font-bold">Заявки</h1>
            <Link href="/" className="absolute top-[27px] left-0 ">
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
            <div className="flex flex-col gap-y-4 ">
              {orders?.map((order) => (
                <div
                  key={order.id}
                  className="w-full flex items-center justify-between p-4 rounded-lg bg-white border shadow-lg  gap-y-4 relative"
                >
                  <div className="flex items-start gap-x-4 max-380:flex-col w-full ">
                    <Image
                      src={order.images[0].image}
                      alt="order_image"
                      width={100}
                      height={100}
                      className="rounded-md cursor-pointer"
                      onClick={() => toOrderPage(order.id)}
                    />
                    <div className="flex flex-col gap-y-1 w-full ">
                      <Link
                        href={`request/${order.id}`}
                        className="text-[20px] font-semibold cursor-pointer hover:underline "
                      >
                        {order.car_make_model} ({order.car_year})
                      </Link>
                      <p className="text-[18px] text-neutral-400 ">
                        {order.second_phone}
                      </p>
                      <div className="flex items-center gap-x-2">
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
                  <OrderActions id={order.id} />
                  <Modal
                    open={oredrId === order.id && isOpen}
                    onCancel={close}
                    footer={null}
                  >
                    <EditOrder order={order} />
                  </Modal>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Requests;
