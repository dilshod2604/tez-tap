"use client";
import React, { useState } from "react";
import { useStepControl } from "@/store/useStepControl";
import { Steps, Form, Input, Button, Upload,Result } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSendOrderMutation } from "@/redux/api/order";
import Link from "next/link";

const { Step } = Steps;

const Order = () => {
  const [sendOrder] = useSendOrderMutation();
  const { step, nextStep, prevStep, setStep } = useStepControl();
  const [imageList, setImageList] = useState([]);
  const [sampleFile, setSampleFile] = useState<File | null>(null);
  const [techPassportFile, setTechPassportFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [form] = Form.useForm();

  const [formData, setFormData] = useState({
    car_make_model: "",
    car_year: "",
    car_body: "",
    vin_code: "",
    second_phone: "",
  });

  const handleUpload = async () => {
    const data = new FormData();
    data.append("car_make_model", formData.car_make_model);
    data.append("car_year", formData.car_year);
    data.append("car_body", formData.car_body);
    data.append("vin_code", formData.vin_code);
    data.append("second_phone", formData.second_phone);

    imageList.forEach((file: any) => {
      data.append("upload_images", file.originFileObj);
    });

    if (sampleFile) data.append("sample", sampleFile);
    if (techPassportFile) data.append("tech_passport", techPassportFile);

    try {
      const res = await sendOrder(data).unwrap();
      if (res.id) {
        nextStep();
        form.resetFields();
        setImageList([]);
        setSampleFile(null);
        setTechPassportFile(null);
      }
    } catch (error: any) {
      if (error.status === 400 && error.data.car_year) {
        setErrorMessage(error.data.car_year[0]);
      } else if (error.status === 400 && error.data.vin_code) {
        setErrorMessage(error.data.vin_code[0]);
      }
    }
  };

  const handleChange = ({ fileList }: any) => setImageList(fileList);
  const handleSampleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSampleFile(event.target.files?.[0] || null);
  };
  const handleTechPassportChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTechPassportFile(event.target.files?.[0] || null);
  };

  //handle Ok
  const handleOk = () => {
    setStep(0);
  };

  const steps = [
    {
      content: (
        <Form
          form={form}
          onFinish={(values) => {
            setFormData({ ...formData, ...values });
            nextStep();
          }}
        >
          <Form.Item
            name="car_make_model"
            rules={[{ required: true, message: "Введите модель автомобиля!" }]}
          >
            <Input
              placeholder="Модель и марка  автомобиля"
              type="text"
              className="h-[50px] placeholder:text-[18px]  text-neutral-600 font-medium"
            />
          </Form.Item>
          <Form.Item
            name="car_year"
            rules={[{ required: true, message: "Введите год выпуска!" }]}
          >
            <Input
              placeholder="Год выпуска"
              className="h-[50px] placeholder:text-[18px]  text-neutral-600 font-medium"
            />
          </Form.Item>
          <Form.Item
            name="car_body"
            rules={[{ required: true, message: "Введите тип кузова (число)!" }]}
          >
            <Input
              type="number"
              placeholder="Тип кузова"
              className="h-[50px] placeholder:text-[18px]  text-neutral-600 font-medium"
            />
          </Form.Item>
          <Form.Item
            name="vin_code"
            rules={[{ required: true, message: "Введите VIN код!" }]}
          >
            <Input
              placeholder="Вин код"
              className="h-[50px] placeholder:text-[18px]  text-neutral-600 font-medium"
            />
          </Form.Item>
          <Form.Item
            name="second_phone"
            rules={[
              { required: true, message: "Введите второй номер телефона!" },
            ]}
          >
            <Input
              placeholder="Второй номер телефона"
              className="h-[50px] placeholder:text-[18px]  text-neutral-600 font-medium"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="default"
              htmlType="submit"
              className="w-full flex items-center justify-center bg-black text-white font-bold text-[18px] h-[50px] rounded-xl"
            >
              Далее
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      content: (
        <div className="flex flex-col w-full gap-y-4">
          <div className="border w-full p-4 rounded-lg flex flex-col gap-y-2">
            <span className="text-neutral-600 text-[18px] font-semibold">
              Фотки запчастя
            </span>
            <Upload
              multiple
              fileList={imageList}
              onChange={handleChange}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Выберите файлы</Button>
            </Upload>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="w-full border p-4 rounded-lg flex flex-col gap-y-2">
              <span className="text-neutral-600 text-[18px] font-semibold">
                Образец
              </span>
              <input type="file" onChange={handleSampleChange} />
            </div>
            <div className="w-full border p-4 rounded-lg flex flex-col gap-y-2">
              <span className="text-neutral-600 text-[18px] font-semibold">
                Тех паспорт
              </span>
              <input type="file" onChange={handleTechPassportChange} />
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <Button
              onClick={prevStep}
              className="w-full flex items-center justify-center bg-black text-white font-bold text-[18px] h-[50px] rounded-xl"
            >
              Назад
            </Button>
            <Button
              type="primary"
              onClick={handleUpload}
              className="w-full flex items-center justify-center bg-black text-white font-bold text-[18px] h-[50px] rounded-xl"
            >
              Отправить
            </Button>
          </div>
          <div>
            <p className="text-center text-red-500"> {errorMessage}</p>
          </div>
        </div>
      ),
    },
    {
      content: (
        <Result
          status="success"
          title="Ваш заказ принят"
          subTitle="Для отслеживания вашего заказа нажмите кнопку ОК"
          extra={[
            <Link
              href="/request"
              key="console"
              onClick={handleOk}
              className="bg-blue-500 px-4 py-2 rounded-lg text-white font-bold hover:text-white hover:bg-blue-600 transition-all"
            >
              ОК
            </Link>,
          ]}
        />
      ),
    },
  ];

  return (
    <div className="max-w-[500px] flex flex-col w-full gap-y-4">
      <Steps current={step} responsive={false}>
        {steps.map((_, index) => (
          <Step key={index} />
        ))}
      </Steps>
      <div className="mb-[50px]">{steps[step].content}</div>
    </div>
  );
};

export default Order;
