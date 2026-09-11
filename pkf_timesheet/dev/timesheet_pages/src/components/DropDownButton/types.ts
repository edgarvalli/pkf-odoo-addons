export interface DropDownItem {
  label?: string;
  value: string | number;
}
export interface DropDownButtonProps {
  items: DropDownItem[];
  defaultValue?: (items: DropDownItem[]) => DropDownItem;
  onChange?: (item: DropDownItem) => void;
  align?: "left" | "right";
}
