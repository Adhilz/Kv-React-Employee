import { useNavigate } from "react-router";
import LoginHeroImage from "../../assets/login-left-image-mask.png";
import Header from "../../components/layout/Header/Header";
import "./style.css";
import { useEffect } from "react";

const Landing = () => {
   const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login", { replace: true });
    }, 3000); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="landing-layout">
      <Header />
      <section className="landing-content">
        <div className="landing-left-container center">
          <div className="landing-left-image-container w-full center">
            <img className="landing-left-image" src={LoginHeroImage} />
          </div>
        </div>

        <div className="landing-right-container ">
          <div>
            <h1>KeyValue</h1>
            <p>Employee Application</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Landing;