import type { GenreChipProps } from "./types";

export const usePresenter = ({
  genre,
  selectedGenre,
  onGenreChange,
}: GenreChipProps) => {
  return {
    isSelected: genre === selectedGenre,
    selectGenre: () => onGenreChange(genre),
  };
};
