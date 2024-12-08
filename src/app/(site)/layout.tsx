import LayoutSite from "@/components/Layout/LayoutSite";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <LayoutSite>{children}</LayoutSite>;
};

export default layout;
