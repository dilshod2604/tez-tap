"use client";
import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useEditOrdersMutation } from "@/redux/api/order";
import { useEditOrderStore } from "@/store/useEditOrderStore";

const EditOrder = ({ order }: { order: OrderResponse }) => {
  const [editOrder] = useEditOrdersMutation();
  const { close } = useEditOrderStore();
  const [updateOrder, setUpdateOrder] = useState({
    car_make_model: order.car_make_model,
    car_year: order.car_year,
    car_body: order.car_body,
    vin_code: order.vin_code,
    second_phone: order.second_phone,
  });

  const onFinish = async (values: any) => {
    try {
      const orderData = { ...updateOrder, ...values };

      const data = new FormData();
      data.append("car_make_model", orderData.car_make_model);
      data.append("car_year", orderData.car_year);
      data.append("car_body", orderData.car_body);
      data.append("vin_code", orderData.vin_code);
      data.append("second_phone", orderData.second_phone);

      await editOrder({
        id: order.id,
        data: data,
      });
      close();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full overflow-y-auto  max-h-[400px] scroll-hidden p-5">
      <div className="flex flex-col gap-y-5">
        <h1 className="text-[20px] text-neutral-700 font-semibold w-full text-center">
          Редактировать заказ
        </h1>
        <div>
          <Form initialValues={updateOrder} onFinish={onFinish}>
            <Form.Item name="car_make_model">
              <Input
                placeholder="Модель и марка  автомобиля"
                type="text"
                className="h-[50px] placeholder:text-[18px]  text-neutral-600 font-medium"
              />
            </Form.Item>
            <Form.Item name="car_year">
              <Input
                placeholder="Год выпуска"
                className="h-[50px] placeholder:text-[18px]  text-neutral-600 font-medium"
              />
            </Form.Item>
            <Form.Item name="car_body">
              <Input
                type="number"
                placeholder="Тип кузова"
                className="h-[50px] placeholder:text-[18px]  text-neutral-600 font-medium"
              />
            </Form.Item>
            <Form.Item name="vin_code">
              <Input
                placeholder="Вин код"
                className="h-[50px] placeholder:text-[18px]  text-neutral-600 font-medium"
              />
            </Form.Item>
            <Form.Item name="second_phone">
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
                Редактировать
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditOrder;
