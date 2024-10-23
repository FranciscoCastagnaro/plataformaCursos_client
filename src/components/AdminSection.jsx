import { useState, useEffect } from "react";
import "./styles/adminsection.css";
import { useNavigate } from "react-router-dom";

export const AdminSection = () => {
  const [cursos, setCursos] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const navigate = useNavigate();
  const URL = "http://localhost:4002";
  const COURSES_ENDPOINT = `${URL}/courses`;
  const DISCOUNT_ENDPOINT = `${COURSES_ENDPOINT}/discount`;

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
        console.log();
        setCursos(data);
      })
      .catch((error) => {
        console.error("Hubo un error:", error);
        setCursos();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldUpdate]);

  const handleClickCrear = () => {
    navigate("/editar", {
      state: {},
    });
  };

  const handleClickEliminar = (e) => {
    const descripcion = e.target.dataset.desc;

    fetch(COURSES_ENDPOINT, {
      method: "DELETE",
      body: JSON.stringify({
        description: descripcion,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          alert("Ocurrió un error al eliminar el curso");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        alert("Curso eliminado con éxito");
        setShouldUpdate((prev) => !prev);
      })
      .catch((error) => {
        console.error("Hubo un error:", error);
        setCursos([]);
      });
  };

  const handleClickDescuento = (e) => {
    const descripcion = e.target.dataset.desc;
    const descuento = document.getElementById(`descuento_${descripcion}`).value;

    fetch(DISCOUNT_ENDPOINT, {
      method: "PUT",
      body: JSON.stringify({
        description: descripcion,
        discount: descuento,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          alert("Ocurrió un error al aplicar el descuento");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        alert("Descuento aplicado con éxito");
      })
      .catch((error) => {
        console.error("Hubo un error:", error);
      });
  };

  const handleClickEditar = (curso) => {
    navigate("/admin/editar", {
      state: curso,
    });
  };

  return (
    <section className="adminsection">
      <div className="adminsection-heading">
        <h2>Panel de Administrador de Cursos</h2>
        <button className="btn-crear" onClick={handleClickCrear}>
          Crear Curso
        </button>
      </div>
      <div className="adminsection-panel">
        <table className="adminsection-table">
          <thead>
            <tr>
              <th>Curso</th>
              <th>Categoría</th>
              <th>Descripción</th>
              <th>Descuento (%)</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cursos &&
              cursos.map((curso) => (
                <tr key={curso.id}>
                  <td>{curso.description}</td>
                  <td>{curso.category.description}</td>
                  <td>{curso.longDescription}</td>
                  <td>
                    <input
                      type="number"
                      name="descuento"
                      min="0"
                      max="100"
                      className="input-descuento"
                      id={`descuento_${curso.description}`}
                    />
                    <button
                      className="btn-descuento"
                      data-desc={curso.description}
                      onClick={handleClickDescuento}
                    >
                      Aplicar
                    </button>
                  </td>
                  <td className="td-acciones">
                    <button
                      className="btn-table"
                      onClick={() => {
                        handleClickEditar(curso);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-table"
                      data-desc={curso.description}
                      onClick={handleClickEliminar}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
