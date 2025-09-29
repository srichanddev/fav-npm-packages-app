import React from "react";
interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
const TextArea: React.FC<TextAreaProps> = (props) => (
  <textarea
    {...props}
    className={
      "border rounded px-2 py-1 w-full mb-2 " + (props.className || "")
    }
  />
);
export default TextArea;
