import { GenreChip } from "./GenreChip/GenreChip";
import styles from "./GenreFilters.module.css";
import type { GenreFiltersProps } from "./types";

export const GenreFilters = ({
  genres,
  selectedGenre,
  onGenreChange,
}: GenreFiltersProps) => {
  if (genres.length === 0) {
    return null;
  }

  return (
    <fieldset className={styles.filters} aria-label="Жанры">
      {[null, ...genres].map((genre) => (
        <GenreChip
          key={genre === null ? "all" : `genre:${genre}`}
          genre={genre}
          selectedGenre={selectedGenre}
          onGenreChange={onGenreChange}
        />
      ))}
    </fieldset>
  );
};
