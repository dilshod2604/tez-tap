"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Preloader from "../ui/Preloader";
import { useGetUserQuery } from "@/redux/api/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const LayoutSite = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const userId = Cookies.get("userId");

  useEffect(() => {
    if (!userId) {
      router.push("/auth");
      return;
    }
  }, [userId, router]);

  const {
    data,
    error,
    isLoading: queryLoading,
  } = useGetUserQuery(Number(userId));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (queryLoading || isLoading) {
    return <Preloader />;
  }

  if (!data?.email || error) {
    router.push("/auth");
    return <Preloader />;
  }

  return (
    <div>
      <main className="w-full h-[500px]">{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutSite;
