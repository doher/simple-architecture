import { Button } from "../../../ui-kit/Button/Button";
import styles from "./Pagination.module.css";
import type { PaginationProps } from "./types";
import { usePresenter } from "./usePresenter";

export function Pagination(props: PaginationProps) {
  const {
    pages,
    currentPageButton,
    hasPagination,
    canGoBack,
    canGoForward,
    goBack,
    goForward,
  } = usePresenter(props);

  if (!hasPagination) {
    return null;
  }

  return (
    <nav className={styles.pages} aria-label="Страницы результатов">
      <Button
        className={styles.button}
        aria-label="Назад"
        disabled={!canGoBack}
        onClick={goBack}
      >
        ‹
      </Button>
      {pages.map(({ number, current, label, select }) => (
        <Button
          className={styles.button}
          key={number}
          ref={current ? currentPageButton : undefined}
          aria-label={label}
          aria-current={current ? "page" : undefined}
          onClick={select}
        >
          {number}
        </Button>
      ))}
      <Button
        className={styles.button}
        aria-label="Вперёд"
        disabled={!canGoForward}
        onClick={goForward}
      >
        ›
      </Button>
    </nav>
  );
}
