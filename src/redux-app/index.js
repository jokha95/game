import { createReducer } from "redux-create-reducer";
import { SET_NAME, PLACE, CLEAR_BOARD } from "./insert";
import produce from "immer";

export const initialState = {
  names: [],
};

function setNameReducer(state, { name }) {
  const { names } = state;
  if (names.length === 0) return { ...state, names: [name] };
  if (names.length === 1)
    return {
      ...state,
      names: [...names, name],
      wins: [0, 0],
      currentPlayerIndex: 0,
      grid: "         ",
      lastStartIndex: 0,
    };
  return state;
}
function replaceChar(str, char, idx) {
  return str.substr(0, idx) + char + str.substr(idx + 1);
}
function checkForWin(grid) {
  const sets = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return sets.find((set) => {
    const [a, b, c] = set.map((x) => grid[x]);
    return a !== " " && a === b && a === c;
  });
}
function placeReducer(state, { square }) {
  const { grid, currentPlayerIndex, wins, gameOver } = state;
  if (gameOver || grid[square] !== " ") {
    return state;
  }
  const [mark, nextIndex] = currentPlayerIndex === 0 ? ["X", 1] : ["O", 0];
  const newGrid = replaceChar(grid, mark, square);
  const gameWin = checkForWin(newGrid);
  if (gameWin) {
    return {
      ...state,
      grid: newGrid,
      wins: produce(wins, (draft) => {
        draft[currentPlayerIndex]++;
      }),
      gameOver: true,
      gameWin,
    };
  }
  return {
    ...state,
    currentPlayerIndex: nextIndex,
    grid: newGrid,
  };
}
function clearBoardReducer(state) {
  if (state.names.length < 2) return state;
  const { gameOver, lastStartIndex, gameWin, ...stateWithoutGameOver } = state;
  const nextStartIndex = lastStartIndex === 0 ? 1 : 0;
  return {
    ...stateWithoutGameOver,
    grid: "         ",
    lastStartIndex: nextStartIndex,
    currentPlayerIndex: nextStartIndex,
  };
}
export const reducer = createReducer(initialState, {
  [SET_NAME]: setNameReducer,
  [PLACE]: placeReducer,
  [CLEAR_BOARD]: clearBoardReducer,
});
