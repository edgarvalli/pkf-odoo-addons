import type { EVModalProps } from "./types";
import { EVModalBody } from "./EVModalBody";
import { EVModalHeader } from "./EVModalHeader";
import { EVModalFooter } from "./EVModalFooter";
import "./evmodal.css";

export function EVModal(props: EVModalProps) {
  const { children, open, onClose } = props;

  if (!open) return null;

  return (
    <div className="ev-modal" onClick={onClose}>
      <div
        className="ev-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{ height: props.heightCard, minHeight: props.minHeightCard }}
      >
        <EVModalHeader {...props} />
        {children}
      </div>
    </div>
  );
}

EVModal.Header = EVModalHeader;
EVModal.Body = EVModalBody;
EVModal.Footer = EVModalFooter;
