import React from "react";
import { useRouteError } from "react-router-dom";
import Header from "../../components/Header/Header";
import PageContainer from "../../components/UI/PageContainer/PageContainer";
import classes from "./Error.module.css";

// Define the interface for the error type
interface RouteError {
  status?: number; // Optional status code
  data?: { message?: string }; // Optional data containing a message
}

// Define Error page
const ErrorPage: React.FC = () => {
  const error: RouteError = useRouteError() as RouteError;

  // Default error title and message
  let title = "An error occurred!";
  let message = "Something went wrong!";

  // Customizes error title and message for 404 (Not Found) errors
  if (error.status === 404) {
    message = error.data?.message || "Could not find resource or page!";
    title = "Not found!";
  }

  return (
    <>
      <Header />
      <main className={classes["error-container"]}>
        <PageContainer>
          <h1 className={classes["error-title"]}>{title}</h1>
          <p className={classes["error-message"]}>{message}</p>
        </PageContainer>
      </main>
    </>
  );
};

export default ErrorPage;
