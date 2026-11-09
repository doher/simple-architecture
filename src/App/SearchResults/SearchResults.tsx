import { Button } from "../../ui-kit/Button/Button";
import { Pagination } from "./Pagination/Pagination";
import styles from "./SearchResults.module.css";
import { ShowCard } from "./ShowCard/ShowCard";
import type { SearchResultsProps } from "./types";
import { usePresenter } from "./usePresenter";

export function SearchResults(props: SearchResultsProps) {
  const { chips, range } = usePresenter(props);

  return (
    <section className={styles.root} aria-labelledby="results-title">
      <div className={styles.heading}>
        <h2 id="results-title">Результаты</h2>
        <p className={styles.count} role="status">
          {range}
        </p>
      </div>

      {props.status === "loading" && (
        <p className={styles.message} role="status">
          Ищем сериалы…
        </p>
      )}

      {props.status === "error" && (
        <div className={styles.error}>
          <p className={styles.message} role="alert">
            {props.errorMessage}
          </p>
          <Button className={styles.retry} onClick={props.onRetry}>
            Повторить поиск
          </Button>
        </div>
      )}

      {props.status === "success" && props.resultRange.total === 0 && (
        <p className={styles.message} role="status">
          Ничего не найдено. Попробуйте другое название.
        </p>
      )}

      {props.status === "success" && props.resultRange.total > 0 && (
        <>
          {props.genres.length > 0 && (
            <fieldset className={styles.filters} aria-label="Жанры">
              {chips.map((chip) => (
                <Button
                  key={chip.genre}
                  className={styles.chip}
                  lang={chip.genre === null ? undefined : "en"}
                  aria-pressed={chip.active}
                  onClick={chip.select}
                >
                  {chip.label}
                </Button>
              ))}
            </fieldset>
          )}
          <ul className={styles.grid} aria-label="Найденные сериалы">
            {props.shows.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </ul>
        </>
      )}

      <footer className={styles.footer}>
        {props.status === "success" && <Pagination {...props.pagination} />}
        <a href="https://www.tvmaze.com/" target="_blank" rel="noreferrer">
          Данные TVmaze <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </section>
  );
}
