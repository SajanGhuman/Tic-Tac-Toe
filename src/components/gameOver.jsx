import GameState from "./gameState";

const GameOver = ({ gameState }) => {
  switch (gameState) {
    case GameState.inProgress:
      return <></>;

    case GameState.owin:
      return <div className="game-over">O Wins</div>;

    case GameState.xwin:
      return <div className="game-over">X Wins</div>;

    case GameState.draw:
      return <div className="game-over">Draw</div>;

    default:
      return <></>;
  }
};

export default GameOver;
