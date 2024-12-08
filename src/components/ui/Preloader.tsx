import { Spin } from "antd";
import React from "react";

const Preloader = () => {
  return (
    <div className="container">
      <div className="flex items-center justify-center w-full h-screen">
        <Spin size="large" spinning={true} />
      </div>
    </div>
  );
};

export default Preloader;
