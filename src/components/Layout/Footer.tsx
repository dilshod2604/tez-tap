"use client";
import { navLinks } from "@/constants/links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const path = usePathname();
  return (
    <footer className="fixed w-full bottom-0 right-0 bg-white z-20">
      <div className="container">
        <div className="flex items-center   py-4 px-[40px]">
          <nav className="flex items-center justify-between bg-white w-full">
            {navLinks.map((link, index) =>
              path === link.link ? (
                <Link
                  key={index}
                  href={link.link}
                  className="flex flex-col items-center gap-y-1  "
                >
                  <link.icon
                    size={25}
                    className="text-neutral-800 scale-125 transition-all duration-300 "
                  />
                  <p className="text-neutral-800">{link.name}</p>
                </Link>
              ) : (
                <Link
                  key={index}
                  href={link.link}
                  className="flex flex-col items-center gap-y-1 "
                >
                  <link.icon size={25} className="text-neutral-500 " />
                  <p className="text-neutral-500">{link.name}</p>
                </Link>
              )
            )}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
