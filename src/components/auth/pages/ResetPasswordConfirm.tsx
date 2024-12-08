"use client";
import { useConfirmPasswordMutation } from "@/redux/api/auth";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FcCancel } from "react-icons/fc";
import { SlArrowLeft } from "react-icons/sl";

const ResetPasswordConfirm = () => {
  const [confirmPassword] = useConfirmPasswordMutation();
  const { uidb64, token } = useParams();
  const router = useRouter();
  const [form] = useForm();
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 5000);
  }, [message]);

  const onFinish = async (values: {
    new_password: string;
    confirm_new_password: string;
  }) => {
    try {
      const res = await confirmPassword({
        uidb64,
        token,
        newpassword: {
          new_password: values.new_password,
        },
      });
      if (res.data?.message) {
        router.push("/auth/login");
        form.resetFields();
      } else {
        setMessage("error");
      }
    } catch (error) {
      setMessage("error");
    }
  };

  return (
    <div className="container px-4">
      <div className="flex flex-col gap-y-4 relative w-full h-screen justify-center">
        <h1 className="text-black font-bold text-[30px] text-center">
          Создайте новый пароль
        </h1>
        <Link href="/auth/forgot_pass" className="absolute top-[30px] left-0">
          <SlArrowLeft size={30} className="text-black" />
        </Link>
        <Form onFinish={onFinish} form={form}>
          <Form.Item
            name="new_password"
            style={{ marginBottom: "16px" }}
            rules={[
              { required: true, message: "Создайте пароль" },
              { min: 8, message: "Пароль должен быть минимум 8 символов" },
            ]}
          >
            <Input.Password
              type="password"
              placeholder="Должно быть 8 символов"
              className="h-[40px] placeholder:text-neutral-500 text-[16px] font-normal"
            />
          </Form.Item>
          <Form.Item
            name="confirm_new_password"
            dependencies={["new_password"]}
            style={{ marginBottom: "16px" }}
            rules={[
              { required: true, message: "Подтвердите ваш пароль" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("new_password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Пароли должны совпадать"));
                },
              }),
            ]}
          >
            <Input.Password
              type="password"
              placeholder="Подтвердите ваш пароль"
              className="h-[40px] placeholder:text-neutral-500 text-[16px] font-normal"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="default"
              htmlType="submit"
              className="w-full flex items-center justify-center bg-black text-white font-bold text-[18px] h-[50px] rounded-xl"
            >
              Создать
            </Button>
          </Form.Item>
        </Form>
        <div className="w-full flex items-center justify-center">
          {message === "error" ? (
            <p className="text-center text-[18px] text-red-500 font-semibold flex items-center gap-x-2">
              <FcCancel />
              Ошибка при создании нового пароля
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
