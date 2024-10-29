import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import CharacterItem from "../../components/CharacterItem/CharacterItem";
import PageContainer from "../../components/UI/PageContainer/PageContainer";
import LoadingIndicator from "../../components/UI/LoadingIndicator/LoadingIndicator";
import ErrorBlock from "../../components/UI/ErrorBlock/ErrorBlock";
import { fetchCharacters } from "../../util/http";
import { Character } from "../../types/types";
import classes from "./Characters.module.css";

// Define Characters page
const CharactersPage: React.FC = () => {
  // Setup for infinite scroll - ref to monitor when the last character item is in view
  const { ref, inView } = useInView();

  // React Query's infinite query setup to handle pagination of characters
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["characters"], // Unique query identifier
      queryFn: fetchCharacters, // Function to fetch character data
      staleTime: 5000, // Cache data for 5 seconds
      initialPageParam: 1, // Start pagination from page 1
      getNextPageParam: (lastPage) => lastPage?.nextPage ?? undefined, // Get next page if available
    });

  // Automatically fetch the next page when the last character item is in view
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // Conditionally renders content based on loading, error, or data availability
  const renderContent = () => {
    if (isLoading) {
      return <LoadingIndicator>Fetching characters...</LoadingIndicator>;
    }

    if (isError) {
      return (
        <ErrorBlock
          title="An error occurred"
          message={error?.message || "Failed to fetch characters"}
        />
      );
    }

    if (data) {
      return (
        <ul className={classes["list"]}>
          {data.pages.map((page) =>
            page.characters.map((character: Character, index: number) => {
              // Attach ref to the last character item to trigger fetchNextPage
              if (page.characters.length === index + 1) {
                return (
                  <CharacterItem
                    innerRef={ref}
                    key={character.id}
                    character={character}
                  />
                );
              }
              return <CharacterItem key={character.id} character={character} />;
            })
          )}
        </ul>
      );
    }

    return null; // Render nothing if no state conditions are met
  };

  return (
    <PageContainer>
      <h2 className={classes["list-title"]}>List of Star Wars characters</h2>
      <div className={classes["list-wrapper"]} data-testid="characters-list">
        {renderContent()}
      </div>
    </PageContainer>
  );
};

export default CharactersPage;
