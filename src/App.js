import { Component } from 'react';
import Board from "./Board"
import { dom } from './util';


class App extends Component {
  render() {
    return dom(
      "div", {style: {margin: "5em"}},
      dom('div', {style: {display: "flex", justifyContent: "center"}},
        dom("h1", {}, "Let's Play Boggle!")
      ),
      dom("div", {style: {display: "flex", justifyContent: "center"}},
        dom(Board),
      )
    )
  }
}

export default App;
