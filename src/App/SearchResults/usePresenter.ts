import type { SearchResultsProps } from "./types";

export function usePresenter({
  genres,
  selectedGenre,
  onGenreChange,
  resultRange: { first, last, total },
}: SearchResultsProps) {
  const chips = [null, ...genres].map((genre) => ({
    genre,
    label: genre ?? "Все жанры",
    active: genre === selectedGenre,
    select: () => onGenreChange(genre),
  }));

  const range = total ? `${first}–${last} из ${total}` : "";

  return { chips, range };
}
