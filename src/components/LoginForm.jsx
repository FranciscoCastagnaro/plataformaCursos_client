import "./styles/loginform.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice.js";
import logologin from "/src/assets/logotextoblanco.png";

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // Verifica si ya hay un usuario logueado
  const [msg, setMsg] = useState(null);
  const [formData, setFormData] = useState({
    correo: "",
    contrasenia: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const URL = "http://localhost:4002";
  const LOGIN_ENDPOINT = `${URL}/auth/authenticate`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClickRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  const handleClickLogin = async (e) => {
    e.preventDefault();

    const { correo, contrasenia } = formData;

    if (!correo) {
      setMsg(
        <div className="error">
          El correo electrónico es obligatorio.
          <br />
          Por favor, ingresa un correo.
        </div>
      );
      return;
    }
    if (!contrasenia) {
      setMsg(
        <div className="error">
          La contraseña es obligatoria.
          <br />
          Por favor, ingresa una contraseña.
        </div>
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: correo,
          password: contrasenia,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al iniciar sesión");
      }

      const data = await response.json();
      console.log(data);

      dispatch(login({ token: data.access_token, userId: data.userID, username: data.username }));

      setMsg(<div className="success">Ingreso exitoso</div>);
      console.log("Ingreso exitoso:", data);
    } catch (error) {
      console.error("Hubo un error:", error);
      setMsg(<div className="error">Correo y/o contraseña incorrecto/s</div>);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (user) {
    setTimeout(() => {
      navigate("/home");
      return null;
    }, 2000);
  }

  return (
    <main className="login-main">
      <div className="formcard">
        <img src={logologin} alt="loginlogo" id="imgLogin" />
        <form className="login-form">
          <label htmlFor="correo">Correo</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
          />
          <label htmlFor="contrasenia">Contraseña:</label>
          <input
            type="password"
            name="contrasenia"
            value={formData.contrasenia}
            onChange={handleChange}
          />
          {msg}
          <button onClick={handleClickLogin} disabled={isSubmitting}>
            {isSubmitting ? "Ingresando..." : "Ingresar"}
          </button>
          <button onClick={handleClickRegister}>Registrarme</button>
        </form>
      </div>
    </main>
  );
};
