import * as r from "ramda";
import { BoggleBoard, Neighbor, Coordinate } from "./types";
import WORD_LIST from "./word_compiler/dictionary.json"

/**
 * Get a range for iterating through an element's neighbors that stays within the board
 */
 export const getNeighborRange = (val: number, boardSize: number): number[] =>
  r.range(
    val > 0 ? val - 1 : val,
    val < boardSize - 1 ? val + 2 : val + 1
  )

/**
 * Memoized function to get all neighbor coordinates and letters of a given
 * coordinate set in a board 
*/
export const getNeighborLetters = r.memoizeWith(
  (row, col, board) => `${row}:${col}:${r.flatten(board).join(",")}`, 
  (row: number, col: number, board: BoggleBoard): Neighbor[] => 
    r.unnest(getNeighborRange(row, board.length).map(
      (i: number) => {
        return getNeighborRange(col, board.length).map(
          (j: number): Neighbor => 
            ({coords: [i, j], letter: board[i][j]})
        )
      }
    )
  )
)

/**
 * Given a first letter and a board, find all coordinates that are 
 * starting candidates for spelling out the word
 */
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

/**
 * Recursive function checking board matrix for the ability to find a given
 * word. Make sure that next letter in word is attached to previous coordinates used
 * and has not already been used to spell the word
 */    
export const findIsWordInBoard = (idx: number, word: string[], prevCoord: Coordinate, usedCoords: Coordinate[], board: BoggleBoard): boolean => {
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
    (candidate) => findIsWordInBoard(
      idx + 1, 
      word, 
      candidate.coords, 
      r.append(candidate.coords, usedCoords),
      board
    )
  ))
}

/**
 * For every potential first letter spelling a word, find if the word can be spelled
 * in the given boggle board
 */
export const startBoard = (word: string[], board: BoggleBoard) => {
  const startingCandidates = findLetterCandidates(word[0], board)
  
  for (let i in startingCandidates) {
    if (findIsWordInBoard(1, word, startingCandidates[i], [startingCandidates[i]], board)) {
      return true
    }
  }
  return false 
}

/**
 * To limit the number of words to check, filter the array of dictionary words
 * to only include those that have starting letters in the boggle board
 */
const filterDictForBoard = (flattenedBoard: string[]) => r.filter(
  (w: string) => r.includes(w[0], flattenedBoard),
  WORD_LIST
)

/**
 * Given a boggle board find all the words that can be made in it
 */
export const solveBoard = (board: BoggleBoard): string[] => {
  const allPossibleWords = filterDictForBoard(r.flatten<string>(board))

  return r.reject(r.isNil, r.uniq(r.map(
    (word: string) => startBoard(word.split(""), board) ? word : null, allPossibleWords
    ))
  ) as string[]
}