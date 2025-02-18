"use client";

import { handleFetchCategories } from "@/services/category";
import { CategoryType, FetchCategoriesResponse, MovieType } from "@/types";
// import { handleFetchMovieByID } from '@/services/movie';
import React, { createContext, useState, useEffect } from "react";

interface MovieContextType {
  category: CategoryType | null;
  movie: MovieType | null;
  categories: CategoryType[] | null;
  movies: MovieType[] | null;

  setMovie: React.Dispatch<React.SetStateAction<MovieType | null>>;
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[] | null>>;
  setMovies: React.Dispatch<React.SetStateAction<MovieType[] | null>>;

  setCategory: React.Dispatch<React.SetStateAction<CategoryType | null>>;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [movies, setMovies] = useState<MovieType[] | null>(null);

  const [category, setCategory] = useState<CategoryType | null>(null);
  const [categories, setCategories] = useState<CategoryType[] | null>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res: FetchCategoriesResponse = await handleFetchCategories();
        if (res) {
          const homeCategory = { cate_id: 0, id: 0, name: "Home" };

          const updatedCategories = [
            homeCategory,
            ...(res as unknown as CategoryType[]),
          ];

          setCategories(updatedCategories);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (isClient) {
      const storedMovie = localStorage.getItem("movie");
      const storedMovies = localStorage.getItem("movies");
      const storedCategory = localStorage.getItem("category");
      const storedCategories = localStorage.getItem("categories");

      if (storedMovie) setMovie(JSON.parse(storedMovie));
      if (storedMovies) setMovies(JSON.parse(storedMovies));
      if (storedCategory) setCategory(JSON.parse(storedCategory));
      if (storedCategories) setCategories(JSON.parse(storedCategories));
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient && movie) {
      localStorage.setItem("movie", JSON.stringify(movie));
    }
  }, [movie, isClient]);

  useEffect(() => {
    if (isClient && movies) {
      localStorage.setItem("movies", JSON.stringify(movies));
    }
  }, [movies, isClient]);

  useEffect(() => {
    if (isClient && category) {
      localStorage.setItem("category", JSON.stringify(category));
    }
  }, [category, isClient]);

  useEffect(() => {
    if (isClient && categories) {
      localStorage.setItem("categories", JSON.stringify(categories));
    }
  }, [categories, isClient]);
  return (
    <MovieContext.Provider
      value={{
        movie,
        movies,
        category,
        categories,
        setMovie,
        setMovies,
        setCategory,
        setCategories,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovie = () => {
  const context = React.useContext(MovieContext);
  if (!context) {
    throw new Error("useMovie must be used within a MovieProvider");
  }
  return context;
};
