import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { PropertiesPanel } from "./components/PropertiesPanel/PropertiesPanel";

export interface IdentType {
  top: string;
  right: string;
  bottom: string;
  left: string;
}

export interface ComponentType {
  id: number;
  name: string;
  margin: IdentType;
  padding: IdentType;
  width: string;
  height: string;
}

const App = () => {
  const [componentTree, setComponentTree] = useState<ComponentType[]>([]);

  const fetchComponents = useCallback(async () => {
    void fetch("http://localhost:12346/components").then((res) => {
      res.json().then((data) => {
        setComponentTree(data);
      });
    });
  }, []);

  useEffect(() => {
    fetchComponents();
  }, [fetchComponents]);

  return (
    <div className="App">
      {componentTree.length ? (
        <>
          <PropertiesPanel
            tree={componentTree}
            fetchComponents={fetchComponents}
          />
          <div className="Components-container">
            {componentTree.map((el) => (
              <div
                key={el.id}
                style={{
                  paddingTop: `${
                    el.padding.top === "auto" ? "auto" : el.padding.top
                  }px`,
                  paddingRight: `${
                    el.padding.right === "auto" ? "auto" : el.padding.right
                  }px`,
                  paddingBottom: `${
                    el.padding.bottom === "auto" ? "auto" : el.padding.bottom
                  }px`,
                  paddingLeft: `${
                    el.padding.left === "auto" ? "auto" : el.padding.left
                  }px`,
                  marginTop: `${
                    el.margin.top === "auto" ? "auto" : el.margin.top
                  }px`,
                  marginRight: `${
                    el.margin.right === "auto" ? "auto" : el.margin.right
                  }px`,
                  marginBottom: `${
                    el.margin.bottom === "auto" ? "auto" : el.margin.bottom
                  }px`,
                  marginLeft: `${
                    el.margin.left === "auto" ? "auto" : el.margin.left
                  }px`,
                  width: el.width === "auto" ? "auto" : `${el.width}px`,
                  height: el.height === "auto" ? "auto" : `${el.height}px`,
                }}
              >
                {el.name}
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default App;
