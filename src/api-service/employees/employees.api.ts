import employeeBaseApi from "../api";
import type { AddressApiResponse, CreateEmployeePayload, EmployeeApiResponse, UpdateAddressPayload, UpdateEmployeePayload } from "./types";
import type { Employee} from "../../components/Types/employee"
import type { EmployeeWithAddressAndDepartmentApiResponse } from "./types";

export const employeeApi= employeeBaseApi.injectEndpoints({
    endpoints: (builder) => ({
    getEmployees: builder.query<Employee[], void>({
      query: () => "/employee",
      providesTags: ['Employees']
    }),
    getEmployeeById: builder.query<EmployeeWithAddressAndDepartmentApiResponse, string>({
    query: (id) => `/employee/${id}`,
    providesTags: ["Employees"],
    }),
    createEmployee: builder.mutation<Employee, CreateEmployeePayload>({
    query: (employee) => ({
    url: "/employee",
    method: "POST",
    body: employee,
    }),
    invalidatesTags: ["Employees"],
    }),
    deleteEmployee: builder.mutation<void, number>({
    query: (id) => ({
    url: `/employee/${id}`,
    method: "DELETE",
  }),
  invalidatesTags: ["Employees"],
}),
    updateEmployee: builder.mutation<
      EmployeeApiResponse,
      UpdateEmployeePayload
    >({
      query: ({ id, payload }) => ({
        url: `/employee/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Employees"],
    }),
    updateAddressById: builder.mutation<
      AddressApiResponse,
      UpdateAddressPayload
    >({
      query: ({ addressId, payload }) => ({
        url: `/addresses/${addressId}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Employees"],
    }),
    })
    

})

export const { useGetEmployeesQuery,useGetEmployeeByIdQuery,useCreateEmployeeMutation,useDeleteEmployeeMutation,useUpdateEmployeeMutation,useUpdateAddressByIdMutation } = employeeApi;