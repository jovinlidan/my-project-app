const Button = ({ onClick, btn, className, value }) => {
  return (
    <div onClick={onClick} className={className}>
      {btn ? btn.name : value}
    </div>
  );
};

export default Button;
