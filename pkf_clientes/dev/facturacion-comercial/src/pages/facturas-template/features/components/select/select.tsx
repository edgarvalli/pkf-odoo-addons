import type { ChangeEvent } from "react";
import type { SelectProps } from "./types";

export function Select<T>(props: SelectProps<T>) {
  const {
    label,
    data,
    name,
    keyExtractor,
    valueKey,
    textKey,
    onSelectChange,
    optionDisabledText,
    value,
    ...divProps
  } = props;

  const renderOptions = (data ?? []).map((item) => {
    const value = String(item[valueKey]);
    const text = String(item[textKey]);
    const key = keyExtractor(item);
    return (
      <option value={value} key={key}>
        {text}
      </option>
    );
  });

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const option = data.find((item) => String(item[valueKey]) === value);
    if (!option) return;
    onSelectChange?.(option as T);
  };

  return (
    <div {...divProps}>
      <label htmlFor={name} className="form-label fw-bold">
        {label}
      </label>
      <select
        name={name}
        id={name}
        className="form-control"
        value={value ?? 0}
        onChange={handleChange}
      >
        <option value="0" disabled>
          {optionDisabledText ?? "Selecciona una opción"}
        </option>
        {renderOptions}
      </select>
    </div>
  );
}
