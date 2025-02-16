'use client'

import React, { useState } from "react";
import Image from "next/image";
import search from "@/assets/icons/search-icon.png";
import logo from "@/assets/logo/logo.png";
import { useParams, useRouter } from "next/navigation";

export default function Header() {
  const param = useParams();
  const [value, setValue] = useState(
    Array.isArray(param.id) ? param.id[0] : param.id || ""
  );
  const router = useRouter();
  const handleSearch = (value: string) => {
    if (!value) {
      router.push("/");
      return;
    }
    router.push(`/search/${decodeURIComponent(value as string)}`);
  };
  return (
    <div className="w-full flex justify-between gap-2 py-4">
      <div className="flex items-center aspect-[141/50]" onClick={() => {
          router.push("/");
        }}>
        <Image src={logo} alt="logo" width={141} height={50} />
      </div>
      <div className="w-full flex gap-3 justify-end items-center mx-3">
      <input
            value={decodeURIComponent(value as string)}
            onChange={(e) => {
              if (e.target.value === "") {
                router.push("/");
              }
              setValue(e.target.value);
            }}
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(value);
              }
            }}
            className="w-full md:w-[270px] rounded-full bg-[#323232] text-center py-0 md:py-1"
          />
          {value && (
            <div
              onClick={() => {
                setValue("");
                router.push("/");
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              X
            </div>
          )}
        <div  onClick={() => {
            handleSearch(value);
          }}
          className="object-cover w-5 h-5 cursor-pointer">
        <Image
          src={search}
          alt="Search"
          
        />
        </div>
      </div>
    </div>
  );
}
