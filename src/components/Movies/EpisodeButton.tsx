import { EpisodeType } from "@/types";

const EpisodeButton = ({
  number_ep,
  isActive,
  handleSelectEpisode,
  episode,
}: {
  number_ep: string;
  isActive?: boolean;
  handleSelectEpisode?: (episode: EpisodeType) => void;
  episode: EpisodeType;
}) => {
  return (
    <button
      onClick={() => handleSelectEpisode && handleSelectEpisode(episode)}
      className={`text-xs md:text-base rounded px-1 md:px-6 py-1 md:py-2 ${
        isActive ? "bg-[#FFBB00] text-black" : "bg-[#202020] text-white"
      }`}
    >
      {number_ep}
    </button>
  );
};
export default EpisodeButton;
