import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";

// Mocking the useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Header Component", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    // Reset the mock before each test
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear any mock calls or instances
  });

  test("renders logo and Back button on non-home page", () => {
    render(
      <MemoryRouter initialEntries={["/some-other-page"]}>
        <Header />
      </MemoryRouter>
    );

    // Check if the logo is rendered
    const logo = screen.getByAltText("A website logo");
    expect(logo).toBeInTheDocument();

    // Check if the Back button is rendered
    const backButton = screen.getByRole("button", { name: /back/i });
    expect(backButton).toBeInTheDocument();
  });

  test("does not render Back button on home page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>
    );

    // Check if the Back button is not rendered
    const backButton = screen.queryByRole("button", { name: /back/i });
    expect(backButton).not.toBeInTheDocument();
  });

  test("navigates back when Back button is clicked", () => {
    render(
      <MemoryRouter initialEntries={["/some-other-page"]}>
        <Header />
      </MemoryRouter>
    );

    // Get the Back button
    const backButton = screen.getByRole("button", { name: /back/i });

    // Simulate a click on the Back button
    fireEvent.click(backButton);

    // Check if the navigate function was called
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test("does not navigate back when Back button is clicked on home page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>
    );

    const backButton = screen.queryByRole("button", { name: /back/i });
    if (backButton) {
      fireEvent.click(backButton);
      expect(mockNavigate).not.toHaveBeenCalled();
    }
  });
});
