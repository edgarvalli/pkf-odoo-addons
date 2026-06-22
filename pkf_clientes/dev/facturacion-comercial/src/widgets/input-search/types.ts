import type { InputHTMLAttributes, MouseEvent } from "react";

export interface InputSearchProps<
  T,
> extends InputHTMLAttributes<HTMLInputElement> {
  buttonLabel?: string;
  data: T[];
  onItemSelect?: (item: T) => void;
  onButtonClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}
