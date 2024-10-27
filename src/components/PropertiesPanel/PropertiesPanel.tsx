import { useState } from "react";
import { ComponentType } from "../../App";
import "./PropertiesPanel.css";
import { PropertiesPanelCollapsible } from "./PropertiesPanelCollapsible";
import { MarginsAndPaddings } from "./MarginsAndPaddings/MarginsAndPaddings";
import { SizeSection } from "./SizeSection/SizeSection";

interface PropertiesPanelProps {
  tree: ComponentType[];
  fetchComponents: () => Promise<void>;
}

export const PropertiesPanel = ({
  tree,
  fetchComponents,
}: PropertiesPanelProps) => {
  const [selectedElement, setSelectedElement] = useState(0);

  return (
    <aside className="PropertiesPanel">
      <PropertiesPanelCollapsible title="Load examples">
        <div className="Element-selector">
          {tree.map((component, idx) => (
            <button
              key={component.id}
              onClick={() => setSelectedElement(idx)}
              className={idx === selectedElement ? "Selected-element" : ""}
            >
              {component.name}
            </button>
          ))}
        </div>
      </PropertiesPanelCollapsible>
      <PropertiesPanelCollapsible title="Margins & Padding">
        <MarginsAndPaddings
          component={tree[selectedElement]}
          refetch={fetchComponents}
        />
      </PropertiesPanelCollapsible>
      <PropertiesPanelCollapsible title="Size">
        <SizeSection
          component={tree[selectedElement]}
          refetch={fetchComponents}
        />
      </PropertiesPanelCollapsible>
    </aside>
  );
};
