import { GenreFilters } from "./GenreFilters/GenreFilters";
import { Pagination } from "./Pagination/Pagination";
import { SearchFeedback } from "./SearchFeedback/SearchFeedback";
import styles from "./SearchResults.module.css";
import { ShowCard } from "./ShowCard/ShowCard";
import type { SearchResultsProps } from "./types";
import { usePresenter } from "./usePresenter";

export const SearchResults = (props: SearchResultsProps) => {
  const feedback = usePresenter(props);
  const { first, last, total } = props.resultRange;
  const isSuccess = props.status === "success";

  return (
    <section className={styles.root} aria-labelledby="results-title">
      <div className={styles.heading}>
        <h2 id="results-title">Результаты</h2>
        <p className={styles.count} role="status">
          {total > 0 && `${first}–${last} из ${total}`}
        </p>
      </div>

      {feedback !== null && <SearchFeedback {...feedback} />}

      {isSuccess && total > 0 && (
        <>
          <GenreFilters {...props.genreFilters} />
          <ul className={styles.grid} aria-label="Найденные сериалы">
            {props.shows.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </ul>
        </>
      )}

      <footer className={styles.footer}>
        {isSuccess && <Pagination {...props.pagination} />}
        <a href="https://www.tvmaze.com/" target="_blank" rel="noreferrer">
          Данные TVmaze <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </section>
  );
};
