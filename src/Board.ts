import {Component} from "react";
import { dom } from "./util";
import { makeBoggleBoard } from "./boggle";

class Board extends Component<{}, {}> {
    render() {
        const boardMatrix = makeBoggleBoard(4)
        return dom("table", {}, 
            boardMatrix.map((row: string[]) => 
                dom("tr", {}, 
                    row.map((letter: string) => 
                        dom("td", {}, letter)
                    )
                )
            )
        )
    }
}

export default Board;