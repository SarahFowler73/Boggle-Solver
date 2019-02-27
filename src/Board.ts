import {Component} from "react";
import { dom } from "./util";

type Props = {
    boardMatrix: string[][]
}

class Board extends Component<Props, {}> {
    render() {
        return dom("table", {}, 
            dom("tbody", {},
            this.props.boardMatrix.map((row: string[], i: number) => 
                dom("tr", {key: i}, 
                    row.map((letter: string, j: number) => 
                        dom("td", {key: j}, letter)
                    )
                )
            )
        ))
    }
}

export default Board;