type ButtonProps = {
  text: string;
  type?: "button" | "submit" | "reset";
};

function Button({
  text,
  type = "button",
}: ButtonProps) {
  return (
    <button type={type}>
      {text}
    </button>
  );
}

export default Button;