"use client";

import { getMovies } from "@/services/movies";
import { MovieType } from "@/types";
import { useEffect, useState } from "react";
import CategoryItem from "../CategoryItem";

interface MoviesByCategory {
  [key: number]: MovieType[];
}
export default function Category() {
  const [listMovieByCategory, setListMovieByCategory] =
    useState<MoviesByCategory>({});

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await getMovies([1, 2, 3, 4, 5, 6, 7]);
        setListMovieByCategory(
          movies.reduce((acc: MoviesByCategory, item: MovieType) => {
            if (!acc[item.cate_id]) {
              acc[item.cate_id] = [];
            }
            acc[item.cate_id].push(item);
            return acc;
          }, {})
        );
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="flex flex-col gap-2 md:gap-4 md:mt-4">
      <span className="w-full bg-[#FFBB00] text-black font-semibold md:text-2xl text-sm flex items-center p-2 md:p-4 my-2 md:my-3 md:m-0">
        공지사항
      </span>
      {Object.entries(listMovieByCategory).map(
        ([key, movies]: [string, MovieType[]]) => {
          return (
            <div key={key} className="relative">
              <CategoryItem
                slidesPerView={5.5}
                categories={movies[0].categories[0]}
                title={movies[0].categories[0].name}
                categoryItems={movies as MovieType[]}
              />
            </div>
          );
        }
      )}
    </div>
  );
}
