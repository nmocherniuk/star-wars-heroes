import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import classes from "./Header.module.css";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the current path is the home page
  const isHomePage = location.pathname === "/";

  // Check if the current path is the characters page
  const isCharactersPage = location.pathname === "/characters";

  const handleBackClick = () => {
    if (isCharactersPage) {
      // If on the characters page, navigate to the home page
      navigate("/");
    }
    if (!isHomePage && !isCharactersPage) {
      // If on any other page except home or characters, navigate to characters page
      navigate("/characters");
    }
  };

  return (
    <header className={classes.header}>
      <div className={classes["header-container"]}>
        <nav className={classes["header-nav"]}>
          <Link to="/">
            <img className={classes.logo} src={logo} alt="A website logo" />
          </Link>

          {!isHomePage && (
            <button
              onClick={handleBackClick}
              className={classes["button-back"]}
            >
              Back
              <svg
                viewBox="0 -960 960 960"
                height="24px"
                width="24px"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240z"></path>
              </svg>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
