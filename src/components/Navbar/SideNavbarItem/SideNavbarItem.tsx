type SideNavbarItemProps = {
  label: string;
  iconUrl?: string;
  iconSize?: number;
  onClick?:React.MouseEventHandler<HTMLDivElement>;
};

const SideNavbarItem: React.FC<SideNavbarItemProps> = ({
  label,
  iconUrl,
  iconSize = 20,
  onClick,
}) => {
  return (
    <div className="navbar-item" onClick={onClick}>
      {iconUrl && (
        <div className="navbar-icon-container center">
          <img src={iconUrl} width={iconSize} height={iconSize} />
        </div>
      )}
      <span>{label}</span>
    </div>
  );
};

export default SideNavbarItem;