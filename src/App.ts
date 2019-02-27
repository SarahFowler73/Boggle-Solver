import { Component } from 'react';
import Board from "./Board"
import { dom } from './util';
import { makeBoggleBoard, startBoard } from './boggle';
import WordInput from './WordInput';
import { fetchWord } from './fetch';
import * as r from "ramda"

class App extends Component {
  state = {
    boggleBoard: [],
    correctWords: []
  }

  checkGuess = (word: string): void => {
    // Check if they've already submitted the word
    if (r.contains(word, this.state.correctWords)) {
      alert("Already guessed word")
      return
    }
    // Find if it is in the matrix
    const inBoard = startBoard(word.split(""), this.state.boggleBoard)
    if (!inBoard) {
      alert("Word not in board");
      return
    }
    // Find if it is a real word
    return fetchWord(word).then(
      (resp:any) => {
        if (resp.ok) {
          this.setState({correctWords: r.append(word, this.state.correctWords)})
        }
        else {
          alert("Word does not exist!")
        }
      }
    )
  }

  render() {
    return dom(
      "div", {style: {margin: "5em", alignText: "center"}},
      dom('div', {style: {display: "flex", justifyContent: "center"}},
        dom("h1", {}, "Let's Play Boggle!")
      ),
      dom("div", {style: {display: "flex", justifyContent: "center"}}, 
        dom("button", {
          onClick: () => this.setState({boggleBoard: makeBoggleBoard(4)}), 
          style: {width: "200px", height: "25px", alignText: "center"}}, "Make New Boggle Board"
        )
      ),
      dom("div", {style: {display: "flex", justifyContent: "center", marginTop: "1em"}},
        dom(Board, {boardMatrix: this.state.boggleBoard}),
      ),
      dom("div", {style: {display: "flex", justifyContent: "center", marginTop: "1em"}},
        this.state.boggleBoard.length ? 
          dom(WordInput, {
            submitGuess: (word: string) => this.checkGuess(word)
          })
          : null
        ),
    dom("div", {style: {display: "flex", justifyContent: "center", marginTop: "1em"}},
        this.state.boggleBoard.length ? 
          dom("ul", {},
            r.map((word: string) => dom("li", {key: word}, word), this.state.correctWords)
           )
          : null
        )

    )
  }
}

export default App;
