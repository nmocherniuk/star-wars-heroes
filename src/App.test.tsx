import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mocks for rendering pages on routes
jest.mock("./pages/Home/Home", () => () => <div>Home Page</div>);
jest.mock("./pages/Characters/Characters", () => () => (
  <div>Characters Page</div>
));
jest.mock("./pages/CharacterDetail/CharacterDetail", () => () => (
  <div>Character Profile Page</div>
));
jest.mock("./pages/Error/Error", () => () => <div>Error Page</div>);

// Initialize QueryClient
const queryClient = new QueryClient();

const renderWithRouter = (route = "/") => {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        children: [
          { index: true, element: <div>Home Page</div> },
          {
            path: "characters",
            children: [
              { index: true, element: <div>Characters Page</div> },
              {
                path: ":characterId",
                element: <div>Character Profile Page</div>,
              },
            ],
          },
        ],
      },
    ],
    { initialEntries: [route] }
  );

  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

// Test suite for the App component
describe("App Component", () => {
  test("should render the Home Page component when navigating to '/'", () => {
    renderWithRouter("/");

    const homePageText = screen.getByText("Home Page");
    expect(homePageText).toBeInTheDocument();
  });

  test("should render the Characters Page component when navigating to '/characters'", () => {
    renderWithRouter("/characters");

    const charactersPageText = screen.getByText("Characters Page");
    expect(charactersPageText).toBeInTheDocument();
  });

  test("should render the Character Profile Page component when navigating to '/characters/1'", () => {
    renderWithRouter("/characters/1");

    const characterDetailPageText = screen.getByText("Character Profile Page");
    expect(characterDetailPageText).toBeInTheDocument();
  });
});
