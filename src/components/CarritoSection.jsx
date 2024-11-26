import "./styles/carritosection.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const CarritoSection = () => {
  const user = useSelector((state) => state.user);
  const [cursos, setCursos] = useState([]);
  const URL = "http://localhost:4002";
  const CART_ENDPOINT = `${URL}/cart`;

  useEffect(() => {
    if (!user) return;

    const token = user.token;
    const userId = user.userId;

    fetch(`${CART_ENDPOINT}/${userId}`, {
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
        data.message === "Cart not found"
          ? setCursos([])
          : setCursos(data.courses);
      })
      .catch((error) => {
        console.error("Hubo un error:", error);
        setCursos([]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleEliminar = (cursoId) => {
    if (!user) return;

    const token = user.token;
    const userId = user.userId;

    fetch(`${CART_ENDPOINT}/remove/${userId}/${cursoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al eliminar el curso");
        }
        return response.json();
      })
      .then(() => {
        setCursos((prevCursos) =>
          prevCursos.filter((curso) => curso.id !== cursoId)
        );
        alert("Curso eliminado del carrito.");
      })
      .catch((error) => {
        console.error("Hubo un error:", error);
        alert("No se pudo eliminar el curso.");
      });
  };

  const handlePagar = (e) => {
    e.preventDefault();
    if (!user) return;

    const token = user.token;
    const userId = user.userId;

    fetch(`${CART_ENDPOINT}/confirm/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al realizar la compra");
        }
        return response.json();
      })
      .then(() => {
        setCursos([]);
        alert("Compra realizada con éxito.");
      })
      .catch((error) => {
        console.error("Hubo un error:", error);
        alert("No se pudo realizar la compra.");
      });
  };

  if (!user)
    return (
      <section className="carrito-section-unauthorized">
        <p>Para ver el carrito, debes iniciar sesión</p>
      </section>
    );

  return (
    <section className="carrito-section">
      <div className="carrito-heading">
        <h2>Mi Carrito</h2>
      </div>

      {cursos.length > 0 ? (
        <div className="carrito-table-container">
          <table className="carrito-table">
            <thead>
              <tr>
                <th>Curso</th>
                <th>Categoría</th>
                <th>Profesor</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cursos.map((curso) => (
                <tr key={curso.id}>
                  <td>{curso.description}</td>
                  <td>{curso.category.description}</td>
                  <td>{curso.teacher}</td>
                  <td>
                    $
                    {curso.discount
                      ? curso.maxSlots * (curso.discount / 100)
                      : curso.maxSlots}
                  </td>
                  <td>
                    <button
                      className="btn-eliminar"
                      onClick={() => handleEliminar(curso.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="carrito-empty">Tu carrito está vacío</div>
      )}

      <div className="checkout-form">
        <h3>Información de Pago</h3>
        <form onSubmit={handlePagar}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo</label>
            <input type="text" id="nombre" placeholder="Ingresa tu nombre" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input type="email" id="email" placeholder="Ingresa tu correo" />
          </div>
          <div className="form-group">
            <label htmlFor="metodo-pago">Método de Pago</label>
            <select id="metodo-pago">
              <option value="tarjeta">Tarjeta de Crédito/Débito</option>
              <option value="mpago">Mercado Pago</option>
              <option value="transferencia">Transferencia Bancaria</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="direccion">Dirección de Facturación</label>
            <input
              type="text"
              id="direccion"
              placeholder="Ingresa tu dirección"
            />
          </div>
          <button type="submit" disabled={cursos.length == 0} className="btn-checkout">
            Realizar Pago
          </button>
        </form>
      </div>
    </section>
  );
};
