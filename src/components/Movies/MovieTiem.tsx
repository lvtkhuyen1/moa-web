"use client";
import icon_play from "@/assets/icons/play-icon.png";
import { MovieType } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
        <div className="absolute inset-0 bg-[#06060699] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"></div>
        <div className="absolute inset-0 justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer hidden md:flex">
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
export default MovieItem;
