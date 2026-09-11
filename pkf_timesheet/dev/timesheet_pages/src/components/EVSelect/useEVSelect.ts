import {
  useState,
  type ChangeEvent,
  type MouseEvent,
  type FocusEvent,
  useMemo,
  useEffect,
  useRef,
} from "react";
import type { EVSelectProps } from "./types";

export function useEVSelect<T>(props: EVSelectProps<T>) {
  const [value, setValue] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [items, setItems] = useState<T[]>([]);
  const [itemSelected, setItem] = useState<T | null>(null);

  const delayRef = useRef<any>(null);

  const renderedValue = useMemo(
    () => (itemSelected ? String(props.renderValue?.(itemSelected)) : ""),
    [itemSelected, props.renderValue, props.defaultValue],
  );

  const handleOnSearch = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(delayRef.current);
    const { value } = e.target;
    setValue(value);

    const itemsFiltered = props.itemSource.filter((x) =>
      props.filter(value, x),
    );

    if (itemsFiltered.length > 0) {
      setItems(itemsFiltered);
      return;
    }

    delayRef.current = setTimeout(() => {
      props.onSearch?.(value);
    }, 500);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setTimeout(() => {
      setOpen(false);
      setValue(renderedValue);
      props.onBlur?.(e);
    }, 150);
  };
  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setValue("");
    setOpen(true);
    props.onFocus?.(e);
  };

  const handleMouse = (e: MouseEvent<HTMLDivElement | HTMLLIElement>) => {
    e.stopPropagation();
    !isOpen && setOpen(true);
  };

  const handleItemSelect = (item: T) => {
    setItem(item);
    setValue(renderedValue);
    props.onChange?.(item);
  };

  useEffect(() => {
    setItems(props.itemSource);
  }, [props.itemSource]);

  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".ev-select")) {
        setOpen(false);
        setValue(renderedValue);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [renderedValue]);

  useEffect(() => {
    if (!props.defaultValue) return;
    setItem(props.defaultValue);
  }, [props.defaultValue]);

  return {
    isOpen,
    value,
    items,
    handleMouse,
    handleBlur,
    handleFocus,
    handleOnSearch,
    handleItemSelect,
  };
}
