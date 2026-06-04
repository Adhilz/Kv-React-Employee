import { useState } from "react";
import "./App.css";
import Layout from "./components/layout/Layout/Layout";
import ChatExample from "./pages/ChatExample";
import useFetch from '../src/hooks/CustomHook'
// import EmployeeCreate from "./pages/employee-create/EmployeeCreate";

function App() {
  // return (
  //   <>
  //     <Layout>
  //       {/* <Login /> */}
  //       {/* <EmployeeCreate /> */}
  //       {/* <Layout/> */}
  //       <ChatExample />
        
        
  //     </Layout>
  //   </>
  // );
  const [search, setSearch] = useState("");

  const employees = useFetch(search);

  return (
    <>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search employee"
      />

      {employees.map((employee) => (
        <p key={employee.id}>
          {employee.name}
        </p>
      ))}
    </>
  );
}

export default App;

