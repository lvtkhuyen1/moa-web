"use client";

import Hls from "hls.js";
import { useEffect, useRef } from "react";

const MoviePlayer = ({ movieUrl }: { movieUrl: string }) => {
  const videoRef = useRef<null | HTMLVideoElement>(null);

  useEffect(() => {
    if (!movieUrl || !videoRef.current) return;

    const hls = new Hls({
      debug: true,
    });

    const videoElement = videoRef.current;

    if (Hls.isSupported()) {
      hls.loadSource(movieUrl);
      hls.attachMedia(videoElement);
      hls.on(Hls.Events.ERROR, (err) => {
        console.log(err);
      });
    } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
      videoElement.src = movieUrl;
    }
    return () => {
      hls.destroy();
    };
  }, [movieUrl]);

  return (
    <>
      <div className="w-full ">
        <div data-vjs-player>
          <video ref={videoRef} controls style={{ width: "100%" }} />
        </div>
      </div>
    </>
  );
};

export default MoviePlayer;
