import "./style.css";

type StatusSelectorProps = {
  selected: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
};

const StatusSelector: React.FC<StatusSelectorProps> = ({
  selected,
  options,
  onChange,
}) => {
  return (
    <select
      className="search-selector"
      value={selected}
      onChange={(event) => onChange(event.target.value)}
    >
      {options.map((eachOption) => (
        <option key={eachOption.value} value={eachOption.value}>
          {eachOption.label}
        </option>
      ))}
    </select>
  );
};

export default StatusSelector;