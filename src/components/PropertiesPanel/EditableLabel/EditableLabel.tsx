import { useState, useRef, KeyboardEvent } from "react";
import "./EditableLabel.css";

interface EditableLabelProps {
  text: string;
  onChange: (newText: string) => void;
  save: () => void;
  stayInput?: boolean;
}

const EditableLabel = ({
  text,
  onChange,
  save,
  stayInput,
}: EditableLabelProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleLabelClick = () => {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    if (text.trim() === "") {
      onChange("auto");
    }
    setTimeout(() => save(), 0);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      handleInputBlur();
    }
  };

  return (
    <div className="EditableLabel" onClick={handleLabelClick}>
      {isEditing || stayInput ? (
        <>
          <input
            ref={inputRef}
            className={`EditableLabel-Input ${
              stayInput ? "EditableLabel-Input-visible" : ""
            }`}
            value={text === "auto" && !stayInput ? "" : text}
            onChange={(e) => {
              const re = /^[0-9\b]+$/;
              if (e.target.value === "" || re.test(e.target.value)) {
                onChange(e.target.value);
              }
            }}
            onBlur={handleInputBlur}
            onKeyPress={handleKeyPress}
            maxLength={8}
          />
          px
        </>
      ) : (
        <>
          <div
            className={`${stayInput ? "EditableLabel-Input" : ""} ${
              text.toLowerCase() === "auto" ? "" : "EditableLabel-underline"
            }`}
          >
            {text}
          </div>
          px
        </>
      )}
    </div>
  );
};

export default EditableLabel;
