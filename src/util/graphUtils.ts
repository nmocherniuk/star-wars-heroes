import CharacterNode from "../components/Nodes/CharacterNode/CharacterNode";
import FilmNode from "../components/Nodes/FilmNode/FilmNode";
import ShipNode from "../components/Nodes/StarshipNode/StarshipNode";

export const nodeTypes = {
  characterNode: CharacterNode,
  filmNode: FilmNode,
  shipNode: ShipNode,
};

export const createCharacterNode = (character: any, films: any[]) => ({
  id: "hero",
  type: "characterNode",
  className: "main-node",
  position: { x: ((films.length - 1) * 280) / 2, y: 0 },
  data: {
    id: character.id,
    name: character.name,
    gender: character.gender,
    birth_year: character.birth_year,
    height: character.height,
    mass: character.mass,
    eye_color: character.eye_color,
    hair_color: character.hair_color,
  },
});

export const createFilmNodes = (films: any) => {
  return films.map((film: any, index: number) => ({
    id: `film-${index}`,
    type: "filmNode",
    className: "film-node",
    position: { x: 280 * index, y: 580 },
    data: {
      id: film.id,
      title: film.title,
      episode: film.episode_id,
      release_date: film.release_date,
      director: film.director,
      producer: film.producer,
    },
  }));
};

export const createShipNodes = (ships: any) => {
  return ships.flatMap((filmShips: any, filmIndex: number) =>
    filmShips.map((ship: any, shipIndex: number) => ({
      id: `ship-${filmIndex}-${shipIndex}`,
      className: "ship-node",
      type: "shipNode",
      position: {
        x: filmIndex * 280,
        y: shipIndex * 380 + 1150,
      },
      data: {
        id: ship.id,
        name: ship.name,
        model: ship.model,
        crew: ship.crew,
        max_atmosphering_speed: ship.max_atmosphering_speed,
        length: ship.length,
      },
    }))
  );
};

export const createEdges = (films: any, ships: any) => {
  const filmEdges = films.map((_: any, index: number) => ({
    id: `e-hero-film-${index}`,
    source: "hero",
    target: `film-${index}`,
  }));

  const shipEdges = ships.flatMap((filmShips: any, filmIndex: number) =>
    filmShips.map((_: any, shipIndex: number) => ({
      id: `e-film-${filmIndex}-ship-${shipIndex}`,
      source: `film-${filmIndex}`,
      target: `ship-${filmIndex}-${shipIndex}`,
    }))
  );

  return [...filmEdges, ...shipEdges];
};
