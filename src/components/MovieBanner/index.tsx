"use client";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Image, { StaticImageData } from "next/image";
import squidgame from "@/assets/movies/squid-game.png";
import deadpool from "@/assets/movies/deadpool.png";
import irishman from "@/assets/movies/the-irish-man.png";
import SwiperComponent from "../Swiper";

interface ImageMovie {
  id: number;
  image: string | StaticImageData;
  alt: string;
}
const movies: ImageMovie[] = [
  {
    id: 1,
    image: squidgame,
    alt: "Squid Game",
  },
  {
    id: 2,
    image: deadpool,
    alt: "Deadpool & Wolverine",
  },
  {
    id: 3,
    image: irishman,
    alt: "The Irishman",
  },
  {
    id: 4,
    image: deadpool,
    alt: "Deadpool & Wolverine",
  },
];
export default function MovieBanner() {
  return (
    <>
      <div className="hidden md:block">
        <SwiperComponent gap={"16px"} slidesPerView={3}>
          {movies.map((movie) => {
            return (
              <SwiperSlide key={movie.id}>
                <Image
                  src={movie.image}
                  alt=""
                  width={1214}
                  height={1598}
                  objectFit="center"
                />
              </SwiperSlide>
            );
          })}
        </SwiperComponent>
      </div>
    </>
  );
}
