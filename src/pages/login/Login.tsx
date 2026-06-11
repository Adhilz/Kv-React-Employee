import { useNavigate } from "react-router";

import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import "./style.css";
import { useLoginMutation } from "../../api-service/auth/login";
import IconImage from "../../assets/icon.png";
import LoginHeroImage from "../../assets/login-left-image-mask.png";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [login, { isLoading, error }] = useLoginMutation();
  
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "username": {
        const emailMsg = value && !value.includes("@") ? "Must contain @" : "";

        setErrors((prev) => ({ ...prev, username: emailMsg }));
        return;
      }
      case "password": {
        const passwordMsg =
          value && value.length < 8
            ? "Must be greater than or equal 8 characters"
            : "";
        setErrors((prev) => ({
          ...prev,
          password: passwordMsg,
        }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    validateField(name, value);
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const response = await login({
      email: data.username,
      password: data.password,
    }).unwrap();

    localStorage.setItem("token", response.access_token);

    console.log(response);

    navigate("/employee");
  } catch (err) {
    console.error("Login failed", err);
  }
};

  return (
    <main className="login-layout">
      <div className="login-left-container center">
        <div className="login-left-image-container w-full center">
          <img className="login-left-image" src={LoginHeroImage} />
        </div>
      </div>

      <div className="login-right-container center">
        <div className="login-container">
          <img src={IconImage} className="login-form-icon" />

          <form className="login-form-layout" onSubmit={handleSubmit}>
            <Input
              id="username"
              
              type="text"
              name="username"
              placeholder="Username"
              value={data.username}
              onChange={handleChange}
              
              isRequired
            />
            {errors.username && (
              <span className="error-box">{errors.username}</span>
            )}

            <Input
              id="password"
              type="password"
              name="password"
              
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              
              isRequired
            />
            {errors.password && (
              <span className="error-box">{errors.password}</span>
            )}
              {error && (
  <span className="error-box">
    Invalid username or password
  </span>
)}
            <Button
              type="submit"
              className="login-submit-button"
              disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;