"use client";
import material from "@/assets/icons/material-movies.png";
import icon_prev_all from "@/assets/icons/first-page.png";
import icon_prev from "@/assets/icons/arrow-left.png";
import icon_next from "@/assets/icons/arrow-right.png";
import icon_next_all from "@/assets/icons/last-page.png";
import { limitMovies } from "@/constants";
import { ICategory, IMovies } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";
import { SwiperSlide } from "swiper/react";
import CommonSwiper from "../Swiper";
const IMovieCard = ({ film }: { film: IMovies }) => {
  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push(`/${film.categories[0].name.replace("/", "-")}/${film.id}`)
      }
      className="flex flex-col gap-2 font-medium text-white"
    >
      <div className="relative group overflow-hidden cursor-pointer mb-2 rounded-lg">
        <img
          width={533}
          height={300}
          src={film.image}
          alt=""
          className="w-full h-[450px] object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
      </div>

      <span className="text-2xl leading-7 font-medium">{film.title}</span>
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
  categories?: ICategory;
  listFilmCategories: IMovies[];
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
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pagination]);
  return (
    <>
      <div className="cursor-pointer">
        {title && (
          <div className="flex justify-between mb-6 items-center">
            <div className="flex gap-[10px] items-center">
              <Image
                src={material}
                alt="Material Movies"
                width={32}
                height={32}
              />
              <span className="text-white font-semibold text-[32px] leading-[46px]">
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
                className="bg-[#FFBB00] rounded w-[67px] h-[29px]"
              >
                +더보기
              </button>
            )}
          </div>
        )}

        {isSwiper ? (
          <CommonSwiper gap={"16px"} slidesPerView={slidesPerView ?? 1}>
            {listFilmCategories?.map((film, index) => {
              return (
                <SwiperSlide key={index}>
                  <IMovieCard film={film} />
                </SwiperSlide>
              );
            })}
          </CommonSwiper>
        ) : (
          <div className="grid lg:grid-cols-3 xl:grid-cols-5 sm:grid-cols-2 grid-cols-1 gap-4">
            {listFilmCategories?.map((film, index) => {
              return <IMovieCard key={index} film={film} />;
            })}
          </div>
        )}
      </div>
      {total &&
        Math.ceil(total / limitMovies) > 1 &&
        pagination &&
        setPagination && (
          <div className="flex gap-1 items-center justify-center mt-6">
            <ButtonPagination
              disable={pagination.page === 1}
              className={`${
                pagination.page === 1
                  ? "cursor-not-allowed bg-[#313131]"
                  : "cursor-pointer bg-[#313131]"
              }`}
              onClick={() => handleChangePage(pagination.page, "prev-all")}
            >
              <Image
                src={icon_prev_all}
                alt="prev-all"
                width={12}
                height={12}
              />
            </ButtonPagination>
            <ButtonPagination
              disable={pagination.page === 1}
              className={`${
                pagination.page === 1
                  ? "cursor-not-allowed bg-[#313131]"
                  : "cursor-pointer bg-[#313131]"
              }`}
              onClick={() => handleChangePage(pagination.page, "prev")}
            >
              <Image src={icon_prev} alt="prev" width={9} height={9} />
            </ButtonPagination>

            {Array.from({ length: Math.ceil(total / limitMovies) }).map(
              (_, index) => (
                <ButtonPagination
                  onClick={() => handleChangePage(index + 1)}
                  className={`${
                    index + 1 === pagination.page
                      ? "bg-[#FFBB00]"
                      : "bg-[#313131]"
                  }`}
                  key={index}
                >
                  {index + 1}
                </ButtonPagination>
              )
            )}
            <ButtonPagination
              onClick={() => handleChangePage(pagination.page, "next")}
              disable={pagination.page === Math.ceil(total / limitMovies)}
              className={`${
                pagination.page === Math.ceil(total / limitMovies)
                  ? "cursor-not-allowed bg-[#313131]"
                  : "cursor-pointer bg-[#313131]"
              }`}
            >
              <Image
                src={icon_next}
                alt="next"
                width={9}
                height={9}
                className="rotate-180"
              />
            </ButtonPagination>
            <ButtonPagination
              disable={pagination.page === Math.ceil(total / limitMovies)}
              className={`${
                pagination.page === Math.ceil(total / limitMovies)
                  ? "cursor-not-allowed bg-[#313131]"
                  : "cursor-pointer bg-[#313131]"
              }`}
              onClick={() => handleChangePage(pagination.page, "next-all")}
            >
              <Image
                src={icon_next_all}
                alt="prev-all"
                width={12}
                height={12}
              />
            </ButtonPagination>
          </div>
        )}
    </>
  );
}
