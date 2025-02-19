"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import search from "@/assets/icons/search-icon.png";
import logo from "@/assets/logo/logo.png";
import { useParams, useRouter } from "next/navigation";
import { getMovieCategories } from "@/services/movies";
import { MovieType } from "@/types";
import { useClickOutside } from "@/hooks/useClickOutside";

export default function Header() {
  const param = useParams();
  const router = useRouter();

  const [suggestions, setSuggestions] = useState<MovieType[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [hasClicked, setHasClicked] = useState(false);
  console.log(hasClicked);

  const [pagination, setPagination] = useState({
    limit: 10,
    page: 1,
    search: Array.isArray(param.id) ? param.id[0] : param.id || "",
    totalPages: 0,
  });

  const ref = useClickOutside<HTMLDivElement>(() => {
    setSuggestions([]);
    setPagination({
      limit: 10,
      page: 1,
      search: "",
      totalPages: 0,
    });
  });
  const handleSearch = (value: string) => {
    if (!value) {
      router.push("/");
      return;
    }
    router.push(`/search/${decodeURIComponent(value as string)}`);
  };

  const fetchSuggestions = async (searchValue: string, page: number) => {
    if (!shouldFetch) return;
    setIsFetching(true);
    try {
      const movieSuggestions = await getMovieCategories({
        search: searchValue,
        page,
      });
      const movies = movieSuggestions?.data?.movies || [];
      setSuggestions((prevSuggestions) => [...prevSuggestions, ...movies]);
    } catch (error) {
      console.log("Error fetching suggestions:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (pagination.search) {
      setSuggestions([]);
      fetchSuggestions(pagination.search, 1);
    } else {
      setSuggestions([]);
    }
  }, [pagination]);

  const handleSelectSuggestion = (movieTitle: string) => {
    setPagination((prev) => ({
      ...prev,
      search: movieTitle,
    }));
    setShouldFetch(false);
    router.push(`/search/${movieTitle}`);
    setSuggestions([]);
    setHasClicked(true);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom =
      e.currentTarget.scrollHeight ===
      e.currentTarget.scrollTop + e.currentTarget.clientHeight;
    if (bottom && !isFetching && pagination.page < pagination.totalPages) {
      setPagination((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  };

  useEffect(() => {
    if (pagination.page > 1 && pagination.search) {
      fetchSuggestions(pagination.search, pagination.page);
    } else {
      setSuggestions([]);
    }
  }, [pagination.page]);
  return (
    <div className="w-full flex justify-between gap-2 py-4">
      <div
        className="flex items-center aspect-[141/50] cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
      >
        <Image src={logo} alt="logo" width={141} height={50} />
      </div>
      <div className="w-full flex gap-3 justify-end items-center mx-3">
        <div className="relative w-full md:w-[270px] flex flex-col " ref={ref}>
          <input
            value={decodeURIComponent(pagination.search)}
            onChange={(e) => {
              const newValue = e.target.value;
              if (newValue === "") {
                router.push("/");
              }
              setPagination((prev) => ({
                ...prev,
                search: newValue,
                page: 1,
              }));
              setShouldFetch(true);
            }}
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(pagination.search);
              }
            }}
            className="rounded-full bg-[#323232] py-0 h-[30px] md:h-[37px] px-4"
          />
          {pagination.search &&
            Array.isArray(suggestions) &&
            suggestions.length > 0 &&
            !isFetching && (
              <div
                className="absolute w-full md:w-[270px] bg-[#323232] rounded-lg shadow-lg z-50 top-[30px] md:top-[37px] max-h-[500px] overflow-y-auto"
                onScroll={handleScroll}
              >
                {suggestions.map((movie, index) => (
                  <div
                    key={`${movie.id}-${index}`}
                    className="flex items-center gap-4 px-4 py-2 text-white cursor-pointer hover:bg-[#444] hover:rounded"
                    onClick={() => handleSelectSuggestion(movie.title)}
                  >
                    {movie.image && (
                      <Image
                        src={`${movie.image}`}
                        alt={movie.title}
                        width={40}
                        height={60}
                        className="rounded"
                      />
                    )}
                    <div className="flex flex-col gap-2 w-[80%]">
                      <span className="block font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap">
                        {movie.title}
                      </span>

                      {movie.categories && movie.categories.length > 0 && (
                        <span className="text-sm text-gray-400">
                          {movie.categories.map((categorie, index) => (
                            <span key={categorie.id}>
                              {categorie.name}
                              {index < movie.categories.length - 1 && ", "}
                            </span>
                          ))}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
        <div
          onClick={() => {
            handleSearch(pagination.search);
          }}
          className="object-cover w-5 h-5 cursor-pointer"
        >
          <Image src={search} alt="Search" />
        </div>
      </div>
    </div>
  );
}
