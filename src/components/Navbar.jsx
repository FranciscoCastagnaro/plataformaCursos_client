import "./styles/navbar.css";
import logonavbar from "/src/assets/logoblanco.png";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logonavbar} alt="logo-navbar" />
        <p>Course Commerce</p>
      </div>
      <div>
        <a href="#home">Home</a>
        <a href="#about">Nuestros cursos</a>
        <a href="#services">Nosotros</a>
        <a href="#contact">Contacto</a>
      </div>
    </nav>
  );
};
