import { Home } from "./views/Home.jsx";
import { Routes, Route } from "react-router-dom";
import { Login } from "./views/Login.jsx";
import { Register } from "./views/Register.jsx";
import { Nosotros } from "./views/Nosotros.jsx";
import { Contacto } from "./views/Contacto.jsx";
import { NuestrosCursos } from "./views/NuestrosCursos.jsx";
import { Admin } from "./views/Admin.jsx";
import { CursoDetalle } from "./views/CursoDetalle.jsx";
import { CrearCurso } from "./views/CrearCurso.jsx";
import { EditarCurso } from "./views/EditarCurso.jsx";
import { Carrito } from "./views/Carrito.jsx";
import { MisCursos } from "./views/MisCursos.jsx";

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
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/crear" element={<CrearCurso />} />
        <Route path="/admin/editar" element={<EditarCurso />} />
        <Route path="/detalle" element={<CursoDetalle />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/mis-cursos" element={<MisCursos />} />
      </Routes>
    </>
  );
}

export default App;
