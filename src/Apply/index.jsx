import React from "react";
import Play from "./Play";

export default function AppPresenter({ names }) {
  return (
    <div>
      <h1>Lets play X/O</h1>
      {names.length < 2 ? <play /> : <Play />}
    </div>
  );
}
