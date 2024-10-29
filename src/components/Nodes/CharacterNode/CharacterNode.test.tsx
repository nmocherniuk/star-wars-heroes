// CharacterNode.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import CharacterNode from "./CharacterNode";
import { ReactFlowProvider } from "@xyflow/react";

// Mock data for the character
const mockCharacterData = {
  id: 1,
  name: "Luke Skywalker",
  gender: "male",
  birth_year: "19BBY",
  height: "172", // in cm
  mass: "77", // in kg
  eye_color: "blue",
  hair_color: "blond",
};

describe("CharacterNode", () => {
  test("renders character information correctly including name, gender, birth year, height, mass, eye color, and hair color", () => {
    render(
      <ReactFlowProvider>
        <CharacterNode data={mockCharacterData} />
      </ReactFlowProvider>
    );

    // Check if the character name is rendered
    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();

    // Check if other character details are rendered
    expect(screen.getByText(/Gender: male/i)).toBeInTheDocument();
    expect(screen.getByText(/Birth Year: 19BBY/i)).toBeInTheDocument();
    expect(screen.getByText(/Height: 172 cm/i)).toBeInTheDocument();
    expect(screen.getByText(/Mass: 77 kg/i)).toBeInTheDocument();
    expect(screen.getByText(/Eye color: blue/i)).toBeInTheDocument();
    expect(screen.getByText(/Hair Color: blond/i)).toBeInTheDocument();
  });
});
