import { type SpinnerProps } from "./types";
import "./spinner.css";
import { type CSSProperties } from "react";

export function Spinner({ message = "Cargando...", hide, size }: SpinnerProps) {
  size;
  if (hide) return null;

  const styles: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <div className="spinner-container">
      <div className="spinner" style={styles} />

      <span className="spinner-message">{message}</span>
    </div>
  );
}
