"use client";
import { FooterCategory } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function Menu({
  listCategory,
  setShowMore,
}: {
  listCategory: FooterCategory[];
  setShowMore: Dispatch<SetStateAction<boolean>>;
}) {
  const param = useParams();
  const [categoryActive, setCategoryActive] = useState(
    typeof param?.category === "string" ? param.category.split("-").pop() : 0
  );
  const router = useRouter();
  useEffect(() => {
    setCategoryActive(
      typeof param?.category === "string" ? param.category.split("-")?.pop() : 0
    );
  }, [param]);

  const categoriesToRender = listCategory || [];

  return (
    <div className="absolute right-4 bg-white shadow-lg z-10 w-[100px] bottom-[76px] flex flex-col gap-2 py-2 items-center">
      {categoriesToRender.map((item) => {
        return (
          <p
            onClick={() => {
              router.push(`/${item.name.replace("/", "-")}-${item.id}`);
              setShowMore(false);
            }}
            key={item.id}
            className={`${
              Number(categoryActive) === item.id
                ? "text-[#FFBB00]"
                : "text-black"
            } font-medium text-xs md:text-base cursor-pointer`}
          >
            {item.name}
          </p>
        );
      })}
    </div>
  );
}
