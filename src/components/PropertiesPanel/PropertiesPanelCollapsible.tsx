import { ReactNode, useState } from "react";
import "./PropertiesPanel.css";

interface PropertiesPanelCollapsibleProps {
  title: string;
  children: ReactNode | ReactNode[];
}

export const PropertiesPanelCollapsible = ({
  title,
  children,
}: PropertiesPanelCollapsibleProps) => {
  const [collapsed, toggle] = useState(false);

  return (
    <section className="Collapsible">
      <button
        className="Collapsible-button"
        onClick={() => {
          toggle(!collapsed);
        }}
      >
        <span>{title}</span>
        <span>{collapsed ? "+" : "-"}</span>
      </button>
      {collapsed ? null : <div className="Collapsible-content">{children}</div>}
    </section>
  );
};
