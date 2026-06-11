import employeeBaseApi from "../api";
 
type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  access_token: string;
  refresh_token:string;
  employee: {
    id: number;
    name: string;
  };
};
export const loginApi = employeeBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({ 
      query: ({ email, password }) => {
        const loginFormData = new FormData();
        loginFormData.set("username", email);
        loginFormData.set("password", password);

        return {
          url: "/auth/login",
          body: loginFormData,
          formData: true,
          method: "POST"
        }
    },
  }),
}),
});
 
export const { useLoginMutation } = loginApi;