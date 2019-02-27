import { Component } from 'react';
import Board from "./Board"
import { dom } from './util';
import { makeBoggleBoard } from './boggle';

class App extends Component {
  state = {
    boggleBoard: [],
    guessedWord: null,
    correctWords: []
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
      )
    )
  }
}

export default App;
