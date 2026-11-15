import type { ShowCardProps } from "./types";
import { useShowPoster } from "./useShowPoster";

const PREMIERE_YEAR_LENGTH = 4;
const MAX_VISIBLE_GENRES = 2;
const RATING_DECIMAL_PLACES = 1;

export const usePresenter = ({ show }: ShowCardProps) => {
  const { poster, handlePosterError } = useShowPoster(show.image?.medium);
  const year = show.premiered?.slice(0, PREMIERE_YEAR_LENGTH);
  const genres = show.genres.slice(0, MAX_VISIBLE_GENRES).join(" / ");
  const metadata = [year, genres].filter(Boolean).join(" · ");
  const rating = show.rating.average?.toFixed(RATING_DECIMAL_PLACES);

  return {
    metadata,
    rating,
    poster,
    handlePosterError,
  };
};
