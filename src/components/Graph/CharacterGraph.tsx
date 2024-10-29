import React, { useCallback, useEffect } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Edge,
  Connection,
  BackgroundVariant,
  useReactFlow,
  Node,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import {
  nodeTypes,
  createCharacterNode,
  createFilmNodes,
  createShipNodes,
  createEdges,
} from "../../util/graphUtils";
import classes from "./CharacterGraph.module.css";
import { Character, Film, Starship } from "../../types/types";

interface CharacterGraphProps {
  character: Character;
  films: Film[];
  starships: (Starship[] | [])[];
}

const CharacterGraph: React.FC<CharacterGraphProps> = ({
  character,
  films,
  starships,
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]); // State for nodes
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]); // State for edges
  const { fitView } = useReactFlow(); // Hook to fit the view of the graph

  // Callback to handle new connections between nodes
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  useEffect(() => {
    // Create nodes based on character and related films and starships
    const characterNode = createCharacterNode(character, films);
    const filmNodes = createFilmNodes(films);
    const shipNodes = createShipNodes(starships);

    // Set nodes in the state
    setNodes([characterNode, ...filmNodes, ...shipNodes]);

    // Create and set edges based on films and starships
    setEdges(createEdges(films, starships));

    // Adjust the view to fit all nodes
    fitView();
  }, [character, films, starships, setNodes, setEdges, fitView]);

  return (
    <div className={classes["graph-container"]}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes} // Custom node types
        onlyRenderVisibleElements // Optimize rendering for visible elements only
        colorMode="dark" // Set the color mode to dark
        fitView // Enable automatic fit to view
        fitViewOptions={{ nodes: [{ id: "hero" }] }} // Options for fitting view
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default CharacterGraph;
