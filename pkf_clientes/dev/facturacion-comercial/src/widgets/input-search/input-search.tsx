import type { InputSearchProps } from "./types";
import "./input-search.css";
export function InputSearch<T>(props: InputSearchProps<T>) {
  const { buttonLabel, onItemSelect, data, onButtonClick, ...inputProps } =
    props;
  return (
    <div className="input-search">
      <i className="fa fa-search"></i>
      <input type="text" {...inputProps} />
      <button className="btn btn-primary btn-link" onClick={onButtonClick}>
        {buttonLabel ?? "Buscar"}
      </button>
    </div>
  );
}
