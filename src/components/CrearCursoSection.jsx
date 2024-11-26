import { useState } from "react";
import "./styles/crearcursosection.css";
import { useNavigate } from "react-router-dom";

export const CrearCursoSection = () => {
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    profesor: "",
    fechaInicio: "",
    vacantes: "",
    descripcion: "",
  });

  const statusMsg = {
    OK: "Curso creado con éxito.",
    ERROR: "Ocurrió un error al crear el curso.",
  };

  const URL = "http://localhost:4002";
  const COURSES_ENDPOINT = `${URL}/courses`;

  const convertirFecha = (formatoLargo) => {
    const fecha = new Date(formatoLargo);
    const year = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const day = fecha.getDate().toString().padStart(2, "0");

    return `${year}${month}${day}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fechaInicioConvertida = convertirFecha(formData.fechaInicio);

    fetch(COURSES_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        description: formData.nombre,
        longDescription: formData.descripcion,
        startDate: fechaInicioConvertida,
        category: formData.categoria,
        maxSlots: formData.vacantes,
        teacher: formData.profesor,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          setStatus("ERROR");
          return;
        }
        setStatus("OK");
        setTimeout(() => {
          navigate('/admin')
        }, 2000);
      })
      .catch((error) => {
        console.error("Hubo un error:", error);
        setStatus("ERROR");
      });
  };

  return (
    <section className="crearcurso-section">
      <h2>Crear Curso</h2>
      <form onSubmit={handleSubmit} className="form-crear">
        {status && (
          <div className={`status-div-${status}`}>
            <p>{statusMsg[status]}</p>
          </div>
        )}
        <label htmlFor="nombre">Nombre del curso:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        <label htmlFor="categoria">Categoría:</label>
        <input
          type="text"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
        />
        <label htmlFor="profesor">Profesor:</label>
        <input
          type="text"
          name="profesor"
          value={formData.profesor}
          onChange={handleChange}
        />
        <label htmlFor="fechaInicio">Fecha de inicio:</label>
        <input
          type="date"
          name="fechaInicio"
          value={formData.fechaInicio}
          onChange={handleChange}
        />
        <label htmlFor="vacantes">Vacantes:</label>
        <input
          type="number"
          name="vacantes"
          value={formData.vacantes}
          onChange={handleChange}
        />
        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
        ></textarea>
        <br />
        <button type="submit">Crear</button>
      </form>
    </section>
  );
};
