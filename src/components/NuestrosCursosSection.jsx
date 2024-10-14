import "./styles/nuestroscursossection.css";
import { useState, useEffect } from "react";
import { CursoCard } from "./CursoCard";

export const NuestrosCursosSection = () => {
  const [cursos, setCursos] = useState([]);
  const URL = "http://localhost:4002";
  const COURSES_ENDPOINT = `${URL}/courses`;

  useEffect(() => {
    fetch(COURSES_ENDPOINT, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        setCursos(data);
      })
      .catch((error) => {
        console.error("Hubo un error:", error);
      });
  }, []);

  return (
    <section className="nuestroscursos-section">
      {cursos ? (
        cursos.map((curso) => {
          return (
            <CursoCard
              key={curso.id}
              descripcion={curso.description}
              categoria={curso.category.description}
              vacantesDisponibles={curso.availableSlots}
              vacantesTotales={curso.maxSlots}
              fechaInicio={curso.startDate}
              profesor={curso.teacher}
            />
          );
        })
      ) : (
        <div className="nuestroscursos-error">
            No se han encontrado cursos.
        </div>
      )}
    </section>
  );
};
