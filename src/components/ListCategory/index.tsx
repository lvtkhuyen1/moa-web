"use client";

import { limitMovies } from "@/constants";
import { getMovieCategories } from "@/services/movies";
import { MovieType } from "@/types";
import { useEffect, useState } from "react";
import CategoryItem from "../CategoryItem";

export default function ListCategory({ category }: { category: string }) {
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
  const [loading, setLoading] = useState(true);

  const categoryId = category.split("-").pop();
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const movie = await getMovieCategories({
          categoryId: Number(categoryId),
          ...pagination,
        });
        setListMovie({
          movies: movie.data.movies,
          total: movie.data.total,
        });
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchMovies();
  }, [pagination, categoryId]);

  return (
    <>
      {loading ? (
        ""
      ) : (
        <CategoryItem
          total={listMovie.total}
          categoryItems={listMovie.movies}
          title={listMovie.movies[0]?.categories[0].name}
          isSwiper={false}
          pagination={pagination}
          setPagination={setPagination}
        />
      )}
    </>
  );
}
