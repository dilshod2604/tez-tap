"use client";
import { usePasswordRessetMutation } from "@/redux/api/auth";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { SlArrowLeft } from "react-icons/sl";

const ForgotPassword = () => {
  const [ressetPassword] = usePasswordRessetMutation();
  const [form] = useForm();
  const router = useRouter();
  const onFinish = async (values: IRessetPassword) => {
    try {
      const res = await ressetPassword(values);
      if (res?.data?.message) {
        const resetLink = res.data.message;
        const urlParts = resetLink.split("/");
        const uidb64 = urlParts[urlParts.length - 3];
        const token = urlParts[urlParts.length - 2];
        router.push(`/auth/reset-password/${uidb64}/${token}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container px-4  ">
      <div className=" flex flex-col gap-y-4 relative w-full  h-screen justify-center">
        <h1 className="text-black font-bold text-[30px] text-center">
          Электронная почта{" "}
        </h1>
        <Link href="/auth/login" className="absolute top-[30px] left-0">
          <SlArrowLeft size={30} className=" text-black" />
        </Link>
        <Form onFinish={onFinish} form={form}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Пишите вашу эл. почту, пожалуйста",
              },
              { type: "email", message: "Введите корректный email" },
            ]}
          >
            <Input
              type="email"
              placeholder="example@gmail.com"
              className="h-[50px] placeholder:text-neutral-500 text-[16px] font-normal"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="default"
              htmlType="submit"
              className="w-full flex items-center justify-center bg-black text-white font-bold text-[18px] h-[50px] rounded-xl"
            >
              Отправить
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
