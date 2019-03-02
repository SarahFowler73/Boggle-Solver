import {Component} from "react";
import { dom } from "./util";
import { BoggleBoard, Coordinate } from "./types";

type Props = {
    boardMatrix: BoggleBoard,
    setBoard: (coords: Coordinate, letter: string) => void;
}

class Board extends Component<Props, {}> {
    render() {
        return dom("table", {}, 
            dom("tbody", {},
            this.props.boardMatrix.map((row: string[], i: number) => 
                dom("tr", {key: i}, 
                    row.map((letter: string, j: number) => 
                        dom("td", {key: j}, 
                            dom("input", {
                                style: {maxWidth: "1em"},
                                maxLength: 1,
                                value: letter, 
                                onChange: (evt) => {
                                    const l = evt.target.value;
                                    if (l.match(/([a-zA-Z]{0,1})/)) {
                                        this.props.setBoard([i, j], l.toUpperCase())
                                    }
                                }
                            })
                                    
                        )
                    )
                )
            )
        ))
    }
}

export default Board;