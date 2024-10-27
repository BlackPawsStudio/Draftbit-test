import { useCallback, useState } from "react";
import { ComponentType } from "../../../App";
import EditableLabel from "../EditableLabel/EditableLabel";

interface SizeSectionProps {
  component: ComponentType;
  refetch: () => Promise<void>;
}

export const SizeSection = ({ component, refetch }: SizeSectionProps) => {
  const { width: defaultWidth, height: defaultHeight } = component;

  const [width, setWidth] = useState<string>(defaultWidth);
  const [height, setHeight] = useState<string>(defaultHeight);

  const updateWidth = useCallback(async () => {
    await fetch("http://localhost:12346/update/width", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: component.id,
        width,
      }),
    });
    await refetch();
  }, [component.id, width, refetch]);

  const updateHeight = useCallback(async () => {
    await fetch("http://localhost:12346/update/height", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: component.id,
        height,
      }),
    });
    await refetch();
  }, [component.id, height, refetch]);

  return (
    <div className="Overall-inputs">
      <div className="Input">
        Width
        <div>
          <EditableLabel
            text={width}
            onChange={setWidth}
            save={updateWidth}
            stayInput
          />
        </div>
      </div>
      <div className="Input">
        Height
        <div>
          <EditableLabel
            text={height}
            onChange={setHeight}
            save={updateHeight}
            stayInput
          />
        </div>
      </div>
    </div>
  );
};
