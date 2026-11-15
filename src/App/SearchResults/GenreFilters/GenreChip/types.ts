export interface GenreChipProps {
  genre: string | null;
  selectedGenre: string | null;
  onGenreChange: (genre: string | null) => void;
}
