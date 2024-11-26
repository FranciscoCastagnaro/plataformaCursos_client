import "./styles/loginform.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logoregister from "/src/assets/logotextoblanco.png";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usuario: "",
    email: "",
    contrasenia: "",
    confirmarContrasenia: "",
  });
  const [msg, setMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const URL = "http://localhost:4002";
  const REGISTER_ENDPOINT = `${URL}/auth/register`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClickLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleClickRegister = async (e) => {
    e.preventDefault();
    const { usuario, email, contrasenia, confirmarContrasenia } = formData;

    if (!usuario) {
      return setMsg(
        <div className="error">
          El nombre de usuario es obligatorio.
          <br />
          Por favor, ingresa un nombre de usuario.
        </div>
      );
    }
    if (!email) {
      return setMsg(
        <div className="error">
          El correo electrónico es obligatorio.
          <br />
          Por favor, ingresa tu correo para continuar.
        </div>
      );
    }
    if (contrasenia !== confirmarContrasenia) {
      return setMsg(
        <div className="error">
          Las contraseñas no coinciden.
          <br />
          Por favor, asegúrate de ingresarlas correctamente.
        </div>
      );
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(REGISTER_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usuario,
          email: email,
          password: contrasenia,
          role: "USER",
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const data = await response.json();
      setMsg(<div className="success">Registro exitoso</div>);
      console.log("Registro exitoso:", data);
    } catch (error) {
      console.error("Hubo un error:", error);
      setMsg(<div className="error">Error al registrar: {error.message}</div>);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="login-main">
      <div className="formcard">
        <img src={logoregister} alt="loginlogo" id="imgRegister" />
        <form className="login-form">
          <label htmlFor="usuario">Usuario</label>
          <input
            type="text"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
          />
          <label htmlFor="email">Correo</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="contrasenia">Contraseña:</label>
          <input
            type="password"
            name="contrasenia"
            value={formData.contrasenia}
            onChange={handleChange}
          />
          <label htmlFor="confirmarContrasenia">Confirmar contraseña:</label>
          <input
            type="password"
            name="confirmarContrasenia"
            value={formData.confirmarContrasenia}
            onChange={handleChange}
          />
          {msg}
          <button onClick={handleClickRegister} disabled={isSubmitting}>
            {isSubmitting ? "Registrando..." : "Registrarme"}
          </button>
          <button onClick={handleClickLogin}>Ingresar</button>
        </form>
      </div>
    </main>
  );
};
