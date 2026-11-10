import styles from "./Horizon.module.css";

export function Horizon() {
  return (
    <div className={styles.horizon} aria-hidden="true">
      <span className={styles.sun} />
      <span className={styles.ridge} />
      <span className={styles.terrain} />
    </div>
  );
}
