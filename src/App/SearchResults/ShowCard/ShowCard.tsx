import styles from "./ShowCard.module.css";
import type { ShowCardProps } from "./types";
import { usePresenter } from "./usePresenter";

export function ShowCard({ show }: ShowCardProps) {
  const { metadata, rating, poster, handlePosterError } = usePresenter({
    show,
  });

  return (
    <li>
      <a
        className={styles.card}
        href={show.url}
        target="_blank"
        rel="noreferrer"
      >
        <div className={styles.art}>
          {poster ? (
            <img
              className={styles.poster}
              src={poster}
              alt=""
              onError={handlePosterError}
            />
          ) : (
            <span className={styles.sun} aria-hidden="true" />
          )}
          {rating && (
            <span className={styles.rating}>
              <span className={styles.star} aria-hidden="true">
                ★
              </span>
              <span className={styles.visuallyHidden}>Рейтинг </span>
              {rating}
              <span className={styles.visuallyHidden}> из 10</span>
            </span>
          )}
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{show.name}</h3>
          {metadata && <p className={styles.metadata}>{metadata}</p>}
        </div>
      </a>
    </li>
  );
}
