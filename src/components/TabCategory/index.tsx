import { getCategoryMovies } from "@/services/movies";
import { CategoryType } from "@/types";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function TabCategory() {
  const param = useParams();
  const [categoryActive, setCategoryActive] = useState(
    typeof param?.category === "string" ? param.category.split("-").pop() : 0
  );

  const router = useRouter();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categories = await getCategoryMovies();
        setCategories(categories);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchCategory();
  }, []);
  useEffect(() => {
    setCategoryActive(
      typeof param?.category === "string" ? param.category.split("-")?.pop() : 0
    );
  }, [param]);

  return (
    <div className="hidden md:flex flex-row gap-8 py-4">
      {[{ name: "Home", id: 0 }, ...categories]?.map((category) => (
        <div
          onClick={() => {
            if (category.id === 0) {
              return router.push("/");
            }
            router.push(`/${category.name.replace("/", "-")}-${category.id}`);
          }}
          key={category.id}
          className="relative cursor-pointer"
        >
          <p
            className={` ${
              Number(categoryActive) === category.id
                ? "text-[#FFBB00]"
                : "text-white"
            } font-bold`}
          >
            {category.name}
          </p>
          {Number(categoryActive) === category.id && (
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#FFBB00]"></span>
          )}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFBB00] group-hover:w-full transition-all duration-300 ease-in-out"></span>
        </div>
      ))}
    </div>
  );
}
