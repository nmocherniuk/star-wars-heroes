import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import StarshipNode from "./StarshipNode";
import { render, screen } from "@testing-library/react";

const mockStarshipData = {
  id: 1,
  name: "X-wing Starfighter",
  model: "T-65 X-wing starfighter",
  crew: "1",
  max_atmosphering_speed: "1,050",
  length: "12.5",
};

describe("StarshipNode Component", () => {
  test("should render starship model correctly", () => {
    render(
      <ReactFlowProvider>
        <StarshipNode data={mockStarshipData} />
      </ReactFlowProvider>
    );

    expect(
      screen.getByText(/Model: T-65 X-wing starfighter/i)
    ).toBeInTheDocument();
  });

  test("should render starship crew information correctly", () => {
    render(
      <ReactFlowProvider>
        <StarshipNode data={mockStarshipData} />
      </ReactFlowProvider>
    );

    expect(screen.getByText(/Crew: 1/i)).toBeInTheDocument();
  });

  test("should render starship maximum atmosphering speed correctly", () => {
    render(
      <ReactFlowProvider>
        <StarshipNode data={mockStarshipData} />
      </ReactFlowProvider>
    );

    expect(
      screen.getByText(/Max Atmosphering Speed: 1,050/i)
    ).toBeInTheDocument();
  });

  test("should render starship length correctly", () => {
    render(
      <ReactFlowProvider>
        <StarshipNode data={mockStarshipData} />
      </ReactFlowProvider>
    );

    expect(screen.getByText(/Length: 12.5/i)).toBeInTheDocument();
  });
});
