import { SET_NAME, PLACE, CLEAR_BOARD } from "./insert";
export function setName(name) {
  return { type: SET_NAME, name };
}
export function place(square) {
  return { type: PLACE, square };
}

export function clearBoard() {
  return { type: CLEAR_BOARD };
}
