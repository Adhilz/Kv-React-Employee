import { type BaseApiResponse } from "../type";

export type BaseEmployeeApiResponse = {
  id: number;
  name: string;
  email: string;
  age: number | null;
  role: string;
  status:string;
};

export type EmployeeApiResponse = BaseEmployeeApiResponse & {
  created_at: string;
  updated_at: string;
};

export type EmployeeListResponse = BaseEmployeeApiResponse[];

type BaseDepartmentApiResponse = BaseApiResponse & {
  name: string;
};

export type EmployeeWithAddressAndDepartmentApiResponse =
  EmployeeApiResponse & {
    addresses: AddressApiResponse[];
    departments: BaseDepartmentApiResponse[];
  };

export type GetEmployeeQuery = {
  id: number;
};

export type CreateAddressPayload = {
  line: string;
  city: string;
  country: string;
  postal_code: string;
};

export type AddressApiResponse = BaseApiResponse & {
  city: string;
  line: string;
  postal_code: string;
  country: string;
};

export type CreateEmployeePayload = {
  name: string;
  email: string;
  age: number | null;
  role: string;
  password: string;
  status:string;
  addresses: CreateAddressPayload | null;
};

export type UpdateEmployeePayload = {
  id: string;
  payload: {
    name?: string;
    email?: string;
    age?: number | null;
    role?: string;
    status?:string;
  };
};

export type UpdateAddressPayload = {
  employeeId: string;
  addressId: string;
  payload: {
    line?: string;
    city?: string;
    postal_code?: string;
    country?: string;
  };
};