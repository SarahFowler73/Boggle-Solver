import {Component} from "react";
import { dom } from "./util";

type Props = {
    boardMatrix: string[][]
}

class Board extends Component<Props, {}> {
    render() {
        return dom("table", {}, 
            dom("tbody", {},
            this.props.boardMatrix.map((row: string[]) => 
                dom("tr", {}, 
                    row.map((letter: string) => 
                        dom("td", {}, letter)
                    )
                )
            )
        ))
    }
}

export default Board;