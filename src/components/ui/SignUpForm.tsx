"use client";
import React, { useState } from "react";
import { Steps, Form, Input, Button } from "antd";
import { useSignUpMutation } from "@/redux/api/auth";
import { useRouter } from "next/navigation";
import { FcApproval, FcCancel, FcHighPriority } from "react-icons/fc";
import Cookies from "js-cookie";
const { Step } = Steps;

const SignUpForm = () => {
  const [signUp, { isLoading }] = useSignUpMutation();
  const [authorised, setAuthorised] = useState<string>("");
  const [currentStep, setCurentStep] = useState<number>(0);
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    patronymic: "",
    last_name: "",
    phone_number: "",
    password: "",
    password2: "",
  });

  const router = useRouter();
  const [form] = Form.useForm();
  const onFinish = async (values: IUserRequest) => {
    try {
      const userData = { ...formData, ...values };
      const response = await signUp(userData);

      if ("data" in response && response.data) {
        Cookies.set("userId", String(response.data.id), {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });
        setAuthorised("success");
        form.resetFields();
        router.push("/auth/login");
      } else if (
        "error" in response &&
        response.error &&
        typeof response.error === "object" &&
        "status" in response.error
      ) {
        if ((response.error as { status: number }).status === 400) {
          setAuthorised("exist");
        } else {
          setAuthorised("error");
        }
      } else {
        setAuthorised("error");
      }
    } catch (err) {
      setAuthorised("error");
    }
  };

  //controll steps

  const nextStep = () => setCurentStep(currentStep + 1);
  const prevStep = () => {
    if (currentStep > 0) {
      setCurentStep(currentStep - 1);
    }
  };

  const steps = [
    {
      content: (
        <Form
          onFinish={(values) => {
            setFormData({ ...formData, ...values });
            nextStep();
          }}
        >
          <Form.Item
            name="first_name"
            rules={[{ required: true, message: "Пишите ваше имя, пожалуйста" }]}
          >
            <Input
              type="text"
              placeholder="Имя"
              className="h-[40px]  placeholder:text-neutral-500 text-[16px] font-normal"
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
              className="h-[40px]  placeholder:text-neutral-500 text-[16px] font-normal"
            />
          </Form.Item>
          <Form.Item
            name="patronymic"
            rules={[
              { required: true, message: "Пишите ваше отчество, пожалуйста" },
            ]}
          >
            <Input
              type="text"
              placeholder="Отчество"
              className="h-[40px]  placeholder:text-neutral-500 text-[16px] font-normal"
            />
          </Form.Item>
          <Button
            type="default"
            htmlType="submit"
            className="w-full flex items-center justify-center bg-black text-white font-bold text-[18px] h-[50px] rounded-xl"
          >
            Далее
          </Button>
        </Form>
      ),
    },
    {
      content: (
        <Form onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Пишите вашу эл. почту, пожалуйста" },
              { type: "email", message: "Введите корректный email" },
            ]}
          >
            <Input
              type="email"
              placeholder="example@gmail.com"
              className="h-[40px]  placeholder:text-neutral-500 text-[16px] font-normal"
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
              className="h-[40px]"
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
              className="h-[40px]  placeholder:text-neutral-500 text-[16px] font-normal"
            />
          </Form.Item>
          <Form.Item
            name="password2"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Подтвердите ваш пароль" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
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
              className="h-[40px]  placeholder:text-neutral-500 text-[16px] font-normal"
            />
          </Form.Item>
          <Form.Item>
            <div className="flex items-center gap-x-4">
              <Button
                type="default"
                onClick={prevStep}
                className="w-full flex items-center justify-center bg-black text-white font-bold text-[18px] h-[50px] rounded-xl"
              >
                Назад
              </Button>
              <Button
                type="default"
                htmlType="submit"
                loading={isLoading}
                disabled={isLoading}
                className="w-full flex items-center justify-center bg-black text-white font-bold text-[18px] h-[50px] rounded-xl"
              >
                Создать аккаунт
              </Button>
            </div>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-y-4 ">
      <div className="flex flex-col gap-y-4">
        <Steps current={currentStep} responsive={false}>
          {steps.map((step, index) => (
            <Step key={index} />
          ))}
        </Steps>
        <div>{steps[currentStep].content}</div>
      </div>
      {authorised === "success" ? (
        <span className="text-green-600 w-full text-center text-[16px] font-medium flex items-center  justify-center gap-x-2">
          <FcApproval />
          Регистрация прошла успешно!
        </span>
      ) : authorised === "error" ? (
        <span className="text-red-600 w-full  text-center text-[16px] font-medium flex items-center  justify-center gap-x-2">
          <FcCancel />
          Произошла ошибка при регистрации
        </span>
      ) : authorised === "exist" ? (
        <span className="text-orange-500 w-full text-center text-[16px] font-medium flex items-center justify-center gap-x-2">
          <FcHighPriority />
          Пользователь уже существует
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default SignUpForm;
