import "./styles/loginform.css";

export const LoginForm = () => {
  return (
    <main className="login-main">
      <div className="formcard">
        <img src="src\assets\logotextoblanco.png" alt="loginlogo" />
        <form className="login-form">
          <label htmlFor="usuario">Usuario</label>
          <input type="text" name="usuario"/>
          <label htmlFor="contrasenia">Contraseña:</label>
          <input type="password" name="contrasenia"/>
          <button>Login</button>
          <button>Register</button>
        </form>
      </div>
    </main>
  );
};
