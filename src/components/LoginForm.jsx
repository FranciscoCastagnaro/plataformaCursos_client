import "./styles/loginform.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logologin from "/src/assets/logotextoblanco.png";


export const LoginForm = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState();
  const URL = "http://localhost:4002";
  const LOGIN_ENDPOINT = `${URL}/auth/authenticate`;

  const handleClickRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  const handleClickLogin = (e) => {
    e.preventDefault();
    const btn = document.getElementById("loginBtn");
    const email = document.getElementsByName("correo")[0].value;
    const contrasenia = document.getElementsByName("contrasenia")[0].value;

    if (!email)
      return setMsg(
        <div className="error">
          El correo electrónico es obligatorio.
          <br />
          Por favor, ingresa un correo.
        </div>
      );
    if (!contrasenia)
      return setMsg(
        <div className="error">
          Las contraseña es obligatoria.
          <br />
          Por favor, ingresa una contraseña.
        </div>
      );

    btn.disabled = true;

    fetch(LOGIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: contrasenia,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          setMsg(<div className="error">Error</div>);
        }
        return response.json();
      })
      .then((data) => {
        setMsg(<div className="success">Ingreso exitoso</div>);
        console.log("Ingreso exitoso:", data);
      })
      .catch((error) => {
        console.error("Hubo un error:", error);
        setMsg(<div className="error">Correo y/o contraseña incorrecto/s</div>);
      });

    btn.disabled = false;
  };

  return (
    <main className="login-main">
      <div className="formcard">
        <img
          src={logologin}
          alt="loginlogo"
          id="imgLogin"
        />
        <form className="login-form">
          <label htmlFor="correo">Correo</label>
          <input type="email" name="correo" />
          <label htmlFor="contrasenia">Contraseña:</label>
          <input type="password" name="contrasenia" />
          {msg}
          <button onClick={handleClickLogin} id="loginBtn">
            Ingresar
          </button>
          <button onClick={handleClickRegister}>Registrarme</button>
        </form>
      </div>
    </main>
  );
};
