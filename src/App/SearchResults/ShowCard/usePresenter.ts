import { useState } from "react";
import type { ShowCardProps } from "./types";

const PREMIERE_YEAR_LENGTH = 4;
const MAX_VISIBLE_GENRES = 2;
const RATING_DECIMAL_PLACES = 1;

export const usePresenter = ({ show }: ShowCardProps) => {
  const [failedPoster, setFailedPoster] = useState<string>();
  const poster = show.image?.medium;
  const year = show.premiered?.slice(0, PREMIERE_YEAR_LENGTH);
  const genres = show.genres.slice(0, MAX_VISIBLE_GENRES).join(" / ");
  const metadata = [year, genres].filter(Boolean).join(" · ");
  const rating = show.rating.average?.toFixed(RATING_DECIMAL_PLACES);

  const handlePosterError = () => {
    setFailedPoster(poster);
  };

  return {
    metadata,
    rating,
    poster: poster === failedPoster ? undefined : poster,
    handlePosterError,
  };
};
