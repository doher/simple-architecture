import styles from "./SearchField.module.css";
import type { SearchFieldProps } from "./types";
import { usePresenter } from "./usePresenter";

export const SearchField = ({ query, onQueryChange }: SearchFieldProps) => {
  const { inputId, inputRef, changeQuery, clearQuery } =
    usePresenter(onQueryChange);

  return (
    <>
      <h1 className={styles.title}>
        <label htmlFor={inputId}>Поиск сериалов</label>
      </h1>
      <search className={styles.search}>
        <svg
          className={styles.searchIcon}
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m16 16 4 4" />
        </svg>
        <input
          className={styles.input}
          id={inputId}
          ref={inputRef}
          type="search"
          value={query}
          onChange={changeQuery}
          placeholder="Введите название сериала"
          autoComplete="off"
          spellCheck={false}
        />
        {query.length > 0 && (
          <button
            className={styles.clear}
            type="button"
            aria-label="Очистить поиск"
            onClick={clearQuery}
          >
            <span aria-hidden="true">×</span>
          </button>
        )}
      </search>
    </>
  );
};
