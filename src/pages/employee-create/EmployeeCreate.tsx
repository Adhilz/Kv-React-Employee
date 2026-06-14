import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import FileInput from "../../components/FileInput/FileInput";
import Input from "../../components/Input/Input";
import SectionHeader from "../../components/layout/Section/SectionHeader";
import { Select, SelectOption } from "../../components/Select/Select";
import { useLocation, useNavigate } from "react-router";

import "./style.css";
import type { Employee } from "../../components/Types/employee";
import FileUploadDialog from "../../components/FileUpload/FileUpload";
import { useDialog } from "../../hooks/useDialog";
// import { addEmployee } from "../../store/employee/employeeReducer";
// import { useAppDispatch } from "../../store/store";
import {
  useCreateEmployeeMutation,
  useGetEmployeeByIdQuery,
  useUpdateAddressByIdMutation,
  useUpdateEmployeeMutation,
} from "../../api-service/employees/employees.api";
import type { CreateEmployeePayload } from "../../api-service/employees/types";

const EmployeeCreate = () => {
  const navigte = useNavigate();
  const location = useLocation();
  

  // const dispatch = useAppDispatch();

  const [createEmployee, { isLoading: isCreateLoading }] =
    useCreateEmployeeMutation();

  const [updateEmployee, { isLoading: isUpdateLoading }] =
    useUpdateEmployeeMutation();

  const [updateAddress, { isLoading: isAddressLoading }] =
    useUpdateAddressByIdMutation();

  const {
    data: currentEmployee,
    isLoading: isEmployeeLoading,
    error: employeeLoadingError,
  } = useGetEmployeeByIdQuery(location.state?.id, {
    skip: !location.state?.id,
  });

  const {
    showDialog: showFileDialog,
    hideDialog: hideFileDialog,
    isOpen: isFileDialogOpen,
    containerRef: fileContainerRef,
    triggerRef: fileTriggerRef,
  } = useDialog();

  const [data, setData] = useState<Employee>({
    name: "",
    id: "",
    joiningDate: "",
    role: "",
    status: "",
    experience: 0,
    action: "",
    age: 0,
    email: "",
    password: "",
    addresses: {
      line: "",
      city: "",
      country: "",
      postal_code: "",
    },
    idProof: null,
  });

  const isUpdateMode = Boolean(location.state);

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();

    // dispatch(addEmployee(data));

    console.log(data);

    const payload: CreateEmployeePayload = {
      name: data.name,
      email: data.email,
      age: data.experience,
      role: data.role,
      status:data.status,
      password: data.password,
      addresses: {
        line: data.addresses.line,
        city: data.addresses.city,
        country: data.addresses.country,
        postal_code: data.addresses.postal_code,
      },
    };

    if (isUpdateMode) {
      if (payload.addresses) {
        console.log(payload.addresses)
        updateAddress({
          employeeId: String(currentEmployee?.id),
          addressId: String(currentEmployee?.addresses[0].id),
          payload: payload.addresses,
        }).catch((err) => alert(err));
      }

      updateEmployee({
        id: String(currentEmployee!.id),
        payload: payload,
      })
        .unwrap()
        .then((data) => {
          navigte(`/employee/${data.id}/details`);
        })
        .catch((err) => alert(err));
    } else {
      createEmployee(payload)
        .unwrap()
        .then((data) => {
          navigte(`/employee/${data.id}/details`);
        })
        .catch((err) => alert(err));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name.includes(".")) {
      const keys = name.split(".");
      setData((prev) => ({
        ...prev,
        addresses: {
          ...prev.addresses,
          [keys[1]]: value,
        },
      }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file: File) => {
    if (!file) return;

    setData((prev) => ({
      ...prev,
      idProof: file,
    }));
  };

  const handleFileUpload = () => {
    hideFileDialog();
  };

  const handleRemoveFile = () => {
    setData((prev) => ({
      ...prev,
      idProof: null,
    }));
  };

  useEffect(() => {
    if (isEmployeeLoading) return;

    if (employeeLoadingError) {
      alert("Failed to fetch employee details");
      return;
    }

    if (currentEmployee) {
      setData({
        name: currentEmployee.name,
        id: "",
        joiningDate: "",
        role: currentEmployee.role,
        status: currentEmployee.status,
        experience: currentEmployee.age || 0,
        action: "",
        age: currentEmployee.age,
        email: currentEmployee.email,
        password: "",
        addresses: {
        line: currentEmployee.addresses[0]?.line ?? "",
        city: currentEmployee.addresses[0]?.city ?? "",
        country: currentEmployee.addresses[0]?.country ?? "",
        postal_code: currentEmployee.addresses[0]?.postal_code ?? "",
        },
        idProof: null,
      });
    }
  }, [currentEmployee, isEmployeeLoading, employeeLoadingError]);

  return (
    <aside className="employee-create-wrapper">
      <SectionHeader label="Create Employee" />
      {isFileDialogOpen && (
        <FileUploadDialog
          id="id-proof"
          ref={fileContainerRef}
          onChange={handleFileChange}
          onCancel={hideFileDialog}
          onUpload={handleFileUpload}
          value={data.idProof?.name || ""}
        />
      )}
      <form className="employee-create-form" onSubmit={handleSubmit}>
        <div className="employee-form-fields-container">
          <Input
            id="employee-name"
            name="name"
            type="text"
            label="Employee Name"
            placeholder="Employee Name"
            value={data.name}
            onChange={handleChange}
            isRequired
          />
          <Input
            id="employee-id"
            name="id"
            type="text"
            label="Employee ID"
            placeholder="Employee ID"
            value={data.id}
            onChange={handleChange}
            isRequired
          />
          <Input
            id="joining-date"
            name="joiningDate"
            type="date"
            label="Joining Date"
            placeholder="Joining Date"
            value={data.joiningDate}
            onChange={handleChange}
            isRequired
          />

          <Select
            id="role"
            label="Role"
            name="role"
            isRequired
            value={data.role}
            onChange={handleSelectChange}
          >
            <SelectOption value="">Select a role</SelectOption>

            <SelectOption value="Developer">Developer</SelectOption>
            <SelectOption value="UI">UI</SelectOption>
            <SelectOption value="UX">UX</SelectOption>
          </Select>

          <Select
            id="status"
            label="Status"
            name="status"
            isRequired
            value={data.status}
            onChange={handleSelectChange}
          >
            <SelectOption value="">Select a status</SelectOption>
            <SelectOption value="Probation">Probation</SelectOption>
            <SelectOption value="Inactive">Inactive</SelectOption>
            <SelectOption value="Active">Active</SelectOption>
          </Select>
          <Input
            id="employee-experience"
            type="text"
            name="experience"
            label="Experience"
            placeholder="Experience"
            value={data.experience?.toString()}
            onChange={handleChange}
            isRequired
          />
          <Input
            id="employee-email"
            name="email"
            type="email"
            label="Employee Email"
            placeholder="Employee Email"
            value={data.email}
            onChange={handleChange}
            isRequired
          />
          {!isUpdateMode && (
            <Input
              id="employee-password"
              type="password"
              name="password"
              label="Passowrd"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              isRequired
            />
          )}

          <FileInput
            ref={fileTriggerRef}
            id="upload-file"
            label="Upload ID Proof"
            name="idProof"
            fileName={data.idProof?.name || ""}
            actionLabel="Attach files"
            onClick={showFileDialog}
            onRemoveClick={handleRemoveFile}
          />

          <div className="input-wrapper">
            <label htmlFor="employee-address">Address</label>
            <div className="address-group">
              <Input
                id="employee-address"
                name="addresses.line"
                value={data.addresses.line}
                onChange={handleChange}
                type="text"
                placeholder="Address"
                isRequired
              />
              <div className="address-subdetails-group">
                <Input
                  id="employee-address-city"
                  name="addresses.city"
                  value={data.addresses.city}
                  onChange={handleChange}
                  type="text"
                  placeholder="City"
                  isRequired
                />
                <Input
                  id="employee-address-country"
                  name="addresses.country"
                  type="text"
                  value={data.addresses.country}
                  onChange={handleChange}
                  placeholder="Country"
                  isRequired
                />
                <Input
                  id="employee-address-postal-code"
                  name="addresses.postal_code"
                  value={data.addresses.postal_code}
                  onChange={handleChange}
                  type="text"
                  placeholder="Postal Code"
                  isRequired
                />
              </div>
            </div>
          </div>
        </div>
        <div className="employee-form-actions">
          <Button
            type="submit"
            className="employee-form-submit-button"
            disabled={isCreateLoading || isUpdateLoading || isAddressLoading}
          >
            {isCreateLoading || isUpdateLoading
              ? "Saving"
              : isUpdateMode
                ? "Update"
                : "Create"}
          </Button>
          <Button type="reset" className="employee-form-clear-button">
            Cancel
          </Button>
        </div>
      </form>
    </aside>
  );
};

export default EmployeeCreate;