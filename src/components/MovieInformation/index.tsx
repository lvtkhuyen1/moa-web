"use client";
import { MovieType } from "@/types";
import moment from "moment";
import Image from "next/image";

export default function InformationMovie({ profile }: { profile: MovieType }) {
  return (
    <div className="my-1 bg-[#4A4A4A] rounded px-4 py-6 flex flex-col md:flex-row gap-[50px] md:gap-5 xl:gap-[90px]">
      <div className="relative max-w-[237px] w-full aspect-[237/340]">
        <Image
          src={profile?.image ?? ""}
          alt={profile?.title ?? "title"}
          width={237}
          height={340}
          className="rounded-[10px] object-cover"
        />
      </div>
      <div className="flex flex-col gap-5 px-0 mt-0 xl:w-1/2 justify-center max-w-[567px] w-full py-4">
        <div className="flex flex-col">
          <h4 className="text-2xl font-semibold xl:text-[32px] truncate mb-2 md:mb-6">
            {profile?.title ?? "No title"}
          </h4>
          <div className="flex items-center mb-2 gap-9 md:mb-5 text-[#FFFFFF]">
            <span>{`개봉: ${moment(profile.createdDate).format(
              "YYYY.MM.DD"
            )}`}</span>
          </div>
          <p className="text-xs md:text-sm w-full text-[#FFFFFF]">
            {profile?.des ?? "No description"}
          </p>
        </div>
      </div>
      <div className="xl:w-1/4 w-full flex flex-col xl:gap-[65px] justify-center">
        <div className="flex flex-col gap-1">
          {!!profile.actor &&
            !!JSON.parse(profile.actor as unknown as string)[0] &&
            (Array.isArray(JSON.parse(profile.actor as unknown as string)) ? (
              <span>
                <strong className="font-light">출연:</strong>{" "}
                {JSON.parse(profile.actor as unknown as string).join(", ")}
              </span>
            ) : (
              <span>
                <strong className="font-light">출연:</strong>{" "}
                {(profile.actor as unknown as string).split(",").join(", ")}
              </span>
            ))}
          {profile.genre && (
            <span>
              <strong className="font-light">장르:</strong> {profile.genre}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
