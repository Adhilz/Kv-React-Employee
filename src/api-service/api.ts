import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
 


const employeeBaseApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({
  	baseUrl: "http://localhost:8000",
    prepareHeaders: (headers) => {
    	
    	const token = localStorage.getItem("token");
 
    	console.log("token", token);
    	// If a token exists, add it to the headers
    	if (token) {
      		headers.set("Authorization", `Bearer ${token}`);
    	}
 
    	return headers;
  	},
  }),
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: () => ({}),
  tagTypes: ['Employees']
});
 
export default employeeBaseApi;