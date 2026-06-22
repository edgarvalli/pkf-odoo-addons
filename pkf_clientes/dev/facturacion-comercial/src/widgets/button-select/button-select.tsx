import { ButtonSelectModal } from "./bs-modal";
import type { ButtonSelectProps } from "./types";
import "./style.css";
import { useState } from "react";

export function ButtonSelect<T>(props: ButtonSelectProps<T>) {
  const [open, setOpen] = useState(Boolean(props.open));
  return (
    <div className="w-100">
      <button className="btn btn-link" onClick={() => setOpen(true)}>
        {props.children}
      </button>
      <ButtonSelectModal {...props} open={open} setOpen={setOpen} />
    </div>
  );
}
