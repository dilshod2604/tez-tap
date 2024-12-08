"use client";
import React, { useEffect, useState } from "react";
import { useEditUserMutation, useGetUserQuery } from "@/redux/api/auth";
import Link from "next/link";
import Cookies from "js-cookie";
import { FaChevronLeft } from "react-icons/fa6";
import { Button, Form, Input, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const ProfilePage = () => {
  const userId = Cookies.get("userId");
  const { data: user, isLoading: userLoading } = useGetUserQuery(
    Number(userId)
  );
  const [editUser, { isLoading }] = useEditUserMutation();
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }, [message]);

  const onFinish = async (values: EditUser) => {
    try {
      const res = await editUser({
        id: Number(userId),
        data: values,
      });
      if (res.data?.id) {
        setMessage("success");
      } else {
        setMessage("error");
      }
    } catch (error) {
      setMessage("error");
    }
  };

  return (
    <div className="container boredr-x">
      <div className="bg-neutral-900 h-[100px] flex items-center justify-center gap-x-5  relative py-5">
        <h1 className="text-[25px]  text-white font-bold">Профиль</h1>
        <Link href="/" className="absolute top-[35px] left-[10px] ">
          <FaChevronLeft size={30} className="text-white " />
        </Link>
      </div>
      <div className="content p-4 overflow-y-auto scroll-hidden bg-slate-50">
        {userLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Spin
              spinning={true}
              indicator={<LoadingOutlined spin />}
              size="large"
            />
          </div>
        ) : (
          <Form initialValues={user} onFinish={onFinish}>
            <Form.Item
              name="first_name"
              rules={[
                { required: true, message: "Пишите ваше имя, пожалуйста" },
              ]}
            >
              <Input
                type="text"
                placeholder="Имя"
                className="h-[60px]  placeholder:text-neutral-500 text-[16px] font-normal"
              />
            </Form.Item>
            <Form.Item
              name="last_name"
              rules={[
                { required: true, message: "Пишите вашу фамилию, пожалуйста" },
              ]}
            >
              <Input
                type="text"
                placeholder="Фамилия"
                className="h-[60px]  placeholder:text-neutral-500 text-[16px] font-normal"
              />
            </Form.Item>
            <Form.Item
              name="phone_number"
              rules={[
                {
                  required: true,
                  message: "Пишите ваш номер телефона, пожалуйста",
                },
                {
                  pattern: /^\+?[0-9]{10,15}$/,
                  message: "Введите корректный номер телефона",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="+996 __ __ __"
                className="h-[60px]"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="default"
                htmlType="submit"
                loading={isLoading}
                disabled={isLoading}
                className="w-full flex items-center justify-center bg-black text-white font-bold text-[18px] h-[50px] rounded-xl"
              >
                Сохранить
              </Button>
            </Form.Item>
          </Form>
        )}
        <div className="w-full flex items-center justify-center">
          {message === "success" ? (
            <p className="text-[16px] font-normal text-green-500 text-center">
              Данные успешно изменилась
            </p>
          ) : message === "error" ? (
            <p className="text-[16px] font-normal text-red-500 text-center">
              {" "}
              Ошибка при изменении данных
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
