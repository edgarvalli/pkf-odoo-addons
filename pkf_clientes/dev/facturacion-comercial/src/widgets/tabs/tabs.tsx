import { useState } from "react";
import type { TabsProps } from "./types";
import "./styles.css";

export function Tabs(props: TabsProps) {
  const { tabList, ...divProps } = props;
  const [tabIndex, setTabIndex] = useState(0);

  const renderElement = () => {
    if (props.tabList.length === 0) return null;
    return props.tabList[tabIndex].element;
  };

  return (
    <div {...divProps} className={`ev-tabs ${divProps.className}`}>
      <ul className="ev-tabs__list">
        {props.tabList.map((tab, i) => (
          <li
            key={tab.name}
            onClick={() => setTabIndex(i)}
            className={tabIndex === i ? "active" : ""}
          >
            {tab.title ?? tab.name}
          </li>
        ))}
      </ul>
      {renderElement()}
    </div>
  );
}
