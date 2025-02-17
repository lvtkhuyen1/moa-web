"use client";
import material from "@/assets/icons/material-movies.png";
import icon_prev_all from "@/assets/icons/first-page.png";
import icon_prev from "@/assets/icons/arow-left.png";
import icon_next from "@/assets/icons/arrow-right.png";
import icon_next_all from "@/assets/icons/last-page.png";
import icon_play from "@/assets/icons/play-icon.png";
import { limitMovies } from "@/constants";
import { CategoryType, MovieType } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { SwiperSlide } from "swiper/react";
import SwiperComponent from "../Swiper";
const MovieItem = ({ film }: { film: MovieType }) => {
  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push(`/${film.categories[0].name.replace("/", "-")}/${film.id}`)
      }
      className="w-full h-full flex flex-col gap-2 font-medium text-white justify-between"
    >
      <div className="relative group overflow-hidden mb-2 flex-1 aspect-[2/3]">
        <Image
          fill
          src={film.image}
          alt=""
          className="w-full object-cover cursor-pointer"
        />
        <div className="absolute inset-0 bg-[#06060699] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
          <div className="relative w-[53px] h-[53px]">
            <Image src={icon_play} alt="icon" fill />
          </div>
        </div>
      </div>

      <span className="text-xs md:text-base xl:text-xl font-medium break-words text-center overflow-hidden whitespace-nowrap text-ellipsis">
        {film.title}
      </span>
    </div>
  );
};
const ButtonPagination = ({
  children,
  className = "bg-[#313131]",
  onClick,
  disable = false,
}: {
  children: React.ReactNode;
  className?: string;
  disable?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      disabled={disable}
      onClick={onClick}
      className={`w-6 h-6 text-white flex justify-center items-center rounded text-xs font-normal ${className}`}
    >
      {children}
    </button>
  );
};
export default function CategoryItem({
  title,
  categories,
  listFilmCategories,
  slidesPerView,
  isShowMore = true,
  isSwiper = true,
  total,
  pagination,
  setPagination,
}: {
  title?: string;
  categories?: CategoryType;
  listFilmCategories: MovieType[];
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
    else if (type === "prev-all") {
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
    } else if (type === "next-all" && total) {
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

  const breakpoints = {
    780: {
      slidesPerView: 5.5,
      spaceBetween: 10,
    },
    0: {
      slidesPerView: 3.5,
      spaceBetween: 5,
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
            {listFilmCategories?.map((film, index) => {
              return (
                <SwiperSlide key={index}>
                  <MovieItem film={film} />
                </SwiperSlide>
              );
            })}
          </SwiperComponent>
        ) : (
          <div className="grid grid-cols-4 xl:grid-cols-5 gap-4">
            {listFilmCategories?.map((film, index) => {
              return <MovieItem key={index} film={film} />;
            })}
          </div>
        )}
      </>
      {total &&
        Math.ceil(total / limitMovies) > 1 &&
        pagination &&
        setPagination && (
          <div className="flex gap-1 items-center justify-center mt-6">
            <ButtonPagination
              disable={paginationSafe.page === 1}
              className={`${
                paginationSafe.page === 1
                  ? "cursor-not-allowed bg-[#313131]"
                  : "cursor-pointer bg-[#313131]"
              }`}
              onClick={() => handleChangePage(paginationSafe.page, "prev-all")}
            >
              <Image
                src={icon_prev_all}
                alt="prev-all"
                width={12}
                height={12}
              />
            </ButtonPagination>

            <ButtonPagination
              disable={paginationSafe.page === 1}
              className={`${
                paginationSafe.page === 1
                  ? "cursor-not-allowed bg-[#313131]"
                  : "cursor-pointer bg-[#313131]"
              }`}
              onClick={() => handleChangePage(paginationSafe.page, "prev")}
            >
              <Image src={icon_prev} alt="prev" width={9} height={9} />
            </ButtonPagination>

            {Array.from({ length: endPage - startPage + 1 }).map((_, index) => {
              const page = startPage + index;
              return (
                <ButtonPagination
                  onClick={() => handleChangePage(page)}
                  className={`${
                    page === paginationSafe.page
                      ? "bg-[#FFBB00]"
                      : "bg-[#313131]"
                  }`}
                  key={page}
                >
                  {page}
                </ButtonPagination>
              );
            })}

            <ButtonPagination
              onClick={() => handleChangePage(paginationSafe.page, "next")}
              disable={paginationSafe.page === totalPages}
              className={`${
                paginationSafe.page === totalPages
                  ? "cursor-not-allowed bg-[#313131]"
                  : "cursor-pointer bg-[#313131]"
              }`}
            >
              <Image src={icon_next} alt="next" width={9} height={9} />
            </ButtonPagination>

            <ButtonPagination
              disable={paginationSafe.page === totalPages}
              className={`${
                paginationSafe.page === totalPages
                  ? "cursor-not-allowed bg-[#313131]"
                  : "cursor-pointer bg-[#313131]"
              }`}
              onClick={() => handleChangePage(paginationSafe.page, "next-all")}
            >
              <Image
                src={icon_next_all}
                alt="next-all"
                width={12}
                height={12}
              />
            </ButtonPagination>
          </div>
        )}
    </>
  );
}
