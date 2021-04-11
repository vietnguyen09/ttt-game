import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
import 'normalize.css/normalize.css';
import './styles/styles.scss';



const MyComponent = () => {
    const [board, setBoard] =  useState(Array(9).fill(""));
    const [playerTurn, setPlayerTurn] = useState("x");
    const [markedPosition, setMarkedPosition] = useState([]);
    const [isEnd, setIsEnd] = useState(false);
    //console.log(playerTurn);
    const squareClicked = (e) => {
        const index = parseInt(e.target.id);
        const isNotValid = markedPosition.some((mark) => mark == index);

        if (!isNotValid && !isEnd) {
            let newBoard = [
                ...board
            ];
            newBoard[index] = playerTurn;
            setBoard(newBoard);
            setPlayerTurn(
                (playerTurn === 'x') ? 'o' : 'x'
            );
            setMarkedPosition([
                ...markedPosition,
                index
            ]);
        }
    };

    const restartHandler = () => {
        setBoard(Array(9).fill(""));
        setPlayerTurn("x");
        setMarkedPosition([]);
        setIsEnd(false);
    }
    

    useEffect(() => {
        if (isEnd)
            return;

        const winPath = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        let gameStatus = {
            winner: undefined,
            draw: undefined
        };
        winPath.filter((arr) => {
            const v1 = arr[0];
            const v2 = arr[1];
            const v3 = arr[2];

            if ( 
                board[v1] !== "" &&
                board[v1] === board[v2] &&
                board[v1] === board[v3]
            ) {
                gameStatus.winner = (playerTurn === 'x') ? 'o' : 'x';
                return;
            }
        })

        if (gameStatus.winner !== undefined) {
            alert(`The winner is ${gameStatus.winner}!!!`);
            setIsEnd(true);
        } else if (markedPosition.length >= board.length) {
            alert(`The game is draw!`);
            setIsEnd(true);
        }
    });

    return (
        <div>
            <Board
                board={board}
                isEnd={isEnd}
                restartHandler={restartHandler}
                squareClicked={squareClicked}
            />
        </div>
    );
}

ReactDOM.render(<MyComponent />, document.getElementById('app'));
