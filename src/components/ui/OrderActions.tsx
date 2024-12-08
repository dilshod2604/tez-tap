"use client";
import { useEditOrderStore } from "@/store/useEditOrderStore";
import { FloatButton } from "antd";
import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { LiaEditSolid } from "react-icons/lia";

const OrderActions = ({ id }: { id: number }) => {
  const { setIsOpen, setOrderId } = useEditOrderStore();

  const openModal = () => {
    setOrderId(id);
    setIsOpen();
  };
  return (
    <div className="absolute right-1 top-1">
      <FloatButton.Group
        trigger="click"
        type="default"
        shape="square"
        placement="left"
        icon={<HiOutlineDotsVertical />}
        className="text-black relative top-0 right-0 cursor-pointer hover:scale-110 transition-all  "
      >
        <FloatButton
          icon={
            <LiaEditSolid
              size={20}
              className="text-black"
              onClick={openModal}
            />
          }
        />
      </FloatButton.Group>
    </div>
  );
};

export default OrderActions;
