import type { ReactNode } from "react";
interface EVModalBodyProps {
  children?: ReactNode;
  className?: string;
}
export function EVModalBody(props: EVModalBodyProps) {
  return (
    <div
      className={`ev-modal-card__body ${props.className ? props.className : ""}`}
    >
      {props.children}
    </div>
  );
}
