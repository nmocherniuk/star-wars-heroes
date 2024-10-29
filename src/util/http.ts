import { json } from "react-router-dom";

export const fetchCharacters = async ({ pageParam }: { pageParam: number }) => {
  const response = await fetch(
    `https://sw-api.starnavi.io/people/?page=${pageParam}`
  );
  if (!response.ok) {
    throw json({ message: `Failed to fetch characters.` }, { status: 404 });
  }
  const data = await response.json();
  return {
    characters: data.results,
    nextPage: data.next ? pageParam + 1 : null,
  };
};

export const fetchById = async (
  resourceType: string,
  resourceId: number | string
) => {
  const url = `https://sw-api.starnavi.io/${resourceType}/${resourceId}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw json(
      { message: `Failed to fetch ${resourceType} with ID: ${resourceId}.` },
      { status: 404 }
    );
  }
  return await response.json();
};
