"use client";

import { getMovieDetail } from "@/services/movies";
import { EpisodeType, MovieType } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InformationMovie from "../MovieInformation";
import MoviePlayer from "../MoviePlayer";
import MovieContent from "../MovieContent";
import EpisodeButton from "../Movies/EpisodeButton";

export default function DetailMovie({ movie }: { movie: string }) {
  const number_ep = useSearchParams().get("number_ep");
  const [detailMovie, setDetailMovie] = useState<MovieType | null>(null);
  const [video_url, setVideoUrl] = useState<string | null>(null);
  const router = useRouter();
  const handleSelectEpisode = (episode: EpisodeType) => {
    router.push(`${window.location.pathname}?number_ep=${episode.ep_no}`);
    setVideoUrl(episode.video_url);
  };
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const detailMovie = await getMovieDetail(movie);
        router.replace(
          `${window.location.pathname}?number_ep=${
            detailMovie.number_ep || detailMovie.episodes.length
          }`
        );
        setDetailMovie(detailMovie);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchMovie();
  }, [movie]);
  useEffect(() => {
    if (!detailMovie) return;
    const video =
      detailMovie.episodes.find(
        (ep: EpisodeType) => ep.ep_no === Number(number_ep)
      ) ?? detailMovie.episodes[detailMovie.episodes.length - 1];
    setVideoUrl(video.video_url);
  }, [number_ep, detailMovie]);
  return (
    <>
      {detailMovie ? (
        <>
          <div className="mb-5">
            <MoviePlayer movieUrl={video_url!} />
          </div>
          <div className="my-0 md:my-1 bg-[#4A4A4A] rounded px-4 py-6 flex gap-1 md:gap-3 flex-wrap items-center">
            <span className="text-xs md:text-base">서버 : </span>
            {detailMovie?.episodes
              .sort((a, b) => a.ep_no - b.ep_no)
              .map((ep) => (
                <EpisodeButton
                  episode={ep}
                  handleSelectEpisode={() => handleSelectEpisode(ep)}
                  key={ep.ep_no}
                  number_ep={`서버${ep.ep_no === 0 ? 1 : ep.ep_no}`}
                  isActive={
                    ep.ep_no ===
                      (Number(number_ep) || detailMovie.episodes.length) ||
                    ep.ep_no === 0
                  }
                />
              ))
              .reverse()}
          </div>
          <InformationMovie profile={detailMovie} />
          <MovieContent />
        </>
      ) : null}
    </>
  );
}
