
const Tile = ({ className, value, onClick, playerTurn,HoverClass }) => {
  let hoverClass = null;
  if (value === null && playerTurn !== null) {
    hoverClass = `${playerTurn.toLowerCase()}-hover`;
  }
  return (
    <div onClick={onClick} className={`tile ${className} ${HoverClass && hoverClass}`}>
      {value}
    </div>
  );
};
export default Tile;
