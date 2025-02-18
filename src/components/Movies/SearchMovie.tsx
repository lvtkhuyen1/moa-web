"use client";

import { limitMovies } from "@/constants";
import { getMovieCategories } from "@/services/movies";
import { MovieType } from "@/types";
import { useEffect, useState } from "react";
import ListMovies from "../ListMovies";
import CategoryItem from "../CategoryItem";

export default function SearchMovie({ search }: { search: string }) {
  const [pagination, setPagination] = useState<{
    page: number;
    limit: number;
  }>({
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

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movie = await getMovieCategories({
          ...pagination,
          search: decodeURIComponent(search),
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
  }, [pagination, search]);

  return (
    <ListMovies mainTitle={decodeURIComponent(search)}>
      {listMovie?.movies?.length > 0 ? (
        <CategoryItem
          total={listMovie.total}
          categoryItems={listMovie.movies}
          isSwiper={false}
          pagination={pagination}
          setPagination={setPagination}
        />
      ) : (
        <div className="text-white text-center font-bold">{`표시할 결과가 없습니다 : ${decodeURIComponent(
          search
        )}`}</div>
      )}
    </ListMovies>
  );
}
