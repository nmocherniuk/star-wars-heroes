export interface Character {
  id: number;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  films: number[];
  starships: number[];
}

export interface Film {
  id: number;
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: number[];
  starships: number[];
}

export interface Starship {
  crew: string;
  films: number[];
  id: number;
  length: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
}
