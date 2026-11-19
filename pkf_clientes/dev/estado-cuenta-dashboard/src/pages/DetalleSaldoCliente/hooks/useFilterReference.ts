import { useEffect, useId, useRef, useState } from "react";
import type { FilterReferenceCardProps } from "../types";
export function useFilterReference(props: FilterReferenceCardProps) {
  const [show, setShow] = useState(false);
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  const referenceExists = (r: string) => {
    if (!props.value) return false;
    return props.value.includes(r);
  };

  const toggleReference = (reference: string) => {
    if (!props.value) return;
    const value = props.value;
    const exists = referenceExists(reference);

    props.onChange?.(
      exists
        ? props.value?.filter((r) => r !== reference)
        : [...value, reference],
    );
  };

  const selectAll = () => {
    props.onChange?.([...props.references]);
  };

  const clearAll = () => {
    props.onChange?.([]);
  };

  useEffect(() => {
    if (!show) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShow(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShow(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [show]);

  return {
    show,
    id,
    containerRef,
    setShow,
    selectAll,
    clearAll,
    toggleReference,
    referenceExists,
  };
}
