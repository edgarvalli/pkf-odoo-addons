import type { SidebarOptionProps } from "./types";
export function SidebarOption(props: SidebarOptionProps) {
  return (
    <li
      className={`list-group-item cursor-pointer hover-gray text-muted ${props.active ? "active" : ""}`}
      onClick={props.onClick}
    >
      <i className={`fa fa-${props.icon} me-2`} aria-hidden="true"></i>
      {props.text}
    </li>
  );
}
