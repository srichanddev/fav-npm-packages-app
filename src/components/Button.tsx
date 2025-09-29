import React from "react";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
const Button: React.FC<ButtonProps> = (props) => (
  <button
    {...props}
    className={
      "bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 " +
      (props.className || "")
    }
  >
    {props.children}
  </button>
);
export default Button;
