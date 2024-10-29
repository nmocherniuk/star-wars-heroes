import React from "react";
import classes from "./ErrorBlock.module.css";

// Define an interface for the props
interface ErrorBlockProps {
  title: string; // Title of the error message
  message: string; // Detailed error message
}

// Define the ErrorBlock component using the props interface
const ErrorBlock: React.FC<ErrorBlockProps> = ({ title, message }) => {
  return (
    <div className={classes["error-block"]}>
      <h2 className={classes["error-title"]}>{title}</h2>
      <p className={classes["error-message"]}>{message}</p>
    </div>
  );
};

export default ErrorBlock;
