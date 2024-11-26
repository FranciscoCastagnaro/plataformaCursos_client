import "./styles/carritosection.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const MisCursosSection = () => {
  const user = useSelector((state) => state.user);
  const [cursos, setCursos] = useState([]);
  const URL = "http://localhost:4002";
  const CART_ENDPOINT = `${URL}/cart`;

  function transformarFecha(fecha) {
    const year = fecha.substring(0, 4);
    const month = fecha.substring(4, 6);
    const day = fecha.substring(6, 8);
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    if (!user) return;

    const token = user.token;
    const userId = user.userId;

    fetch(`${CART_ENDPOINT}/confirmed/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          setCursos([]);
        }
        return response.json();
      })
      .then((data) => {
        setCursos(data);
      })
      .catch((error) => {
        console.error("Hubo un error:", error);
        setCursos([]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  
  if (!user)
    return (
      <section className="carrito-section-unauthorized">
        <p>Para ver tus cursos, debes iniciar sesión</p>
      </section>
    );

  return (
    <section className="carrito-section">
      <div className="carrito-heading">
        <h2>Mis Cursos</h2>
      </div>

      {cursos.length > 0 ? (
        <div className="carrito-table-container">
          <table className="carrito-table">
            <thead>
              <tr>
                <th>Curso</th>
                <th>Categoría</th>
                <th>Profesor</th>
                <th>Fecha de Inicio</th>
              </tr>
            </thead>
            <tbody>
              {cursos.map((curso) => (
                <tr key={curso.id}>
                  <td>{curso.description}</td>
                  <td>{curso.category.description}</td>
                  <td>{curso.teacher}</td>
                  <td>{transformarFecha(curso.startDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="carrito-empty">No tenes cursos adquiridos</div>
      )}
    </section>
  );
};
