import React from "react";
import NodeContainer from "../NodeLayout/NodeLayout";

// Defining the structure of character data using an interface
interface CharacterData {
  id: number; // Unique identifier for the character
  name: string; // Name of the character
  gender: string; // Gender of the character
  birth_year: string; // Birth year of the character
  height: string; // Height of the character in cm
  mass: string; // Mass of the character in kg
  eye_color: string; // Eye color of the character
  hair_color: string; // Hair color of the character
}

// Defining props for the CharacterNode component
interface CharacterNodeProps {
  data: CharacterData;
}

// CharacterNode functional component
const CharacterNode: React.FC<CharacterNodeProps> = ({ data }) => {
  const { id, name, gender, birth_year, height, mass, eye_color, hair_color } =
    data;

  return (
    <NodeContainer id={id} title={name} imageType="characters" hasBottomHandler>
      <p>Gender: {gender}</p>
      <p>Birth Year: {birth_year}</p>
      <p>Height: {height} cm</p>
      <p>Mass: {mass} kg</p>
      <p>Eye color: {eye_color}</p>
      <p>Hair Color: {hair_color}</p>
    </NodeContainer>
  );
};

export default CharacterNode;
