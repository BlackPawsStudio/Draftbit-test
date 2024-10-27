import { useCallback, useEffect, useState } from "react";
import { ComponentType, IdentType } from "../../../App";
import EditableLabel from "../EditableLabel/EditableLabel";
import "./MarginsAndPaddings.css";

interface MarginsAndPaddingsProps {
  component: ComponentType;
  refetch: () => Promise<void>;
}

export const MarginsAndPaddings = ({
  component,
  refetch,
}: MarginsAndPaddingsProps) => {
  const { margin: defaultMargin, padding: defaultPadding } = component;

  const [margin, setMargin] = useState<IdentType>(defaultMargin);
  const [padding, setPadding] = useState<IdentType>(defaultPadding);

  useEffect(() => {
    setMargin(component.margin);
    setPadding(component.padding);
  }, [component]);

  const updateMargins = useCallback(async () => {
    const updatedMargin = { ...margin };
    (["top", "right", "bottom", "left"] as const).forEach((side) => {
      updatedMargin[side] =
        updatedMargin[side].trim() === "" ? "auto" : updatedMargin[side];
    });
    setMargin(updatedMargin);
    await fetch("http://localhost:12346/update/margin", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: component.id,
        margin: updatedMargin,
      }),
    });
    await refetch();
  }, [component.id, margin, refetch]);

  const updatePaddings = useCallback(async () => {
    const updatedPadding = { ...padding };
    (["top", "right", "bottom", "left"] as const).forEach((side) => {
      updatedPadding[side] =
        updatedPadding[side].trim() === "" ? "auto" : updatedPadding[side];
    });
    await fetch("http://localhost:12346/update/padding", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: component.id,
        padding: updatedPadding,
      }),
    });
    await refetch();
  }, [component.id, padding, refetch]);

  return (
    <>
      <div className="Block">
        <h1>Overall</h1>
        <div className="Overall-inputs">
          <div className="Input">
            Margin
            <div>
              <EditableLabel
                text={
                  margin.top === margin.right &&
                  margin.right === margin.bottom &&
                  margin.bottom === margin.left
                    ? margin.top
                    : ""
                }
                onChange={(value) => {
                  setMargin({
                    top: value,
                    right: value,
                    bottom: value,
                    left: value,
                  });
                }}
                save={updateMargins}
                stayInput
              />
            </div>
          </div>
          <div className="Input">
            Padding
            <div>
              <EditableLabel
                text={
                  padding.top === padding.right &&
                  padding.right === padding.bottom &&
                  padding.bottom === padding.left
                    ? padding.top
                    : ""
                }
                onChange={(value) => {
                  setPadding({
                    top: value,
                    right: value,
                    bottom: value,
                    left: value,
                  });
                }}
                save={updatePaddings}
                stayInput
              />
            </div>
          </div>
        </div>
      </div>
      <div className="Block">
        <h1>Individual</h1>
        <div className="Individual-container">
          <span className="Margin-label">Margin</span>
          <div className="Container-items">
            <EditableLabel
              text={margin.top}
              onChange={(value) => {
                setMargin({
                  ...margin,
                  top: value,
                });
              }}
              save={updateMargins}
            />
            <div className="Internal-inputs">
              <EditableLabel
                text={margin.left}
                onChange={(value) => {
                  setMargin({
                    ...margin,
                    left: value,
                  });
                }}
                save={updateMargins}
              />
              <EditableLabel
                text={margin.right}
                onChange={(value) => {
                  setMargin({
                    ...margin,
                    right: value,
                  });
                }}
                save={updateMargins}
              />
            </div>
            <EditableLabel
              text={margin.bottom}
              onChange={(value) => {
                setMargin({
                  ...margin,
                  bottom: value,
                });
              }}
              save={updateMargins}
            />
          </div>
          <div className="Container-box">
            <span className="Padding-label">Padding</span>
            <EditableLabel
              text={padding.top}
              onChange={(value) => {
                setPadding({
                  ...padding,
                  top: value,
                });
              }}
              save={updatePaddings}
            />
            <div className="Internal-inputs">
              <EditableLabel
                text={padding.left}
                onChange={(value) => {
                  setPadding({
                    ...padding,
                    left: value,
                  });
                }}
                save={updatePaddings}
              />
              <EditableLabel
                text={padding.right}
                onChange={(value) => {
                  setPadding({
                    ...padding,
                    right: value,
                  });
                }}
                save={updatePaddings}
              />
            </div>
            <EditableLabel
              text={padding.bottom}
              onChange={(value) => {
                setPadding({
                  ...padding,
                  bottom: value,
                });
              }}
              save={updatePaddings}
            />
          </div>
        </div>
      </div>
    </>
  );
};
