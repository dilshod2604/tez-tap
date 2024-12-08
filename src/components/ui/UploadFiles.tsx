"use client";
import React, { useState } from "react";
import { Upload, Button, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const UploadFiles = () => {
  const [imageList, setImageList] = useState([]);
  const [sampleFile, setSampleFile] = useState<File | null>(null);
  const [techPassportFile, setTechPassportFile] = useState<File | null>(null);

  const handleUpload = async () => {
    const upload_images = new FormData();
    imageList.forEach((file: any) => {
      upload_images.append("files", file.originFileObj);
    });
    const sample = new FormData();
    if (sampleFile) {
      sample.append("sample", sampleFile);
    }

    const tech_passport = new FormData();
    if (techPassportFile) {
      tech_passport.append("tech_passport", techPassportFile);
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

  return (
    <div className="flex flex-col w-full gap-y-4 ">
      <div className="border w-full p-4 rounded-lg">
        <Upload
          className="w-full h-[50px]"
          multiple
          fileList={imageList}
          onChange={handleChange}
          beforeUpload={() => false}
        >
          <Button icon={<UploadOutlined />}>Select Files</Button>
        </Upload>
      </div>
      <div className=" flex flex-col gap-y-4    ">
        <div className="w-full border p-4 rounded-lg">
          <input type="file" onChange={handleSampleChange} />
        </div>
        <div className="w-full border p-4 rounded-lg">
          <input type="file" onChange={handleTechPassportChange} />
        </div>
      </div>
      <div className="flex items-center gap-x-4">
            <Button
            //   onClick={prevStep}
              className="w-full flex items-center justify-center bg-black text-white font-bold text-[18px] h-[50px] rounded-xl"
            >
              Назад
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full flex items-center justify-center bg-black text-white font-bold text-[18px] h-[50px] rounded-xl"
            >
              Отправить
            </Button>
          </div>
    </div>
  );
};

export default UploadFiles;
