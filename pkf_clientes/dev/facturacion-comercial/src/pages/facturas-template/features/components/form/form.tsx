import { Body } from "./body";
import { Info } from "./info";
import { Tabs } from "./tabs";
import { Moves } from "./moves";
import { Footer } from "./footer";
import { Header } from "./header";
import type { ReactNode } from "react";

import "./styles.css";

export function Form({ children }: { children?: ReactNode }) {
  return (
    <div className="container d-flex flex-column h-100 gap-2">{children}</div>
  );
}

Form.Header = Header;
Form.Body = Body;
Form.Info = Info;
Form.Tabs = Tabs;
Form.Moves = Moves;
Form.Footer = Footer;
