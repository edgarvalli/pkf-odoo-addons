export interface SidebarProps {
  className?: string;
}

export interface SidebarOptionProps {
  text: string;
  icon: string;
  active?: boolean;
  onClick?: () => void;
}
