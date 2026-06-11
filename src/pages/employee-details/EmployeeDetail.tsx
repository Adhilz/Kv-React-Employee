import { useNavigate, useParams } from "react-router";

import Button from "../../components/Button/Button";
import SectionHeader from "../../components/layout/Section/SectionHeader";

import EditIcon from "../../assets/edit-2.png";

import "./style.css";
import DisplayField from "../../components/Employee/DisplayField/DisplayField";
import DocumentView from "../../components/Employee/DocumentView/DocumentView";
import DisplayStatus from "../../components/Employee/DisplayStatus/DisplayStatus";
// import Employees from "../../data/employee.json";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../store/store";
import { useGetEmployeeByIdQuery } from "../../api-service/employees/employees.api";

const EmployeeDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const { data: currentEmployee, isLoading, error } =
  useGetEmployeeByIdQuery(id!);

  const handleEditClick = () => {
    navigate("/employee/create", {
      state: currentEmployee,
    });
  };
  if (isLoading) {
  return <div>Loading employee...</div>;
}

if (error || !currentEmployee) {
  return <div>Employee not found</div>;
}

  return (
    <section className="employee-details-wrapper">
      <SectionHeader
        label={`Employee Details (${id})`}
        extraOptions={
          <Button
            type="button"
            className="action-button edit-button"
            onClick={handleEditClick}
          >
            <div className="center icon-circle">
              <img src={EditIcon} width={20} height={20} />
            </div>
            Edit Details
          </Button>
        }
      />
      <div className="details-wrapper">
        <div className="details-fields">
          <DisplayField label="Employee Name">
            {currentEmployee?.name}
          </DisplayField>
          <DisplayField label="Joining Date">
            12.02.2004
          </DisplayField>
          <DisplayField label="Experience">
            {currentEmployee?.age}
          </DisplayField>
          <DisplayField label="Role">{currentEmployee?.role}</DisplayField>
          <DisplayField label="Status">
            <DisplayStatus status= {currentEmployee?.status} />
          </DisplayField>
        </div>
        <div className="details-fields">
          <DisplayField label="Address">
            {currentEmployee?.addresses[0]?.line},{currentEmployee?.addresses[0].city},{" "}
            {currentEmployee?.addresses[0].country},{" "}
            {currentEmployee?.addresses[0].postal_code}
          </DisplayField>

          <DisplayField label="Employee Document">
            <DocumentView label="View Document" />
          </DisplayField>
          <DisplayField label="Employee ID">
            {currentEmployee?.id}
          </DisplayField>
        </div>
      </div>
    </section>
  );
};

export default EmployeeDetails;