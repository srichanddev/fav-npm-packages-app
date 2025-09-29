import React from "react";
interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
const TextInput: React.FC<TextInputProps> = (props) => (
  <input
    {...props}
    className={
      "border px-2 py-1 rounded w-full mb-2 " + (props.className || "")
    }
  />
);
export default TextInput;
