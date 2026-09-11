import { useEVSelect } from "./useEVSelect";
import type { EVSelectProps } from "./types";

import "./evselect.css";

export function EVSelect<T = Record<string, any>>(props: EVSelectProps<T>) {
  const {
    value,
    items,
    isOpen,
    handleOnSearch,
    handleBlur,
    handleFocus,
    handleMouse,
    handleItemSelect,
  } = useEVSelect(props);

  return (
    <div className={`ev-select ${props.className}`}>
      <div className="ev-select__control">
        <label {...props.labelProps}>{props.label}</label>
        <input
          {...props.inputProps}
          onChange={handleOnSearch}
          onBlur={handleBlur}
          onFocus={handleFocus}
          value={value}
        />
      </div>
      <div
        className={`ev-select__result ${isOpen && "show"}`}
        onMouseOver={handleMouse}
        onMouseDown={handleMouse}
      >
        <ul>
          {items.slice(0, 5).map((item) => (
            <li
              key={props.keyExtractor(item)}
              onMouseDown={(e) => {
                e.stopPropagation();
                handleItemSelect(item);
              }}
            >
              {props.renderItem?.(item)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
