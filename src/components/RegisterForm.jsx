import "./styles/loginform.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState();
  const URL = "http://localhost:4002";
  const REGISTER_ENDPOINT = `${URL}/auth/register`;

  const handleClickLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleClickRegister = (e) => {
    e.preventDefault();
    const btn = document.getElementById("registerBtn");
    const username = document.getElementsByName("usuario")[0].value;
    const email = document.getElementsByName("email")[0].value;
    const contrasenia = document.getElementsByName("contrasenia")[0].value;
    const confirmarcontrasenia = document.getElementsByName(
      "confirmarcontrasenia"
    )[0].value;

    if (contrasenia !== confirmarcontrasenia)
      return setMsg(
        <div className="error">
          Las contraseñas no coinciden.
          <br />
          Por favor, asegúrate de ingresarlas correctamente.
        </div>
      );
    if (!username)
      return setMsg(
        <div className="error">
          El nombre de usuario es obligatorio.
          <br />
          Por favor, ingresa un nombre de usuario.
        </div>
      );
    if (!email)
      return setMsg(
        <div className="error">
          El correo electrónico es obligatorio.
          <br />
          Por favor, ingresa tu correo para continuar.
        </div>
      );

    btn.disabled = true;

    fetch(REGISTER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: contrasenia,
        role: "USER",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        setMsg(<div className="success">Registro exitoso</div>);
        console.log("Registro exitoso:", data);
      })
      .catch((error) => {
        console.error("Hubo un error:", error);
        setMsg(<div className="error">{error}</div>);
      });

    btn.disabled = false;
  };

  return (
    <main className="login-main">
      <div className="formcard">
        <img
          src="src\assets\logotextoblanco.png"
          alt="loginlogo"
          id="imgRegister"
        />
        <form className="login-form">
          <label htmlFor="usuario">Usuario</label>
          <input type="text" name="usuario" />
          <label htmlFor="email">Correo</label>
          <input type="email" name="email" />
          <label htmlFor="contrasenia">Contraseña:</label>
          <input type="password" name="contrasenia" />
          <label htmlFor="confirmarcontrasenia">Confirmar contraseña:</label>
          <input type="password" name="confirmarcontrasenia" />
          {msg}
          <button onClick={handleClickRegister} id="registerBtn">
            Registrarme
          </button>
          <button onClick={handleClickLogin}>Ingresar</button>
        </form>
      </div>
    </main>
  );
};
