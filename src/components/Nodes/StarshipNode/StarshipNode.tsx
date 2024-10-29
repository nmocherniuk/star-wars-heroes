import React from "react";
import NodeContainer from "../NodeLayout/NodeLayout";

// Define the structure of Ship data
interface ShipData {
  id: number; // Unique identifier for the starship
  name: string; // Name of the starship
  model: string; // Model of the starship
  crew: string; // Number of crew members
  max_atmosphering_speed: string; // Maximum speed in the atmosphere
  length: string; // Length of the starship
}

// Define props for the ShipNode component
interface ShipNodeProps {
  data: ShipData; // Starship data to display
}

// Functional component to display a starship node
const StarshipNode: React.FC<ShipNodeProps> = ({ data }) => {
  const { id, name, model, crew, max_atmosphering_speed, length } = data;

  return (
    <NodeContainer id={id} title={name} imageType="starships" hasTopHandler>
      <p>Model: {model}</p>
      <p>Crew: {crew}</p>
      <p>Max Atmosphering Speed: {max_atmosphering_speed}</p>
      <p>Length: {length}</p>
    </NodeContainer>
  );
};

export default StarshipNode;
