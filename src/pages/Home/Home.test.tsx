import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter for testing routing
import HomePage from "./Home"; // Import the HomePage component

describe("HomePage", () => {
  // This test checks if the HomePage renders correctly
  it("renders the HomePage correctly", () => {
    // Render the HomePage within MemoryRouter
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // Check if the main title is in the document
    const mainTitle = screen.getByText("Discover The Star Wars universe");
    expect(mainTitle).toBeInTheDocument();

    // Check if the subtitle is in the document
    const mainSubtitle = screen.getByText(
      "Find all the information about your favorite characters and their journey through the galaxy."
    );
    expect(mainSubtitle).toBeInTheDocument();

    // Check if the CTA link is in the document
    const ctaLink = screen.getByText("Research hero");
    expect(ctaLink).toBeInTheDocument();
  });

  // This test checks if the navigation works correctly
  it("navigates to the characters page when the link is clicked", () => {
    // Render the HomePage within MemoryRouter with a specific initial route
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomePage />
      </MemoryRouter>
    );

    // Simulate a click on the CTA link
    expect(screen.getByRole("link", { name: "Research hero" })).toHaveAttribute(
      "href",
      "/characters"
    );
  });
});
