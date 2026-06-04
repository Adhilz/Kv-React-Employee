import { useState, useEffect } from "react";

type Employee = {
  id: number;
  name: string;
};

const EMPLOYEES: Employee[] = [
  { id: 1, name: "Adhil" },
  { id: 2, name: "John" },
  { id: 3, name: "Sarah" },
  { id: 4, name: "Alex" },
];

function useFetch(searchTerm: string) {
  const [data, setData] = useState<Employee[]>([]);

  useEffect(() => {
    const filteredData = EMPLOYEES.filter((employee) =>
      employee.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    setData(filteredData);
  }, [searchTerm]);

  return data;
}

export default useFetch;