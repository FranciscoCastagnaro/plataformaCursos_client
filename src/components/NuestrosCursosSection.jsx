import "./styles/nuestroscursossection.css";
import { useState, useEffect } from "react";
import { CursoCard } from "./CursoCard";

export const NuestrosCursosSection = () => {
  const [cursos, setCursos] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState();
  const [filtroDescripcion, setFiltroDescripcion] = useState(""); // Nuevo estado para la búsqueda por descripción

  const URL = "http://localhost:4002";
  const COURSES_ENDPOINT = `${URL}/courses`;

  const getCategories = (data) => {
    const categories = [];

    for (const curso in data) {
      if (!categories.includes(data[curso].category.description)) {
        categories.push(data[curso].category.description);
      }
    }

    return categories;
  };

  const handleChangeFiltroCategoria = (e) => {
    const categoria = e.target.value;
    setFiltroCategoria(categoria);
  };

  const handleChangeFiltroDescripcion = (e) => {
    const descripcion = e.target.value;
    setFiltroDescripcion(descripcion);
  };

  const cursosFiltrados = cursos
    .filter((curso) =>
      filtroCategoria === "all" || !filtroCategoria
        ? true
        : curso.category.description === filtroCategoria
    )
    .filter(
      (curso) =>
        curso.description
          .toLowerCase()
          .includes(filtroDescripcion.toLowerCase()) // Filtrado por descripción
    );

  useEffect(() => {
    fetch(COURSES_ENDPOINT, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          setCursos();
        }
        return response.json();
      })
      .then((data) => {

        const categories = getCategories(data);
        const selectElement = document.getElementById("categorias");

        selectElement.innerHTML = "";
        const allOption = document.createElement("option");
        allOption.value = "all";
        allOption.textContent = "Todas las categorías";
        selectElement.appendChild(allOption);

        for (const i in categories) {
          const option = document.createElement("option");
          option.value = categories[i];
          option.textContent = categories[i];
          selectElement.appendChild(option);
        }
        setCursos(data);
      })
      .catch((error) => {
        console.error("Hubo un error:", error);
        setCursos();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="nuestroscursos-section">
      {cursos && (
        <div className="nuestroscursos-filtros">
          <label htmlFor="busqueda">Buscar por nombre:</label>
          <input
            type="text"
            id="busqueda"
            placeholder="Buscar cursos..."
            onChange={handleChangeFiltroDescripcion}
          />
          <label htmlFor="categorias">Filtrar por categoría:</label>
          <select
            name="categorias"
            id="categorias"
            onChange={handleChangeFiltroCategoria}
          ></select>
        </div>
      )}
      <div className="nuestroscursos-container">
        {cursosFiltrados.length > 0 ? (
          cursosFiltrados.map((curso) => (
            <CursoCard
              key={curso.id}
              descripcion={curso.description}
              descripcionLarga={curso.longDescription}
              categoria={curso.category.description}
              vacantesDisponibles={curso.availableSlots}
              vacantesTotales={curso.maxSlots}
              fechaInicio={curso.startDate}
              profesor={curso.teacher}
              descuento={curso.discount}
            />
          ))
        ) : (
          <div className="nuestroscursos-error">
            No se han encontraron cursos.
          </div>
        )}
      </div>
    </section>
  );
};
