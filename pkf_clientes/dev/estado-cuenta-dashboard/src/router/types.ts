export type MenuOption = {
  text: string;
  url: string;
  icon: string;
};

export interface RouterMenuListProps {
  menuOptions: MenuOption[];
  isActive?: (url: string) => boolean;
  onItemClicked?: (url: string) => void;
}
