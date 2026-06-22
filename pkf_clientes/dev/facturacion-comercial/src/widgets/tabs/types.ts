import type { HtmlHTMLAttributes, ReactNode } from "react";

export type Tab = {
  name: string;
  element: ReactNode;
  title?: string;
  params?: Record<string, any>;
};
export interface TabsProps extends HtmlHTMLAttributes<HTMLDivElement> {
  tabList: Tab[];
}
