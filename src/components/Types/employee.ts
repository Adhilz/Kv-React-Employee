export type Employee = {
  name: string;
  id: string;
  joiningDate: string;
  age: number | null;
  email: string;
  role: string;
  status: string;
  experience: number;
  action: string;
  password: string;
  addresses: {
    line: string;
    city: string;
    country: string;
    postal_code: string;
  };
  idProof: File | null;
};

export type EmployeeState = {
  employees: Employee[];
};