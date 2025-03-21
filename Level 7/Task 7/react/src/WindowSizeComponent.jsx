import React from "react";
import useWindowResize from "./useWindowResize";

function WindowSizeComponent() {
  const { width, height } = useWindowResize();

  return (
    <div style={{ textAlign: "center", padding: "20px", fontSize: "18px" }}>
      <p>Window Width: {width}px</p>
      <p>Window Height: {height}px</p>
    </div>
  );
}

export default WindowSizeComponent;
