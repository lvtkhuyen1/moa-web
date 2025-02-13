import Image from "next/image";
import React from "react";
import video from "@/assets/movies/video.png";

export default function Movie() {
  return (
    <>
      <Image alt="" src={video} />
    </>
  );
}
