import "./styles/footer.css";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer>
      <div className="maininfo">
        Course Commerce © 2024 Todos los derechos reservados.
      </div>
      <div className="sections">
        <Link to={"/home"}>Home</Link>
        <Link to={"/cursos"}>Nuestros cursos</Link>
        <Link to={"/nosotros"}>Nosotros</Link>
        <Link to={"/contacto"}>Contacto</Link>
      </div>
    </footer>
  );
};
