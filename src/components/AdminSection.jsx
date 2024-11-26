import { useState, useEffect } from "react";
import "./styles/adminsection.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const AdminSection = () => {
  const [cursos, setCursos] = useState([]);
  const [descuentos, setDescuentos] = useState({});
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const loggedIn = useSelector((state) => state.user);
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
          setCursos([]);
        }
        return response.json();
      })
      .then((data) => {
        setCursos(data);
        const initialDiscounts = data.reduce((acc, curso) => {
          acc[curso.description] = "";
          return acc;
        }, {});
        setDescuentos(initialDiscounts);
      })
      .catch((error) => {
        console.error("Hubo un error:", error);
        setCursos([]);
      });
  }, [shouldUpdate]);

  const handleChangeDescuento = (description, value) => {
    setDescuentos((prev) => ({
      ...prev,
      [description]: value,
    }));
  };

  const handleClickCrear = () => {
    navigate("/admin/crear", {
      state: {},
    });
  };

  const handleClickEliminar = (description) => {
    fetch(COURSES_ENDPOINT, {
      method: "DELETE",
      body: JSON.stringify({
        description,
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
      .then(() => {
        alert("Curso eliminado con éxito");
        setShouldUpdate((prev) => !prev);
      })
      .catch((error) => {
        console.error("Hubo un error:", error);
        setCursos([]);
      });
  };

  const handleClickDescuento = (description) => {
    const descuento = descuentos[description];
    if (!descuento) {
      alert("Por favor, ingresa un descuento válido");
      return;
    }

    fetch(DISCOUNT_ENDPOINT, {
      method: "PUT",
      body: JSON.stringify({
        description,
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
      .then(() => {
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

  if (!loggedIn)
    return (
      <section className="adminsection-unauthorized">
        <p>Para ver el panel de administrador, debes iniciar sesión</p>
      </section>
    );

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
            {cursos.map((curso) => (
              <tr key={curso.description}>
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
                    value={descuentos[curso.description] || ""}
                    onChange={(e) =>
                      handleChangeDescuento(curso.description, e.target.value)
                    }
                  />
                  <button
                    className="btn-descuento"
                    onClick={() => handleClickDescuento(curso.description)}
                  >
                    Aplicar
                  </button>
                </td>
                <td className="td-acciones">
                  <button
                    className="btn-table"
                    onClick={() => handleClickEditar(curso)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-table"
                    onClick={() => handleClickEliminar(curso.description)}
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
