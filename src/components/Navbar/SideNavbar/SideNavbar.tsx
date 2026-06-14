import SideNavbarItem from "../SideNavbarItem/SideNavbarItem";
import "./style.css";

import EmployeeListIcon from "../../../assets/navbar-employee-icon.svg";
import { useNavigate } from "react-router";

const SideNavbar = () => {
  const navigate=useNavigate();
  return (
    <aside className="navbar-container">
      {/* <div className="navbar-item">
        <div className="navbar-icon-container center">
          <img src="./assets/navbar-employee-icon.svg" width="20" height="20" />
        </div>
        <span>Employee list</span>
      </div> */}
      <SideNavbarItem label="Employee list" iconUrl={EmployeeListIcon} onClick={()=> navigate('/employee')} />
    </aside>
  );
};

export default SideNavbar;