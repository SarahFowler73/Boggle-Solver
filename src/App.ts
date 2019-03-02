import { Component } from 'react';
import Board from "./Board"
import { dom } from './util';
import { solveBoard } from './boggle';
import * as r from "ramda"
import { Coordinate, BoggleBoard } from './types';

type State = {
  boggleBoard: BoggleBoard;
  words: string[]
}

class App extends Component<{}, State> {
  state: State = {
    boggleBoard: r.range(0, 4).map((i: number) =>
      r.range(0, 4).map((j: number) => "")),
    words: []
  }

  render() {
    return dom(
      "div", {style: {margin: "5em", alignText: "center"}},
      dom('div', {style: {display: "flex", justifyContent: "center"}},
        dom("h1", {}, "Let's Solve Boggle!")
      ),
      dom("div", {style: {display: "flex", justifyContent: "center", marginTop: "1em"}},
        dom(Board, {
          boardMatrix: this.state.boggleBoard, 
          setBoard: ([i, j]: Coordinate, letter: string) => 
            this.setState({
              boggleBoard: [
                ...r.slice(0, i, this.state.boggleBoard),
                r.update(j, letter, this.state.boggleBoard[i]),
                ...r.slice(i+1, Infinity, this.state.boggleBoard)
              ]
            }) 
        }),
      ),
      dom("div", {style: {display: "flex", justifyContent: "center", marginTop: "1em"}},
        dom("button", {onClick: () => {
          if (r.any((l: string) => l === "", r.flatten<string>(this.state.boggleBoard))) {
              alert("Board incomplete")
          }
          else {
              this.setState({
                words: solveBoard(this.state.boggleBoard)
              })
          }
      }}, "Submit Board")
        ),
    dom("div", {style: {display: "flex", justifyContent: "center", marginTop: "1em"}},
      dom("ul", {},
        r.map((word: string) => dom("li", {key: word}, word), this.state.words)
        )
      )

    )
  }
}

export default App;
