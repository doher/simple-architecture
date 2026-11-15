import { Button } from "~/ui-kit/Button/Button";
import styles from "./Pagination.module.css";
import type { PaginationProps } from "./types";
import { usePresenter } from "./usePresenter";

export const Pagination = (props: PaginationProps) => {
  const { page, pageCount } = props;
  const {
    currentPageButton,
    hasPagination,
    canGoBack,
    canGoForward,
    goBack,
    goForward,
    selectPage,
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
      {Array.from({ length: pageCount }, (_, index) => {
        const number = index + 1;
        const isCurrent = number === page;

        return (
          <Button
            className={styles.button}
            key={number}
            ref={isCurrent ? currentPageButton : undefined}
            aria-label={`Страница ${number}`}
            aria-current={isCurrent ? "page" : undefined}
            onClick={selectPage(number)}
          >
            {number}
          </Button>
        );
      })}
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
};
