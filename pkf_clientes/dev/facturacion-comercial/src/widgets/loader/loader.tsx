import type { LoaderProps } from "./types";

import "./styles.css";

export function Loader(props: LoaderProps) {
  if (!props.show) return null;
  return (
    <div className="ev-loader">
      <div className="spinner-border" role="status">
        <span className="sr-only">{props.message}</span>
      </div>
    </div>
  );
}
