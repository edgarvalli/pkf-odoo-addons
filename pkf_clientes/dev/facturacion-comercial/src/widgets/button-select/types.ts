import type {
  ChangeEvent,
  Dispatch,
  InputHTMLAttributes,
  ReactNode,
  SetStateAction,
} from "react";

export interface BSHeader<T> {
  name: Extract<keyof T, string>;
  text?: string;
  render?: (item: T) => ReactNode;
}

export interface ButtonSelectProps<T> {
  title?: string;
  children?: ReactNode;
  keyExtractor: (item: T) => string | number;
  headers: readonly BSHeader<T>[];
  onItemSelected?: (item: T) => void;
  data: T[];
  open?: boolean;
  onClose?: () => void;
  onSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
  slots?: { inputProps?: InputHTMLAttributes<HTMLInputElement> };
}

export interface ButtonSelectModalProps<T> extends ButtonSelectProps<T> {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface ButtonRef {
  openModal: () => void;
  closeModal: () => void;
}
