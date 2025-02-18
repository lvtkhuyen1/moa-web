"use client";
import material from "@/assets/icons/material-movies.png";
import first_page from "@/assets/icons/first-page.png";
import icon_prev from "@/assets/icons/arrow-left.png";
import icon_next from "@/assets/icons/arrow-right.png";
import last_page from "@/assets/icons/last-page.png";
import { limitMovies } from "@/constants";
import { CategoryType, MovieType } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";
import { SwiperSlide } from "swiper/react";
import SwiperComponent from "../Swiper";
import PaginationButton from "../Movies/PaginationButton";
import MovieItem from "../Movies/MovieTiem";
export default function CategoryItem({
  title,
  categories,
  categoryItems,
  slidesPerView,
  isShowMore = true,
  isSwiper = true,
  total,
  pagination,
  setPagination,
}: {
  title?: string;
  categories?: CategoryType;
  categoryItems: MovieType[];
  slidesPerView?: number;
  isShowMore?: boolean;
  isSwiper?: boolean;
  total?: number;
  pagination?: {
    page: number;
    limit: number;
  };
  setPagination?: Dispatch<
    SetStateAction<{
      page: number;
      limit: number;
      search?: string;
    }>
  >;
}) {
  const router = useRouter();
  const handleChangePage = (page: number, type?: string) => {
    if (!setPagination) return;
    else if (type === "first-page") {
      setPagination({
        ...pagination,
        page: 1,
        limit: limitMovies,
      });
    } else if (type === "prev") {
      setPagination({
        ...pagination,
        page: page - 1,
        limit: limitMovies,
      });
    } else if (type === "last-page" && total) {
      setPagination({
        ...pagination,
        page: Math.ceil(total / limitMovies),
        limit: limitMovies,
      });
    } else if (type === "next") {
      setPagination({
        ...pagination,
        page: page + 1,
        limit: limitMovies,
      });
    } else {
      setPagination({
        ...pagination,
        page,
        limit: limitMovies,
      });
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [pagination]);

  const breakpoints = {
    780: {
      slidesPerView: 5.5,
      spaceBetween: 10,
    },
    0: {
      slidesPerView: 3.5,
      spaceBetween: 5,
      gap: "0px",
    },
  };
  const totalPages = total ? Math.ceil(total / limitMovies) : 0;

  const paginationSafe = pagination ?? { page: 1, limit: limitMovies };

  const maxPagesToShow = 5;
  let startPage = Math.max(
    1,
    paginationSafe.page - Math.floor(maxPagesToShow / 2)
  );
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }
  return (
    <>
      <>
        {title && (
          <div className="flex justify-between mb-2 md:mb-6 items-center">
            <div className="flex gap-1 md:gap-3 items-center">
              <Image
                src={material}
                alt="Material Movies"
                width={32}
                height={32}
              />
              <span className="text-white font-semibold text-base md:text-lg xl:text-3xl">
                {title}
              </span>
            </div>
            {isShowMore && categories && (
              <button
                onClick={() =>
                  router.push(
                    `/${categories.name.replace("/", "-")}-${
                      categories.cate_id
                    }`
                  )
                }
                className="bg-[#FFBB00] rounded p-1 md:p-2 text-black font-bold text-xs md:text-base xl:text-2xl"
              >
                +더보기
              </button>
            )}
          </div>
        )}

        {isSwiper ? (
          <SwiperComponent
            gap={"16px"}
            slidesPerView={slidesPerView ?? 1}
            breakpoints={breakpoints}
          >
            {categoryItems?.map((film, index) => (
              <SwiperSlide key={index}>
                <MovieItem film={film} />
              </SwiperSlide>
            ))}
          </SwiperComponent>
        ) : (
          <div className="grid grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
            {categoryItems?.map((film, index) => (
              <MovieItem key={index} film={film} />
            ))}
          </div>
        )}
      </>
      {total &&
        Math.ceil(total / limitMovies) > 1 &&
        pagination &&
        setPagination && (
          <div className="flex gap-1 items-center justify-center mt-6">
            <PaginationButton
              disable={paginationSafe.page === 1}
              className={`${
                paginationSafe.page === 1
                  ? "cursor-not-allowed bg-[#313131]"
                  : "cursor-pointer bg-[#313131]"
              }`}
              onClick={() =>
                handleChangePage(paginationSafe.page, "first-page")
              }
            >
              <Image src={first_page} alt="first-page" width={12} height={12} />
            </PaginationButton>

            <PaginationButton
              disable={paginationSafe.page === 1}
              className={`${
                paginationSafe.page === 1
                  ? "cursor-not-allowed bg-[#313131]"
                  : "cursor-pointer bg-[#313131]"
              }`}
              onClick={() => handleChangePage(paginationSafe.page, "prev")}
            >
              <Image src={icon_prev} alt="prev" width={9} height={9} />
            </PaginationButton>

            {Array.from({ length: endPage - startPage + 1 }).map((_, index) => {
              const page = startPage + index;
              return (
                <PaginationButton
                  onClick={() => handleChangePage(page)}
                  className={`${
                    page === paginationSafe.page
                      ? "bg-[#FFBB00]"
                      : "bg-[#313131]"
                  }`}
                  key={page}
                >
                  {page}
                </PaginationButton>
              );
            })}

            <PaginationButton
              onClick={() => handleChangePage(paginationSafe.page, "next")}
              disable={paginationSafe.page === totalPages}
              className={`${
                paginationSafe.page === totalPages
                  ? "cursor-not-allowed bg-[#313131]"
                  : "cursor-pointer bg-[#313131]"
              }`}
            >
              <Image src={icon_next} alt="next" width={9} height={9} />
            </PaginationButton>

            <PaginationButton
              disable={paginationSafe.page === totalPages}
              className={`${
                paginationSafe.page === totalPages
                  ? "cursor-not-allowed bg-[#313131]"
                  : "cursor-pointer bg-[#313131]"
              }`}
              onClick={() => handleChangePage(paginationSafe.page, "last-page")}
            >
              <Image src={last_page} alt="last-page" width={12} height={12} />
            </PaginationButton>
          </div>
        )}
    </>
  );
}
