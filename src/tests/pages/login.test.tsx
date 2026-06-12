import { render,screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event"
import Login from "../../pages/login/Login";import { configureStore } from "@reduxjs/toolkit";
const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock the store
const mockStore = configureStore({
  reducer: {
    employee: (state = { employees: [] }) => state,
    department: (state = { departments: [] }) => state,
    employeeApi: (state = {}) => state,
  },
});

// Mock the login mutation
const mockLoginMutation = vi.fn();
vi.mock("../../api-service/auth/login", () => ({
  useLoginMutation: () => [
    () => ({
      unwrap: () => mockLoginMutation(),
    }),
    { isLoading: false },
  ],
}));
mockLoginMutation.mockResolvedValue({
  access_token: "fake-token",
});

describe("Login Page",()=>{
    it("match snapshot",()=>{
         const {container} =render(<Login />)
    expect(container).toMatchSnapshot()
    })

    it("Should Validate inputs",async ()=>{
        render(<Login />)
       

        const usernameInput= screen.getByPlaceholderText("Username");
        const passwordField=screen.getByPlaceholderText("Password");
        await userEvent.type(usernameInput, "adhilsalam200");
        await userEvent.type(passwordField,"1")
        expect(screen.getByText("Must contain @")).toBeInTheDocument();
        expect(
            screen.getByText("Must be greater than or equal 8 characters")
            ).toBeInTheDocument();

       
        })
    })
    it("Should login successfully", async () => {
  mockLoginMutation.mockResolvedValue({
    access_token: "fake-token",
  });

  render(<Login />);

  const usernameInput = screen.getByPlaceholderText("Username");
  const passwordInput = screen.getByPlaceholderText("Password");
  const loginButton = screen.getByRole("button", { name: /login/i });

  await userEvent.type(usernameInput, "adhil@gmail.com");
  await userEvent.type(passwordInput, "password123");

  await userEvent.click(loginButton);

  await waitFor(() => {
    expect(mockLoginMutation).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/employee");
  })
})
  it("Should show error on failed login", async () => {
  mockLoginMutation.mockRejectedValueOnce({
    detail: "error",
  });

  render(<Login />);

  const usernameInput = screen.getByPlaceholderText("Username");
  const passwordInput = screen.getByPlaceholderText("Password");
  const loginButton = screen.getByRole("button", { name: /login/i });

  await userEvent.type(usernameInput, "adhil@gmail.com");
  await userEvent.type(passwordInput, "password123");

  await userEvent.click(loginButton);

  await waitFor(() => {
    expect(mockLoginMutation).toHaveBeenCalled();
  });

});