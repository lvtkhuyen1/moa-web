import Image from "next/image";
import React from "react";
import lavie from "@/assets/card/lavie.png";
import acard from "@/assets/card/acard.png";
import zero from "@/assets/card/zero.png";
import mix from "@/assets/card/mix.png";
import station from "@/assets/card/station.png";
import starbuck from "@/assets/card/starbuck.png";
import yes from "@/assets/card/yes.png";
import bet16 from "@/assets/card/bet16.png";

export default function HeaderCard() {
  const imageCard = [lavie, acard, zero, mix, station, starbuck, yes, bet16];

  return (
    <div className="grid grid-cols-4 md:gap-2 py-0 md:py-4">
      {imageCard.map((image, index) => (
        <div
          key={index}
          className="flex justify-center items-center aspect-[441/92] pb-1 md:pb-0"
        >
          <Image alt="" src={image} />
        </div>
      ))}
    </div>
  );
}
