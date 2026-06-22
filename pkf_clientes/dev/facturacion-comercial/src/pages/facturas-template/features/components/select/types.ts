import type { HtmlHTMLAttributes } from "react";

export interface SelectProps<T> extends HtmlHTMLAttributes<HTMLDivElement> {
  label?: string;
  data: T[];
  keyExtractor: (item: T) => number | string;
  valueKey: keyof T;
  textKey: keyof T;
  optionDisabledText?: string;
  name?: string;
  onSelectChange?: (item: T) => void;
  value?: number | string;
}
