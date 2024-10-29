import React from "react";
import { render, screen } from "@testing-library/react";
import FilmNode from "./FilmNode";
import { ReactFlowProvider } from "@xyflow/react";
import { dateFormatter } from "../../../util/dateFormatter";

// Mock data for the film
const mockFilmData = {
  id: 1,
  title: "A New Hope",
  episode: 4,
  release_date: "1977-05-25", // Original date format
  director: "George Lucas",
  producer: "Gary Kurtz, George Lucas",
};

// Format the release date using the dateFormatter
const formattedReleaseDate = dateFormatter.format(
  new Date(mockFilmData.release_date)
);

describe("FilmNode Component", () => {
  test("renders film information correctly including title, episode, release date, director, and producer", () => {
    render(
      <ReactFlowProvider>
        <FilmNode data={mockFilmData} />
      </ReactFlowProvider>
    );

    // Check if the film title is rendered
    expect(screen.getByText(/A New Hope/i)).toBeInTheDocument();

    // Check if other film details are rendered
    expect(screen.getByText(/Episode: 4/i)).toBeInTheDocument();

    // Check the formatted release date
    expect(
      screen.getByText(`Release Date: ${formattedReleaseDate}`)
    ).toBeInTheDocument();

    expect(screen.getByText(/Director: George Lucas/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Producer: Gary Kurtz, George Lucas/i)
    ).toBeInTheDocument();
  });
});
