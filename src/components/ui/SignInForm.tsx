"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { Button, Form, Input } from "antd";
import { useSignInMutation } from "@/redux/api/auth";
import { useRouter } from "next/navigation";
import { MdDoNotDisturbOff } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import Link from "next/link";

const SignInForm = () => {
  const [form] = Form.useForm();
  const [signIn, { isLoading }] = useSignInMutation();
  const [authorised, setAuthorised] = useState<string>("");
  const router = useRouter();

  const onFinish = async (values: ILoginRequest) => {
    try {
      const res = await signIn(values);
      if ("data" in res && res.data?.access && res.data?.refresh) {
        Cookies.set("accessToken", res.data.access, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });

        Cookies.set("refreshToken", res.data.refresh, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });

        router.push("/");
      } else if (!res.data?.access) {
        setAuthorised("notEx");
      } else {
        setAuthorised("error");
      }
    } catch (error) {
      setAuthorised("error");
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <Form form={form} onFinish={onFinish}>
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

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Создайте пароль" },
            { min: 8, message: "Пароль должен быть минимум 8 символов" },
          ]}
        >
          <Input.Password
            type="password"
            placeholder="Должно быть 8 символов"
            className="h-[50px] placeholder:text-neutral-500 text-[16px] font-normal"
          />
        </Form.Item>
        <span className="flex items-center justify-end mb-5">
          <Link href="/auth/forgot_pass" className="text-black font-extralight cursor-pointer">
            Забыли пароль?
          </Link>
        </span>
        <Form.Item>
          <Button
            type="default"
            htmlType="submit"
            loading={isLoading}
            disabled={isLoading}
            className="w-full flex items-center justify-center bg-black text-white font-bold text-[18px] h-[50px] rounded-xl"
          >
            Создать аккаунт
          </Button>
        </Form.Item>
      </Form>
      {authorised === "notEx" ? (
        <span className="text-red-600 w-full  text-center text-[16px] font-medium flex items-center  justify-center gap-x-2">
          <MdDoNotDisturbOff className="text-red-600" />
          Пользователь не найдено
        </span>
      ) : authorised === "error" ? (
        <span className="text-red-600 w-full  text-center text-[16px] font-medium flex items-center  justify-center gap-x-2">
          <FcCancel />
          Произошла ошибка при регистрации
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default SignInForm;
