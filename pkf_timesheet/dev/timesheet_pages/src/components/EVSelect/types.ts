import type { ReactNode, FocusEvent } from "react";
import type React from "react";

export interface EVSelectProps<T> {
  itemSource: T[];
  label?: string;
  className?: string;
  defaultValue?: T;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange?: (item: T) => void;
  renderItem?: (item: T) => ReactNode;
  keyExtractor(item: T): number | string;
  onSearch?: (val: string) => void;
  filter: (value: string, item: T) => boolean;
  renderValue?: (item: T) => string | number;
  inputProps?: React.HtmlHTMLAttributes<HTMLInputElement>;
  labelProps?: React.HtmlHTMLAttributes<HTMLLabelElement>;
}
