import { useState, useEffect } from "react";
import Board from "./board";
import GameOver from "./gameOver";
import GameState from "./gameState";
import Reset from "./reset";
import gameOverSoundAsset from "../sounds/game_over.wav";
import clickSoundAsset from "../sounds/click.wav";

const gameOverSound = new Audio(gameOverSoundAsset);
gameOverSound.volume = 0.2;

const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 0.5;

const PLAYER_X = "X";
const PLAYER_O = "O";
let HoverClass = true;

const pattern = [
  //rows
  { combo: [0, 1, 2], strikeClass: "strike-row-1" },
  { combo: [3, 4, 5], strikeClass: "strike-row-2" },
  { combo: [6, 7, 8], strikeClass: "strike-row-3" },
  //columns
  { combo: [0, 3, 6], strikeClass: "strike-column-1" },
  { combo: [1, 4, 7], strikeClass: "strike-column-2" },
  { combo: [2, 5, 8], strikeClass: "strike-column-3" },
  //diagonals
  { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
  { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
];

const checkWinner = (tiles, setStrikeClass, setGameState) => {
  for (const { combo, strikeClass } of pattern) {
    const v1 = tiles[combo[0]];
    const v2 = tiles[combo[1]];
    const v3 = tiles[combo[2]];
    if (v1 !== null && v1 === v2 && v1 === v3) {
      setStrikeClass(strikeClass);
      if (v1 === PLAYER_X) {
        setGameState(GameState.xwin);
        HoverClass = false;
      } else if (v1 === PLAYER_O) {
        setGameState(GameState.owin);
        HoverClass = false;
      } else {
        setGameState(GameState.draw);
        HoverClass = false;
      }
      return;
    }
  }

  const filled = tiles.every((tile) => tile !== null);
  if (filled) {
    setGameState(GameState.draw);
  }
};

const TicTacToe = () => {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
  const [strikeClass, setStrikeClass] = useState();
  const [gameState, setGameState] = useState(GameState.inProgress);

  useEffect(() => {
    checkWinner(tiles, setStrikeClass, setGameState);
  }, [tiles]);

  useEffect(() => {
    if (tiles.some((tile) => tile !== null)) {
      clickSound.play();
    }
  }, [tiles]);

  useEffect(() => {
    if (gameState !== GameState.inProgress) gameOverSound.play();
  });

  const handleClick = (index) => {
    if (gameState !== GameState.inProgress || tiles[index] !== null) return;

    const newTiles = [...tiles];
    newTiles[index] = playerTurn;
    setTiles(newTiles);

    playerTurn === PLAYER_X ? setPlayerTurn(PLAYER_O) : setPlayerTurn(PLAYER_X);
  };

  const handleReset = () => {
    HoverClass = true;
    setGameState(GameState.inProgress);
    setTiles(Array(9).fill(null));
    setPlayerTurn(PLAYER_X);
    setStrikeClass(null);
  };

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <Board
        playerTurn={playerTurn}
        tiles={tiles}
        onTileClick={handleClick}
        strikeClass={strikeClass}
        HoverClass={HoverClass}
      />
      <GameOver gameState={gameState} />
      <Reset onReset={handleReset} gameState={gameState} />
    </div>
  );
};

export default TicTacToe;
