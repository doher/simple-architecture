import { Button } from "~/ui-kit/Button/Button";
import styles from "./SearchFeedback.module.css";
import type { SearchFeedbackProps } from "./types";

export const SearchFeedback = ({
  status,
  isEmpty,
  errorMessage,
  onRetry,
}: SearchFeedbackProps) => {
  if (status === "error") {
    return (
      <div className={styles.error}>
        <p className={styles.message} role="alert">
          {errorMessage}
        </p>
        <Button className={styles.retry} onClick={onRetry}>
          Повторить поиск
        </Button>
      </div>
    );
  }

  if (status === "pending" || (status === "success" && !isEmpty)) {
    return null;
  }

  return (
    <p className={styles.message} role="status">
      {status === "loading"
        ? "Ищем сериалы…"
        : "Ничего не найдено. Попробуйте другое название."}
    </p>
  );
};
