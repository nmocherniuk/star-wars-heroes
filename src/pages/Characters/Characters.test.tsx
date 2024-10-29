import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CharactersPage from "./Characters"; // Adjust the import path if necessary
import { MemoryRouter } from "react-router-dom";
import { fetchCharacters } from "../../util/http";

// Clear all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

// Mock the fetchCharacters function
jest.mock("../../util/http", () => ({
  fetchCharacters: jest.fn(),
}));

const clientQuery = new QueryClient();

const renderWithRouter = async (route = "/characters") => {
  return render(
    <QueryClientProvider client={clientQuery}>
      <MemoryRouter initialEntries={[route]}>
        <CharactersPage />
      </MemoryRouter>
    </QueryClientProvider>
  );
};

const mockData = [
  {
    pageParams: [1],
    pages: [
      {
        characters: [
          { id: 10, name: "Obi-Wan Kenobi" },
          { id: 12, name: "Wilhuff Tarkin" },
          { id: 13, name: "Chewbacca" },
          { id: 14, name: "Han Solo" },
        ],
        nextPage: 2,
      },
    ],
  },
];

describe("CharactersPage Component", () => {
  it("should render the list title correctly", async () => {
    (fetchCharacters as jest.Mock).mockResolvedValue(mockData);
    await renderWithRouter(); // Await the rendering

    await waitFor(() =>
      expect(
        screen.getByText(/List of Star Wars characters/i)
      ).toBeInTheDocument()
    );
  });
});
