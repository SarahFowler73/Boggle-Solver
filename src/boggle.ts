import * as r from "ramda";
import { BoggleBoard, Neighbor, Coordinate } from "./types";
import DICTIONARY from "./word_compiler/dictionary.json"

export const getRange = (val: number, boardSize: number): number[] =>
  r.range(
    val > 0 ? val - 1 : val,
    val < boardSize - 1 ? val + 2 : val + 1
  )

export const getNeighborLetters = r.memoizeWith((row, col, board) => `${row}:${col}:${r.flatten(board).join(",")}`, 
  (row: number, col: number, board: BoggleBoard): Neighbor[] => 
    r.unnest(getRange(row, board.length).map(
      (i: number) => {
        return getRange(col, board.length).map(
          (j: number): Neighbor => 
            ({coords: [i, j], letter: board[i][j]})
        )
      }
    )
  )
)

export const findLetterCandidates = (letter: string, board: BoggleBoard): Coordinate[] => 
    r.unnest(r.range(0, board.length).map(
      (i: number) => 
        r.reject(r.isNil, 
          r.range(0, board.length).map(
            (j: number) => 
              board[i][j] === letter 
                ? [i, j] 
                : null
          )
        )
    )) as Coordinate[]

export const findNeighbors = (idx: number, word: string[], prevCoord: Coordinate, usedCoords: Coordinate[], board: BoggleBoard): boolean => {
  // Base Case; made whole word
  if (idx === word.length) {
    return true
  }

  // Base Case: could not find next letter
  const neighbors = r.filter(
    (candidate: Neighbor) => candidate.letter === word[idx] && !r.includes(candidate.coords, usedCoords),
    getNeighborLetters(prevCoord[0], prevCoord[1], board)
  )

  if (neighbors.length === 0) {
    return false
  }

  // Recursive case: have neighbor candidates to check
  return r.any((x) => x, neighbors.map(
    (candidate) => findNeighbors(
      idx + 1, 
      word, 
      candidate.coords, 
      r.append(candidate.coords, usedCoords),
      board
    )
  ))
}

export const startBoard = (word: string[], board: BoggleBoard) => {
  const startingCandidates = findLetterCandidates(word[0], board)
  
  for (let i in startingCandidates) {
    if (findNeighbors(1, word, startingCandidates[i], [startingCandidates[i]], board)) {
      return true
    }
  }
  return false 
}

const filterDictForBoard = (flattenedBoard: string[]) => r.filter(
  (w: string) => r.includes(w[0], flattenedBoard),
  DICTIONARY
)

export const solveBoard = (board: BoggleBoard): string[] => {
  const allPossibleWords = filterDictForBoard(r.flatten<string>(board))
  console.log(allPossibleWords)

  return r.reject(r.isNil, r.uniq(r.map(
    (word: string) => startBoard(word.split(""), board) ? word : null, allPossibleWords
    ))
  ) as string[]
}