import InputField from "../components/InputField";
import Button from "../components/Button";
import image1 from "../assets/image1.png";
import logo from "../assets/image.png";
import "../styles/login.css";

function Login() {
  return (
    <div className="container">
      <div className="left">
            <div className="logo-circle">
                <img src={image1} alt="Logo" />
            </div>
      </div>

      <div className="right">
            <div className="keybox">
                <img
                id="key-value-image"
                src={logo}
                alt="KeyValue"
                />

                <form>
                    <InputField
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    />

                    <InputField
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    />

                    <Button
                    text="Login"
                    type="submit"
                    />
                </form>
            </div>
        </div>
    </div>
  );
}

export default Login;