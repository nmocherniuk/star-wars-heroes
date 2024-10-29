import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import EarthImg from "../../assets/earth_image.png";
import SpaceshipImg from "../../assets/millennium_falcon.png";
import DeathStarImg from "../../assets/death_star_image.png";
import TieImg from "../../assets/tie.png";
import classes from "./Root.module.css";

// Define a type for background images, with properties for source, alt text, and CSS class
interface BackgroundImage {
  src: string;
  alt: string;
  className: string;
}

const RootLayout: React.FC = () => {
  // Array of background images, including individual images and multiple "tie" images dynamically generated
  const backgroundImages: BackgroundImage[] = [
    {
      src: EarthImg,
      alt: "The Earth",
      className: classes["earth-image"],
    },
    {
      src: SpaceshipImg,
      alt: "The spaceship",
      className: classes["spaceship-image"],
    },
    {
      src: DeathStarImg,
      alt: "The death star",
      className: classes["deathstar-image"],
    },
    ...Array(3)
      .fill({ src: TieImg, alt: "The tie" })
      .map((image, index) => ({
        ...image,
        className: classes[`tie${index + 1}`],
      })),
  ];

  return (
    <>
      <Header />
      <main>
        <div className={classes["page-background"]}>
          {backgroundImages.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className={`${classes["background-image"]} ${image.className}`}
            />
          ))}
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default RootLayout;
