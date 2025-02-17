"use client";

import { limitMovies } from "@/constants";
import { getMovieCategories } from "@/services/movies";
import { MovieType } from "@/types";
import { useEffect, useState } from "react";
import ListMovies from "../ListMovies";
import CategoryItem from "../CategoryItem";

export default function ListFilmCategory({ category }: { category: string }) {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: limitMovies,
  });
  const [listMovie, setListMovie] = useState<{
    movies: MovieType[];
    total: number;
  }>({
    movies: [],
    total: 0,
  });

  const categoryId = category.split("-").pop();
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movie = await getMovieCategories({
          categoryId: Number(categoryId),
          ...pagination,
        });
        setListMovie({
          movies: movie.data.movies,
          total: movie.data.total,
        });
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchMovies();
  }, [pagination, categoryId]);

  return (
    <ListMovies mainTitle={listMovie.movies[0]?.categories[0].name}>
      <CategoryItem
        total={listMovie.total}
        listFilmCategories={listMovie.movies}
        title={listMovie.movies[0]?.categories[0].name}
        isSwiper={false}
        pagination={pagination}
        setPagination={setPagination}
      />
    </ListMovies>
  );
}
