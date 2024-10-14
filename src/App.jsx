import { Home } from "./views/Home.jsx";
import { Routes, Route } from "react-router-dom";
import { Login } from "./views/Login.jsx";
import { Register } from "./views/Register.jsx";
import { Nosotros } from "./views/Nosotros.jsx";
import { Contacto } from "./views/Contacto.jsx";
import { NuestrosCursos } from "./views/NuestrosCursos.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/cursos" element={<NuestrosCursos />} />
      </Routes>
    </>
  );
}

export default App;
