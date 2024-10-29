import React from "react";
import { LoaderFunctionArgs, useLoaderData, json } from "react-router-dom";
import { ReactFlowProvider } from "@xyflow/react";
import CharacterGraph from "../../components/Graph/CharacterGraph";
import PageContainer from "../../components/UI/PageContainer/PageContainer";
import { Character, Film, Starship } from "../../types/types";
import { fetchById } from "../../util/http";
import classes from "./CharacterDetail.module.css";

interface CharacterDetailData {
  character: Character;
  films: Film[];
  starships: (Starship[] | [])[];
}

// Define Character Detail page
const CharacterDetailPage: React.FC = () => {
  const data = useLoaderData() as CharacterDetailData;

  return (
    <PageContainer>
      <h3 className={classes["profile-title"]}>
        Information about {data.character.name}
      </h3>
      <ReactFlowProvider>
        <CharacterGraph
          character={data.character}
          films={data.films}
          starships={data.starships}
        />
      </ReactFlowProvider>
    </PageContainer>
  );
};

export default CharacterDetailPage;

export async function characterDetailLoader({ params }: LoaderFunctionArgs) {
  // Retrieve character ID from route parameters
  const characterId = params.characterId;

  // Return a 404 error if the character ID is missing
  if (!characterId) {
    throw json({ status: 404 });
  }

  // Fetch character details by ID
  const characterData: Character = await fetchById("people", characterId);

  // Arrays to store film and starship data
  const filmsData: Film[] = [];
  const starshipsData: Starship[] = [];

  // Function to fetch data for each film in character's film list
  const fetchFilms = async (filmIds: number[]) => {
    for (const filmId of filmIds) {
      const filmData = await fetchById("films", filmId);
      filmsData.push(filmData);
    }
  };

  // Function to fetch data for each starship in character's starship list
  const fetchStarships = async (starshipIds: number[]) => {
    for (const starshipId of starshipIds) {
      const starshipData = await fetchById("starships", starshipId);
      starshipsData.push(starshipData);
    }
  };

  // Fetch films and starships data for the character
  await fetchFilms(characterData.films);
  await fetchStarships(characterData.starships);

  // Map starships to corresponding films
  const starshipsByFilm = filmsData.map((film) => {
    return film.starships
      .map((starshipId: number) =>
        starshipsData.find((starship: Starship) => starship.id === starshipId)
      )
      .filter(Boolean); // Filter out null values
  });

  // Return character data, films, and mapped starships by film
  return {
    character: characterData,
    films: filmsData,
    starships: starshipsByFilm,
  };
}
