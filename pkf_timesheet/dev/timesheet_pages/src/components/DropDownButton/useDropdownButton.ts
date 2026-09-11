import { useEffect, useState } from "react";
import type { DropDownButtonProps, DropDownItem } from "./types";

export function useDropDownButton(props: DropDownButtonProps) {
  const [isOpen, setOpen] = useState(false);
  const [itemSelected, setItem] = useState<DropDownItem | null>(null);

  const isEmpty = props.items.length === 0;

  const createKey = (item: DropDownItem, index?: number) => {
    return `${String(item.value).replace(" ", "_")}_${index}`;
  };

  const align = props.align == "right" ? { right: 0 } : { left: 0 };

  const handleClick = (item: DropDownItem) => {
    setItem(item);
    setOpen(false);
    props.onChange?.(item);
  };

  useEffect(() => {
    const item = props.defaultValue
      ? props.defaultValue(props.items)
      : props.items[0];

    setItem(item);
    props.onChange?.(item);
  }, []);

  return {
    itemSelected,
    isEmpty,
    align,
    isOpen,
    setOpen,
    handleClick,
    createKey,
  };
}
