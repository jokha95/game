import React from "react";
import { connect } from "react-redux";
import { place, clearBoard } from "../redux-app/result";

// import { Spring } from "react-spring";

function compose(fn, ...fns) {
  if (!fns.length) return fn;
  return (...args) => fn(compose(...fns)(...args));
}

function Piece({ x, y, children, place }) {
  return (
    <g
      transform={`translate(${x * 100 + 50}, ${y * 100 + 50})`}
      style={{ cursor: "pointer" }}
    >
      <rect
        x="-40"
        y="-40"
        width="80"
        height="80"
        fill="transparent"
        onClick={place}
      />
      {children}
    </g>
  );
}
// o
function Cross(props) {
  return (
    // <Spring from={{ opacity: 0, marginTop: -1000 }} to={{ opacity: 1, marginTop: 0 }}>

    <Piece {...props}>
      <path
        d="M -30 -30 l 60 60 M 30 -30 l -60 60"
        stroke="red"
        fill="none"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </Piece>
  );
}
function Naught(props) {
  return (
    <Piece {...props}>
      <circle cx="0" cy="0" r="30" fill="none" strokeWidth="10" stroke="blue" />
    </Piece>
  );
}

const mapStateToProps = ({ grid, gameOver, gameWin }) => ({
  grid,
  gameOver,
  gameWin,
});

const mapDispatchToProps = (dispatch) => ({
  place: compose(dispatch, place),
  clearBoard: compose(dispatch, clearBoard),
});
function GameWinLine({ start, end }) {
  const [startX, startY] = [start % 3, Math.floor(start / 3)];
  const [endX, endY] = [end % 3, Math.floor(end / 3)];

  let startCoord = `${startX * 100 + 50} ${startY * 100 + 50}`;
  let endCoord = `${(end % 3) * 100 + 50} ${Math.floor(end / 3) * 100 + 50}`;
  if (startY === endY) {
    const x = startX * 100 + 50;
    startCoord = `${x} 20`;
    endCoord = `${x} 280`;
  } else if (startY === endY) {
    const y = startY * 100 + 50;
    startCoord = `20 ${y}`;
    endCoord = `280 ${y}`;
  } else if (startX < endX) {
    startCoord = "20 20";
    endCoord = "280 280";
  } else {
    startCoord = "20 280";
    endCoord = "280 20";
  }
  return (
    <path
      d={`M ${startCoord} L ${endCoord}`}
      fill="none"
      stroke="grey"
      strokeWidth="15"
      strokeLinecap="round"
    />
  );
}
function Game({ grid, place, clearBoard, gameWin }) {
  const pieces = [...grid].map((letter, i) => {
    const coords = {
      x: i % 3,
      y: Math.floor(i / 3),
      place: () => place(i),
    };
    switch (letter) {
      case "X":
        return <Cross {...coords} />;
      case "O":
        return <Naught {...coords} />;
      default:
        return <Piece {...coords} />;
    }
  });
  return (
    <div>
      <svg viewBox="0 0 300 300">
        <path
          d="M 100 10 l 0 280 m 100 0 l 0 -280 M 10 100 l 280 0 m 0 100 l -280 0"
          stroke="black"
          fill="none"
          strokeWidth="5"
          strokeLinecap="ROUND"
        />
        {pieces}
        {gameWin && <GameWinLine start={gameWin[0]} end={gameWin[2]} />}
      </svg>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="red-button"
          style={{
            border: "none",
            background: "black",
            color: "white",
            fontSize: "1em",
            padding: ".5em 1em",
            borderRadius: ".5em",
          }}
          onClick={clearBoard}
        >
          Clear Board
        </button>
      </div>
    </div>
    // </Spring>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Game);
