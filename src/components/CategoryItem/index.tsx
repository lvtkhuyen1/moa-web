"use client";
import { IMovies } from "@/types";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import material from "@/assets/icons/material-movies.png";
import SwiperComponent from "../Swiper";
export default function CategoryItem({
  title,
  listFilmCategories,
  slidesPerView,
}: {
  title: string;
  listFilmCategories: IMovies[];
  slidesPerView?: number;
}) {
  return (
    <div className="cursor-pointer">
      <div className="flex justify-between mb-6 items-center">
        <div className="flex gap-[10px] items-center">
          <Image src={material} alt="camera movie" width={32} height={32} />
          <span className="text-white font-semibold text-[32px] leading-[46px]">
            {title}
          </span>
        </div>
        <button className="bg-[#FFBB00] rounded w-[67px] h-[29px]">
          +더보기
        </button>
      </div>
      <div className="flex">
        <SwiperComponent gap={"16px"} slidesPerView={slidesPerView ?? 1}>
          {listFilmCategories.map((film, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="flex flex-col gap-2 font-medium text-white">
                  <div className="relative group overflow-hidden cursor-pointer mb-2">
                    <Image
                      width={533}
                      height={300}
                      src={film.image}
                      alt=""
                      className="w-full h-[450px] object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  <span className="text-2xl leading-7 font-medium">
                    {film.title}
                  </span>
                  {/* <span className="text-xl leading-6 text-[#A5A5A5]">
                  {film.des}
                </span> */}
                </div>
              </SwiperSlide>
            );
          })}
        </SwiperComponent>
      </div>
    </div>
  );
}
