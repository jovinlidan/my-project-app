const Button = ({ onMouseDown, onClick, btn, className }) => {
  return (
    <div
      className={className}
      onClick={() => onClick(btn.name)}
      onMouseDown={onMouseDown}
    >
      {btn.name}
    </div>
  );
};

export default Button;
