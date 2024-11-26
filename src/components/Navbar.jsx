import "./styles/navbar.css";
import logonavbar from "/src/assets/logoblanco.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

export const Navbar = () => {
  const loggedIn = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickHome = () => {
    navigate("/home");
  };

  const handleLoginLogout = () => {
    if (loggedIn) {
      dispatch(logout());
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  const handleClickAdmin = () => {
    navigate("/admin")
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logonavbar} alt="logo-navbar" />
        <p onClick={handleClickHome}>Course Commerce</p>
      </div>
      <div>
        <Link to={"/home"}>Home</Link>
        <Link to={"/cursos"}>Nuestros cursos</Link>
        <Link to={"/nosotros"}>Nosotros</Link>
        <Link to={"/contacto"}>Contacto</Link>
        {loggedIn ? (
          <>
            <Link to={"/carrito"}>Mi Carrito</Link>
            <Link to={"/mis-cursos"}>Mis Cursos</Link>
            <button onClick={handleClickAdmin}>Admin</button>
            <button style={{marginLeft: 0}} onClick={handleLoginLogout}>Cerrar Sesión</button>
          </>
        ) : (
          <button onClick={handleLoginLogout}>Ingresar</button>
        )}
      </div>
    </nav>
  );
};
