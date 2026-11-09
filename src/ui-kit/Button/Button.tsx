import styles from "./Button.module.css";
import type { ButtonProps } from "./types";

export function Button({ className, type = "button", ...props }: ButtonProps) {
  const buttonClassName = className
    ? `${styles.button} ${className}`
    : styles.button;

  return <button {...props} type={type} className={buttonClassName} />;
}
