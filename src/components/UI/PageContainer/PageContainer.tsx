// Import necessary React dependencies and CSS styles
import React, { ReactNode } from "react";
import classes from "./PageContainer.module.css";

// Define the types for PageContainer props, specifying that it will receive children as ReactNode
interface PageContainerProps {
  children: ReactNode;
}

// Define the PageContainer component, which accepts children and wraps them in a styled container
const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <section className={classes["page-section"]}>
      <div className={classes.container}>{children}</div>
    </section>
  );
};

export default PageContainer;
