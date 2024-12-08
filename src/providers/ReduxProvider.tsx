"use client"
import { api } from "@/redux/api";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import React, { ReactNode } from "react";

const ReduxProvider = ({ children }: { children: ReactNode }) => {
  return <ApiProvider api={api}>{children}</ApiProvider>;
};

export default ReduxProvider;
