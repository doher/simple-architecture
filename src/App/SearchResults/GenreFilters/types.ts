export interface GenreFiltersProps {
  genres: string[];
  selectedGenre: string | null;
  onGenreChange: (genre: string | null) => void;
}
