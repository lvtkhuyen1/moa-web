"use client";

import { getMovies } from "@/services/movies";
import { MovieType } from "@/types";
import { useEffect, useState } from "react";
import ListMovies from "../ListMovies";
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
        console.log("Movies fetched:", movies);

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
      <ListMovies mainTitle="공지사항">
        {Object.entries(listMovieByCategory).map(
          ([key, movies]: [string, MovieType[]]) => {
            return (
              <div key={key} className="relative">
                <CategoryItem
                  slidesPerView={5.2}
                  categories={movies[0].categories[0]}
                  title={movies[0].categories[0].name}
                  listFilmCategories={movies as MovieType[]}
                />
              </div>
            );
          }
        )}
      </ListMovies>
    </div>
  );
}
