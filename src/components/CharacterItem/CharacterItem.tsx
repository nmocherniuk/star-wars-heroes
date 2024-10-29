import React from "react";
import { Link } from "react-router-dom";
import classes from "./CharacterItem.module.css";

// Define the structure of a Character object
interface Character {
  id: number; // Unique identifier for the character
  name: string; // Name of the character
}

// Define props for the CharacterItem component
interface CharacterItemProps {
  character: Character; // Character data to display
  innerRef?: React.Ref<HTMLLIElement>; // Optional ref for the list item
}

// Functional component to display a character item
const CharacterItem: React.FC<CharacterItemProps> = ({
  character,
  innerRef,
}) => {
  return (
    <li className={classes["list-item"]} ref={innerRef}>
      <Link
        className={classes["character-link"]}
        to={`/characters/${character.id}`}
      >
        {character.name}
      </Link>
    </li>
  );
};

export default CharacterItem;
