import {Component} from "react";
import { dom } from "./util";

type Props = {
    submitGuess: (word: string) => void;
}

type State = {
    word: string;
}

class WordInput extends Component<Props, State> {
    state: State = {
        word: ""
    }

    render() {
        return dom("div", {}, 
            dom("input", {
                onChange: (evt) => this.setState({word: evt.target.value}),
                value: this.state.word
            }),
            dom("button", {onClick: () => {
                if (this.state.word.length >= 3) {
                    this.setState({word: ""})
                    this.props.submitGuess(this.state.word)
                }
                else {
                    console.log("Should be longer than 2 letters")
                }
            }}, "Submit Guess")
        )
    }
}

export default WordInput;