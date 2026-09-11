import type { ReactNode } from "react";

export function EVModalFooter(props: { children?: ReactNode }) {
  return <div className="ev-modal-card__footer">{props.children}</div>;
}
