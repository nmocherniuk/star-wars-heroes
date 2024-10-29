import React from "react";
import { Link } from "react-router-dom";
import PageContainer from "../../components/UI/PageContainer/PageContainer";
import classes from "./Home.module.css";

// Define Main page
const HomePage: React.FC = () => {
  return (
    <PageContainer>
      <h1 className={classes["main-title"]}>Discover The Star Wars universe</h1>
      <p className={classes["main-subtitle"]}>
        Find all the information about your favorite characters and their
        journey through the galaxy.
      </p>
      <Link to="characters" className={classes["cta-link"]}>
        Research hero
      </Link>
    </PageContainer>
  );
};

export default HomePage;
