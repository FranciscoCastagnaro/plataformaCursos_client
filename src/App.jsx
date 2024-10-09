import { Home } from "./views/Home.jsx";
import { Routes, Route } from "react-router-dom";
import { Login } from "./views/Login.jsx";
import { Nosotros } from "./views/Nosotros.jsx";
import { Contacto } from "./views/Contacto.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </>
  );
}

export default App;
