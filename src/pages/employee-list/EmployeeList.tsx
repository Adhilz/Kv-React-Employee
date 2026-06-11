import { useNavigate, useSearchParams } from "react-router";

import Button from "../../components/Button/Button";
import SectionHeader from "../../components/layout/Section/SectionHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/Table/Table";

import DeleteIcon from "../../assets/delete-icon.svg";
import EditIcon from "../../assets/edit-icon.svg";

import StatusSelector from "../../components/Employee/Search-Filters/StatusSelect";
import PlusIcon from "../../assets/plus-icon.svg";

import "./style.css";
// import DisplayStatus from "../../components/Employee/DisplayStatus/DisplayStatus";

import type { Employee } from "../../components/Types/employee";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "../../components/Dialog/Dialog";
import { useDialog } from "../../hooks/useDialog";
// import { useAppSelector } from "../../store/store";
import { useDeleteEmployeeMutation, useGetEmployeesQuery } from "../../api-service/employees/employees.api";
import { useState } from "react";
import DisplayStatus from "../../components/Employee/DisplayStatus/DisplayStatus";

const StatusOptions = [
  { label: "Status", value: "" },
  { label: "Active", value: "active" },
];
const EmployeeList = () => {
  const {
    showDialog,
    hideDialog,
    isOpen,
    containerRef: confirmDialogContaierRef,
  } = useDialog();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const { data: employees = [], error } = useGetEmployeesQuery();
  const [deleteEmployee] = useDeleteEmployeeMutation();

  const handleEmployeeCreteClick = () => {
    navigate("/employee/create");
  };

  const handleRowClick = (id: string) => {
    navigate(`/employee/${id}/details`);
  };

  const handleEditClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    employee: Employee,
  ) => {
    event.stopPropagation();
    navigate("/employee/create", {
      state: employee,
    });
  };

  const handleDeleteClick = (
  event: React.MouseEvent<HTMLButtonElement>,
  employee: Employee,
) => {
  event.stopPropagation();

  setSelectedEmployeeId(Number.parseInt(employee.id));
  showDialog();
};
  const handleConfirmDelete = async () => {
  if (!selectedEmployeeId) return;

  try {
    await deleteEmployee(selectedEmployeeId).unwrap();

    hideDialog();
    setSelectedEmployeeId(null);
  } catch (error) {
    console.error("Failed to delete employee", error);
  }
};
if (error) {
  return <div>Failed to load employees</div>;
}

  console.log(searchParams.get("name"), searchParams.get("role"));
  return (
    <section className="employee-list-wrapper">
      <SectionHeader
        label="Employee List"
        extraOptions={
          <div className="filter-options">
            <span>Filter by</span>
            <StatusSelector selected="status" options={StatusOptions} />
            <Button
              className=" action-button create-button"
              onClick={handleEmployeeCreteClick}
            >
              <div className="center icon-circle">
                <img src={PlusIcon} width={20} height={20} />
              </div>
              Create Employee
            </Button>
          </div>
        }
      />

      <Table>
        <TableHeader>
          <TableHead>Employee ID</TableHead>
          <TableHead>Employee Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Experience</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
          
        </TableHeader>
        <TableBody>
          {employees.map((eachEmp) => (
            <TableRow key={eachEmp.id} onClick={() => handleRowClick(eachEmp.id.toString())}>
              <TableCell>{eachEmp.id}</TableCell>
              <TableCell>{eachEmp.name}</TableCell>
              <TableCell>{eachEmp.email}</TableCell>
              <TableCell>{eachEmp.age ?? "-"}</TableCell>
              <TableCell>{eachEmp.role}</TableCell>
              <TableCell><DisplayStatus status={eachEmp.status}/></TableCell>

              {/* <TableCell>{eachEmp.departments.length > 0 ?
              eachEmp.departments.map((d) => d.name).join(","):"-"}</TableCell> */}
                {/* <DisplayStatus status={eachEmp.status} /> */}
              {/* <TableCell>{eachEmp.experience}</TableCell> */}
              <TableCell>
                <div className="action-group">
                  <Button
                    type="button"
                    className="action-button icon-button"
                    onClick={(event) => handleDeleteClick(event, eachEmp)}
                  >
                    <img src={DeleteIcon} width={20} height={20} />
                  </Button>
                  <Button
                    type="button"
                    className="action-button icon-button"
                    onClick={(event) => handleEditClick(event, eachEmp)}
                  >
                    <img src={EditIcon} width={20} height={20} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isOpen && (
        <Dialog>
          <DialogBody ref={confirmDialogContaierRef}>
            <DialogContent>
              <DialogTitle>Are you sure ?</DialogTitle>
              Do you really want to delete employee?
            </DialogContent>
            <DialogFooter>
              <Button
                className="action-button cancel-button center"
                onClick={hideDialog}
              >
                Cancel
              </Button>
              <Button
                className="action-button confirm-button center"
                onClick={handleConfirmDelete}
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogBody>
        </Dialog>
      )}
    </section>
  );
};

export default EmployeeList;