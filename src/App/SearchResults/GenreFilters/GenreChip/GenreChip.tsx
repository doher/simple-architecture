import { Button } from "~/ui-kit/Button/Button";
import styles from "./GenreChip.module.css";
import type { GenreChipProps } from "./types";
import { usePresenter } from "./usePresenter";

export const GenreChip = (props: GenreChipProps) => {
  const { genre } = props;
  const { isSelected, selectGenre } = usePresenter(props);

  return (
    <Button
      className={styles.chip}
      lang={genre === null ? undefined : "en"}
      aria-pressed={isSelected}
      onClick={selectGenre}
    >
      {genre ?? "Все жанры"}
    </Button>
  );
};
