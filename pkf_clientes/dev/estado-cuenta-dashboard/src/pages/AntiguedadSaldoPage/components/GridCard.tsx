import { formatNumber } from "@/utils/numbers";
import type { GridCardProps } from "../types";

export function GridCard(props: GridCardProps) {
  return (
    <div
      className={`grid-card ${props.onClick ? "grid-card-clickable" : ""}`}
      onClick={props.onClick}
      role={props.onClick ? "button" : undefined}
      tabIndex={props.onClick ? 0 : undefined}
    >
      <div className="grid-card-header">
        <span className="grid-card-title">{props.title}</span>

        {props.onClick && (
          <i className="grid-card-icon fa fa-arrow-up-right-from-square" />
        )}
      </div>

      <div className="grid-card-body">
        <span className="grid-card-value text-primary">
          {props.formatNumber ? formatNumber(props.value) : props.value}
        </span>
      </div>
    </div>
  );
}
