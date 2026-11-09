import { useState } from "react";
import type { ShowCardProps } from "./types";

export function usePresenter({ show }: ShowCardProps) {
  const [failedPoster, setFailedPoster] = useState<string>();
  const poster = show.image?.medium;
  const year = show.premiered?.slice(0, 4);
  const genres = show.genres.slice(0, 2).join(" / ");
  const metadata = [year, genres].filter(Boolean).join(" · ");
  const rating = show.rating.average?.toFixed(1);

  const handlePosterError = () => {
    setFailedPoster(poster);
  };

  return {
    metadata,
    rating,
    poster: poster === failedPoster ? undefined : poster,
    handlePosterError,
  };
}
