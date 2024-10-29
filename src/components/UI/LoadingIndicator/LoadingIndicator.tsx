import React, { FC } from "react";
import classes from "./LoadingIndicator.module.css";

// Define props interface for LoadingIndicator component with optional className
interface LoadingIndicatorProps {
  children: React.ReactNode;
  className?: string;
}

// Define LoadingIndicator functional component with destructured props
const LoadingIndicator: FC<LoadingIndicatorProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`${classes["loading-container"]} ${className || ""}`}>
      <p className={classes["loading-indicator"]}>{children}</p>
    </div>
  );
};

export default LoadingIndicator;
