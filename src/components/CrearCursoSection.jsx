import { useState } from "react";
import "./styles/crearcursosection.css";

export const CrearCursoSection = () => {
  const [status, setStatus] = useState(null);
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
    const day = (fecha.getDate() + 1).toString().padStart(2, "0");

    return `${year}${month}${day}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nombre = document.getElementsByName("nombre")[0].value;
    const categoria = document.getElementsByName("categoria")[0].value;
    const profesor = document.getElementsByName("profesor")[0].value;
    const fechaInicio = convertirFecha(
      document.getElementsByName("fechaInicio")[0].value
    );
    const vacantes = document.getElementsByName("vacantes")[0].value;
    const descripcion = document.getElementsByName("descripcion")[0].value;

    fetch(COURSES_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        description: nombre,
        longDescription: descripcion,
        startDate: fechaInicio,
        category: categoria,
        maxSlots: vacantes,
        teacher: profesor,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          setStatus("ERROR");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setStatus("OK");
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
        <input type="text" name="nombre" />
        <label htmlFor="categoria">Categoría:</label>
        <input type="text" name="categoria" />
        <label htmlFor="profesor">Profesor:</label>
        <input type="text" name="profesor" />
        <label htmlFor="fechaInicio">Fecha de inicio:</label>
        <input type="date" name="fechaInicio"></input>
        <label htmlFor="vacantes">Vacantes:</label>
        <input type="number" name="vacantes"></input>
        <label htmlFor="descripcion">Descripción:</label>
        <textarea name="descripcion"></textarea>
        <br />
        <button type="submit">Crear</button>
      </form>
    </section>
  );
};
