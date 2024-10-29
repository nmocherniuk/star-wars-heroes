import React from "react";
import { dateFormatter } from "../../../util/dateFormatter";
import NodeContainer from "../NodeLayout/NodeLayout";

// Defining the structure of film data using an interface
interface FilmData {
  id: number; // Unique identifier for the film
  title: string; // Title of the film
  episode: number; // Episode number of the film
  release_date: string; // Release date of the film in string format
  director: string; // Director of the film
  producer: string; // Producer of the film
}

// Defining props for the FilmNode component
interface FilmNodeProps {
  data: FilmData; // Film data to be displayed
}

// FilmNode functional component
const FilmNode: React.FC<FilmNodeProps> = ({ data }) => {
  const { id, title, episode, release_date, director, producer } = data;

  return (
    <NodeContainer
      id={id}
      title={title}
      imageType="films"
      hasTopHandler
      hasBottomHandler
    >
      <p>Episode: {episode}</p>
      <p>Release Date: {dateFormatter.format(new Date(release_date))}</p>{" "}
      <p>Director: {director}</p>
      <p>Producer: {producer}</p>
    </NodeContainer>
  );
};

export default FilmNode;
