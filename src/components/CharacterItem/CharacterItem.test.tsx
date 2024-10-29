import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Importing MemoryRouter for testing routing
import CharacterItem from "./CharacterItem";

describe("CharacterItem", () => {
  const character = { id: 1, name: "Luke Skywalker" };

  it("renders character name and link correctly", () => {
    render(
      <MemoryRouter>
        <CharacterItem character={character} />
      </MemoryRouter>
    );

    // Check that the character name is rendered
    const characterLink = screen.getByText(character.name);
    expect(characterLink).toBeInTheDocument();

    // Check that the link points to the correct path
    expect(characterLink.closest("a")).toHaveAttribute("href", "/characters/1");
  });

  it("applies the correct ref to the list item", () => {
    const ref = React.createRef<HTMLLIElement>();

    render(
      <MemoryRouter>
        <CharacterItem character={character} innerRef={ref} />
      </MemoryRouter>
    );

    // Check that the ref is applied to the <li> element
    expect(ref.current).toBeDefined();
    expect(ref.current).toBeInstanceOf(HTMLLIElement);
  });
});
