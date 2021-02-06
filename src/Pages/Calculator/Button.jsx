const Button = ({ onClick, btn, className }) => {
  return (
    <div onClick={onClick} className={className}>
      {btn.name}
    </div>
  );
};

export default Button;
