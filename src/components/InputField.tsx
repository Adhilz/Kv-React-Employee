import "../styles/login.css";

type InputFieldProps = {
  type: string;
  id: string;
  name: string;
  placeholder: string;
  label?: string;
  style?: React.CSSProperties;
};

function InputField({
  type,
  id,
  name,
  placeholder,
  label,
  style 
}: InputFieldProps) {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}

      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        style={style}
      />
    </>
  );
}

export default InputField;