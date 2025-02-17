"use client";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

interface SwiperComponentProps {
  children: React.ReactNode;
  slidesPerView?: number;
  gap?: string;
  breakpoints?: {
    [key: number | string]: {
      slidesPerView: number;
      spaceBetween: number;
    };
  };
}

export default function SwiperComponent({
  children,
  slidesPerView,
  gap,
  breakpoints,
}: SwiperComponentProps) {
  return (
    <Swiper
      slidesPerView={slidesPerView ?? 1}
      spaceBetween={gap ?? "0"}
      navigation={true}
      modules={[Navigation]}
      breakpoints={breakpoints}
      loop
    >
      {children}
    </Swiper>
  );
}
