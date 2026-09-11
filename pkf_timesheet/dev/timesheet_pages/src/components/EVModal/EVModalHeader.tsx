import { type EVModalProps } from "./types";
export function EVModalHeader(props: EVModalProps) {
  if (!props.title) return null;
  return (
    <div className="ev-modal-card__header">
      <h3>{props.title}</h3>
      <button className="ev-modal-close" onClick={props.onClose}>
        ✕
      </button>
    </div>
  );
}
