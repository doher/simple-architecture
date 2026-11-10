import { Horizon } from "./Horizon/Horizon";
import styles from "./SearchHeader.module.css";
import type { SearchHeaderProps } from "./types";
import { usePresenter } from "./usePresenter";

export function SearchHeader({ query, onQueryChange }: SearchHeaderProps) {
  const { inputId, inputRef, changeQuery, clearQuery } =
    usePresenter(onQueryChange);

  return (
    <header className={styles.hero}>
      <Horizon />
      <p className={styles.brand}>
        <svg
          className={styles.mark}
          aria-hidden="true"
          viewBox="0 0 24 17"
          fill="none"
        >
          <rect x="0.5" y="0.5" width="23" height="16" rx="3" />
          <rect x="5.5" y="3.5" width="13" height="10" stroke="currentColor" />
          <path
            d="M3 3v2m0 2v2m0 2v2M21 3v2m0 2v2m0 2v2"
            stroke="currentColor"
          />
        </svg>
        <span>
          КАДР
          <span className={styles.brandDot} aria-hidden="true">
            .
          </span>
        </span>
      </p>
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
        {query && (
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
    </header>
  );
}
