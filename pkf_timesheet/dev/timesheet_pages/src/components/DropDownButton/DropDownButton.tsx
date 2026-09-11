import { useDropDownButton } from "./useDropdownButton";
import type { DropDownButtonProps } from "./types";
import "./dropdownbutton.css";

export function DropDownButton(props: DropDownButtonProps) {
  const {
    isEmpty,
    itemSelected,
    align,
    isOpen,
    setOpen,
    createKey,
    handleClick,
  } = useDropDownButton(props);

  if (isEmpty) {
    return <span className="text-info">Debes definir al menos un item</span>;
  }

  return (
    <div className="dropdown-button">
      <button className="btn text-primary" onClick={() => setOpen(!isOpen)}>
        {itemSelected?.label ?? itemSelected?.value}
      </button>

      <div
        className={`dropdown-items ${isOpen ? "show" : ""}`}
        style={{ ...align }}
      >
        <ul className="list-group list-group-flush">
          {props.items.map((item, i) => (
            <li
              key={createKey(item, i)}
              onClick={() => handleClick(item)}
              className="list-group-item hover-gray cursor-pointer"
            >
              {item.label ?? item.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
