import { createBrowserRouter, RouterProvider } from "react-router";

import Login from "./pages/login/Login";
import Landing from './pages/landing/Landing'
import { lazy } from "react";
import Layout from "@/components/layout/Layout/Layout";
import EmployeeCreate from "./pages/employee-create/EmployeeCreate";
import NotFound from "./pages/NotFound/NotFound";
const EmployeeList= lazy(()=>import("./pages/employee-list/EmployeeList"));
import ProtectedRoute from "./components/Routes/ProtectedRoutes";
// import FileUpload from "./components/FileUpload/FileUpload";
import { Provider } from "react-redux";
import CommonError from "./error/CommonError";
import EmployeeDetails from "./pages/employee-details/EmployeeDetail";
// import EmployeeDelete from "./components/Dialog/EmployeeDelete/EmployeeDelete";
import store from "./store/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <CommonError />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <CommonError />,
  },
  {
    path: "/employee",
    element: <Layout />,
    errorElement: <CommonError />,

    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <EmployeeList />
            
          </ProtectedRoute>
        ),
        
        
        
      },
      {
        path: ":id/details",
        element: (
          <ProtectedRoute>
            <EmployeeDetails />
          </ProtectedRoute>
        ),
       
      },
      {
        path: "create",
        element: (
          <ProtectedRoute>
            <EmployeeCreate />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const App = () => (
  <Provider store={ store  }>
  <RouterProvider router={router} />
  </Provider>
);

export default App;