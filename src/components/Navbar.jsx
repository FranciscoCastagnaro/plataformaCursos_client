import "./styles/navbar.css";
import logonavbar from "/src/assets/logoblanco.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logonavbar} alt="logo-navbar" />
        <p onClick={handleClick}>Course Commerce</p>
      </div>
      <div>
        <Link to={"/home"}>Home</Link>
        <Link to={"/cursos"}>Nuestros cursos</Link>
        <Link to={"/nosotros"}>Nosotros</Link>
        <Link to={"/contacto"}>Contacto</Link>
      </div>
    </nav>
  );
};
