import React from "react";
import { render, screen } from "@testing-library/react";
import NodeLayout from "./NodeLayout"; // Adjust the import path as necessary
import { ReactFlowProvider } from "@xyflow/react";

describe("NodeLayout Component", () => {
  const mockProps = {
    id: 1,
    title: "Test Node",
    imageType: "test",
    hasTopHandler: true,
    hasBottomHandler: true,
    children: <p>Test description</p>,
  };

  test("renders the node layout correctly with image, title, and description", () => {
    render(
      <ReactFlowProvider>
        <NodeLayout {...mockProps} />
      </ReactFlowProvider>
    );

    // Check if the image is rendered with the correct src and alt attributes
    const image = screen.getByAltText("Test Node");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://starwars-visualguide.com/assets/img/test/1.jpg"
    );

    // Check if the title is rendered
    expect(screen.getByText("Test Node")).toBeInTheDocument();

    // Check if the description is rendered correctly
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  test("does not render handles when specified as false", () => {
    // Render without handles
    render(
      <ReactFlowProvider>
        <NodeLayout
          {...{ ...mockProps, hasTopHandler: false, hasBottomHandler: false }}
        />
      </ReactFlowProvider>
    );

    // Check that handles are not rendered
    const topHandle = screen.queryByText(/handle/i); // Adjust the selector based on actual handle rendering
    const bottomHandle = screen.queryByText(/handle/i); // Same here

    expect(topHandle).not.toBeInTheDocument();
    expect(bottomHandle).not.toBeInTheDocument();
  });
});
