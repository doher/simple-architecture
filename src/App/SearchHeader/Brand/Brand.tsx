import styles from "./Brand.module.css";

export const Brand = () => {
  return (
    <p className={styles.brand}>
      <svg
        className={styles.mark}
        aria-hidden="true"
        viewBox="0 0 24 17"
        fill="none"
      >
        <rect x="0.5" y="0.5" width="23" height="16" rx="3" />
        <rect x="5.5" y="3.5" width="13" height="10" stroke="currentColor" />
        <path d="M3 3v2m0 2v2m0 2v2M21 3v2m0 2v2m0 2v2" stroke="currentColor" />
      </svg>
      <span>
        КАДР
        <span className={styles.brandDot} aria-hidden="true">
          .
        </span>
      </span>
    </p>
  );
};
