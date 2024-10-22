import { useState } from "react";
import "./styles/crearcursosection.css";
import { useLocation } from "react-router-dom";

export const EditarCursoSection = () => {
  const [status, setStatus] = useState(null);
  const { state } = useLocation();
  const curso = state;

  const statusMsg = {
    OK: "Curso editado con éxito.",
    ERROR: "Ocurrió un error al editar el curso.",
  };
  const URL = "http://localhost:4002";
  const COURSES_ENDPOINT = `${URL}/courses`;

  // YYYY-MM-DD
  function formatDate(fecha) {
    const año = fecha.substring(0, 4);
    const mes = fecha.substring(4, 6);
    const día = fecha.substring(6, 8);

    return `${año}-${mes}-${día}`;
  }

  //YYYYMMDD
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
      method: "PUT",
      body: JSON.stringify({
        description: curso.description,
        newDescription: nombre,
        longDescription: descripcion,
        startDate: fechaInicio,
        category: categoria,
        maxSlots: vacantes,
        teacher: profesor
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
        curso.descripcion = nombre;
        setStatus("OK");
      })
      .catch((error) => {
        console.error("Hubo un error:", error);
        setStatus("ERROR");
      });
  };

  return (
    <section className="crearcurso-section">
      <h2>Editar Curso</h2>
      <form onSubmit={handleSubmit} className="form-crear">
        {status && (
          <div className={`status-div-${status}`}>
            <p>{statusMsg[status]}</p>
          </div>
        )}
        <label htmlFor="nombre">Nombre del curso:</label>
        <input type="text" name="nombre" defaultValue={curso.description} />
        <label htmlFor="categoria">Categoría:</label>
        <input
          type="text"
          name="categoria"
          defaultValue={curso.category.description}
        />
        <label htmlFor="profesor">Profesor:</label>
        <input type="text" name="profesor" defaultValue={curso.teacher} />
        <label htmlFor="fechaInicio">Fecha de inicio:</label>
        <input
          type="date"
          name="fechaInicio"
          defaultValue={formatDate(curso.startDate)}
        ></input>
        <label htmlFor="vacantes">Vacantes:</label>
        <input
          type="number"
          name="vacantes"
          defaultValue={curso.maxSlots}
        ></input>
        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          name="descripcion"
          defaultValue={curso.longDescription}
        ></textarea>
        <br />
        <button type="submit">Editar</button>
      </form>
    </section>
  );
};
