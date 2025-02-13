"use client";
import { Swiper } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

export default function SwiperComponent({
  children,
  slidesPerView,
  gap,
}: {
  children: React.ReactNode;
  slidesPerView?: number;
  gap?: string;
}) {
  return (
    <>
      <Swiper
        slidesPerView={slidesPerView ?? 1}
        spaceBetween={gap ?? "0"}
        navigation={true}
        modules={[Navigation]}
      >
        {children}
      </Swiper>
    </>
  );
}
