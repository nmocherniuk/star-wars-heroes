import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RootLayout from "./Root";
import EarthImg from "../../assets/earth_image.png";
import SpaceshipImg from "../../assets/millennium_falcon.png";
import DeathStarImg from "../../assets/death_star_image.png";
import TieImg from "../../assets/tie.png";
import "@testing-library/jest-dom";

// Mock the Header component to simplify the test
jest.mock("../../components/Header/Header", () => () => (
  <div>Header Component</div>
));

describe("RootLayout Component", () => {
  test("renders the Header component", () => {
    render(
      <MemoryRouter>
        <RootLayout />
      </MemoryRouter>
    );

    // Check if the mocked header is rendered
    expect(screen.getByText("Header Component")).toBeInTheDocument();
  });

  test("renders all background images with correct src and alt", () => {
    render(
      <MemoryRouter>
        <RootLayout />
      </MemoryRouter>
    );

    const earthImage = screen.getByAltText("The Earth");
    expect(earthImage).toHaveAttribute("src", EarthImg);

    const spaceshipImage = screen.getByAltText("The spaceship");
    expect(spaceshipImage).toHaveAttribute("src", SpaceshipImg);

    const deathStarImage = screen.getByAltText("The death star");
    expect(deathStarImage).toHaveAttribute("src", DeathStarImg);

    // Check multiple TIE images with the same alt text
    const tieImages = screen.getAllByAltText("The tie");
    expect(tieImages).toHaveLength(3);
    tieImages.forEach((img) => {
      expect(img).toHaveAttribute("src", TieImg);
    });
  });

  test("renders child components within Outlet", () => {
    // Mock child content for the Outlet
    const ChildComponent = () => <div>Child Component</div>;

    render(
      <MemoryRouter initialEntries={["/"]}>
        <RootLayout />
        <ChildComponent />
      </MemoryRouter>
    );

    // Check if the child component is rendered correctly
    expect(screen.getByText("Child Component")).toBeInTheDocument();
  });
});
