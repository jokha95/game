import { reducer, initialState } from "./index";
import { clearBoard } from "./result";

describe("reducer", () => {
  const afterTwo = ["Abcd", "Efgh"].map(setName).reduce(reducer, initialState);

  
    it("sets second name and starts game if one present", () => {
      const result = ["Abcd", "Efgh"]
        .map(setName)
        .reduce(reducer, initialState);
      expect(result.names).toEqual(["Abcd", "Efgh"]);
      expect(result.wins).toEqual([0, 0]);
      expect(result.currentPlayerIndex).toBe(0);
      expect(result.grid).toBe("         ");
      expect(result.gameOver).toBeFalsy();
      expect(result.gameWin).toBeUndefined();
      expect(result.lastStartIndex).toBe(0);
    });
   
  });
  describe("place(square)", () => {
    it("places an X on a spot if the currentPlayerIndex is 0", () => {
      const firstMark = reducer(afterTwo, place(0));
      expect(firstMark.currentPlayerIndex).toBe(1);
      expect(firstMark.grid).toBe("X        ");
    });
    it("places an O on a spot if the currentPlayerIndex is 1", () => {
      const firstMark = reducer(afterTwo, place(0));
      const secondMark = reducer(firstMark, place(3));
      expect(secondMark.currentPlayerIndex).toBe(0);
      expect(secondMark.grid).toBe("X  O     ");
    });
    it("ignores a taken square", () => {
      const firstMark = reducer(afterTwo, place(0));
      const after = reducer(firstMark, place(0));
      expect(firstMark).toEqual(after);
    });
    it("recognizes a row win", () => {
      const moves = [0, 3, 1, 4, 2];
      const rowWin = moves.map(place).reduce(reducer, afterTwo);
      expect(rowWin.grid).toBe("XXXOO    ");
      expect(rowWin.wins).toEqual([1, 0]);
      expect(rowWin.gameOver).toBeTruthy();
      expect(rowWin.gameWin).toEqual([0, 1, 2]);
    });
    it("recognizes a column win", () => {
      const moves = [0, 1, 2, 4, 3, 7];
      const colWin = moves.map(place).reduce(reducer, afterTwo);
      expect(colWin.grid).toBe("XOXXO  O ");
      expect(colWin.wins).toEqual([0, 1]);
      expect(colWin.gameOver).toBeTruthy();
      expect(colWin.gameWin).toEqual([1, 4, 7]);
    });
    it("recognizes a diagonal win", () => {
      const moves = [0, 1, 4, 2, 8];
      const diagWin = moves.map(place).reduce(reducer, afterTwo);
      expect(diagWin.grid).toBe("XOO X   X");
      expect(diagWin.wins).toEqual([1, 0]);
      expect(diagWin.gameOver).toBeTruthy();
      expect(diagWin.gameWin).toEqual([0, 4, 8]);
    });
    it("ignores an already completed board", () => {
      const moves = [0, 3, 1, 4, 2];
      const rowWin = moves.map(place).reduce(reducer, afterTwo);
      const after = reducer(rowWin, place(5));
      expect(after).toEqual(rowWin);
    });
  });
  describe("clearBoard()", () => {
    it("ignores a game without two players", () => {
      const withNoPlayers = reducer(initialState, clearBoard());
      expect(withNoPlayers).toEqual(initialState);
      const withOnePlayer = reducer(initialState, setName("Abcd"));
      expect(reducer(withOnePlayer, clearBoard())).toEqual(withOnePlayer);
    });
    it("clears a completed board, switching the lastStartIndex", () => {
      const moves = [0, 3, 1, 4, 2];
      const afterMoves = moves.map(place).reduce(reducer, afterTwo);
      const cleared = reducer(afterMoves, clearBoard());
      expect(cleared.wins).toEqual(afterMoves.wins);
      expect(cleared.names).toEqual(afterMoves.names);
      expect(cleared.grid).toBe("         ");
      expect(cleared.gameOver).toBeFalsy();
      expect(cleared.lastStartIndex).toBe(1);
      expect(cleared.currentPlayerIndex).toBe(1);
      expect(cleared.gameWin).toBeUndefined();
      const nextWin = moves.map(place).reduce(reducer, cleared);
      const clearAfterNextWin = reducer(nextWin, clearBoard());
      expect(clearAfterNextWin.lastStartIndex).toBe(0);
      expect(clearAfterNextWin.currentPlayerIndex).toBe(0);
    });
    it("clears an incomplete board", () => {
      const moves = [0, 1];
      const afterMoves = moves.map(place).reduce(reducer, afterTwo);
      const afterClear = reducer(afterMoves, clearBoard());
      expect(afterClear).toEqual({
        ...afterMoves,
        grid: "         ",
        currentPlayerIndex: 1,
        lastStartIndex: 1,
      });
    });
  });
});
