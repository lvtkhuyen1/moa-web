"use client";

import { limitRelatedMovies } from "@/constants";
import { getMovieCategories } from "@/services/movies";
import { IMovies } from "@/types";
import { useEffect, useState } from "react";
import CategoryItem from "../CategoryItem";

export default function RelatedFilm() {
  const [pagination] = useState({
    page: 1,
    limit: limitRelatedMovies,
  });
  const [listMovie, setListMovie] = useState<{
    movies: IMovies[];
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
  }, [pagination]);

  return (
    <>
      <CategoryItem
        slidesPerView={5.2}
        isShowMore
        categories={listMovie.movies[0]?.categories[0]}
        listFilmCategories={listMovie.movies}
        title={listMovie.movies[0]?.categories[0].name}
      />
    </>
  );
}
