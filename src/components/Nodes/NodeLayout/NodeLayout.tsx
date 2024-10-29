import React from "react";
import { Handle, Position } from "@xyflow/react";
import classes from "./NodeLayout.module.css";

// Interface for defining props of the NodeLayout component
interface NodeLayoutProps {
  id: number; // Unique identifier for the node
  title: string; // Title to display for the node
  imageType: string; // Type of image to fetch (e.g., characters, films)
  hasTopHandler?: boolean; // Optional prop to display a top connection handle
  hasBottomHandler?: boolean; // Optional prop to display a bottom connection handle
  children: React.ReactNode; // Content to be displayed inside the node
}

// NodeLayout functional component
const NodeLayout: React.FC<NodeLayoutProps> = ({
  id,
  title,
  imageType,
  hasTopHandler = false,
  hasBottomHandler = false,
  children,
}) => {
  return (
    <>
      <img
        className={classes["node-photo"]}
        src={`https://starwars-visualguide.com/assets/img/${imageType}/${id}.jpg`}
        alt={title}
      />
      <h4 className={classes["node-title"]}>{title}</h4>
      <div className={classes["node-description"]}>{children}</div>
      {hasTopHandler && <Handle type="target" position={Position.Top} />}
      {hasBottomHandler && <Handle type="source" position={Position.Bottom} />}
    </>
  );
};

export default NodeLayout;
