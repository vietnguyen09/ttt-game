import React from 'react';

export default (props) => (
    <div>
        <div className="board">
            {props.board.map((square, index) => 
                <div 
                    key={index} 
                    className="square"
                    onClick={props.squareClicked}
                    id={index}
                >{square}</div>
            )}
        </div>
        <div>
            {props.isEnd && 
                <button onClick={props.restartHandler}>
                    Restart game
                </button> 
            }
        </div>
    </div>
);