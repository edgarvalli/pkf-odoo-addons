import type { ReactNode } from "react";

export interface AppBaseProps {
  title?: string;
  children?: ReactNode;
  className?: string;
}
export interface AppAsideMenuProps extends AppBaseProps {
  hidden?: boolean;
}

export interface AppContainerProps extends AppBaseProps {
  hideAsideMenu?: boolean;
  asideMenuChildren?: ReactNode;
}
