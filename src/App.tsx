import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/Home/Home";
import CharactersPage from "./pages/Characters/Characters";
import CharacterDetailPage, {
  characterDetailLoader,
} from "./pages/CharacterDetail/CharacterDetail";
import RootLayout from "./pages/Root/Root";
import ErrorPage from "./pages/Error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // Root layout wrapper for the main structure
    errorElement: <ErrorPage />, // Error fallback for unmatched routes or load failures
    id: "root",
    children: [
      { index: true, element: <HomePage /> }, // Main home page route at root level
      {
        path: "characters",
        children: [
          {
            index: true,
            element: <CharactersPage />, // Route for listing all characters
          },
          {
            path: ":characterId",
            element: <CharacterDetailPage />, // Route for individual character detail
            loader: characterDetailLoader, // Data loader for character details based on ID
          },
        ],
      },
    ],
  },
]);

// Initialize React Query's client for managing and caching server state
const queryClient = new QueryClient();

function App() {
  return (
    // Provide QueryClient context for the entire app to handle data fetching
    <QueryClientProvider client={queryClient}>
      {/* Set up React Router provider to handle route navigation */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
