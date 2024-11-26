import { useLocation } from "react-router-dom";
import "./styles/cursodetallesection.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import courseimage from "/src/assets/curso-foto-ejemplo.png";

export const CursoDetalleSection = () => {
  const { state } = useLocation();
  const curso = state;
  const loggedIn = useSelector((state) => state.user);
  const URL = "http://localhost:4002";
  const CART_ENDPOINT = `${URL}/cart`;
  const [cursoInCart, setCursoInCart] = useState(false);

  useEffect(() => {
    if (!loggedIn) return;

    const token = loggedIn.token;
    const userId = loggedIn.userId;

    fetch(`${CART_ENDPOINT}/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Error");
          return;
        }
        return response.json();
      })
      .then((data) => {
        const courses = data.courses;
        console.log(courses);
        const isCourseInCart = courses.some(
          (course) => course.description === curso.descripcion
        );
        setCursoInCart(isCourseInCart);
      })
      .catch((error) => {
        console.error("Hubo un error:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  if (!curso)
    return (
      <section className="cursodetallesection">
        No se indicó ningún curso.
      </section>
    );

  function transformarFecha(fecha) {
    const year = fecha.substring(0, 4);
    const month = fecha.substring(4, 6);
    const day = fecha.substring(6, 8);
    return `${day}/${month}/${year}`;
  }

  const descripcion = curso.descripcion;
  const descripcionLarga = curso.descripcionLarga;
  const categoria = curso.categoria;
  const vacantesDisponibles = curso.vacantesDisponibles;
  const vacantesTotales = curso.vacantesTotales;
  const fechaInicio = transformarFecha(curso.fechaInicio);
  const profesor = curso.profesor;

  const handleAgregarAlCarro = () => {
    const token = loggedIn.token;
    const username = loggedIn.username;

    fetch(`${CART_ENDPOINT}/add`, {
      method: "POST",
      body: JSON.stringify({
        course: curso.descripcion,
        username,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return "Curso ya adquirido";
        }
        return response.json();
      })
      .then((data) => {
        if (data == "Curso ya adquirido") {
          alert(data);
        } else {
          alert("Curso añadido al carrito.");
          setCursoInCart(true);
        }
      })
      .catch((error) => {
        console.error("Hubo un error:", error);
      });
  };

  return (
    <section className="cursodetallesection">
      <div className="curso-detalle-panel">
        <div className="panel-left">
          <h2 className="curso-titulo-detalle">{descripcion}</h2>
          <p className="curso-descripcion-detalle">
            <strong>Descripción:</strong> {descripcionLarga}
          </p>
          <p className="curso-categoria-detalle">
            <strong>Categoría:</strong> {categoria}
          </p>
          <p className="curso-profesor-detalle">
            <strong>Instructor:</strong> {profesor}
          </p>
          <p className="curso-fecha-detalle">
            <strong>Fecha de inicio:</strong> {fechaInicio}
          </p>
          <p className="curso-vacantes-detalle">
            <strong>Vacantes:</strong> {vacantesDisponibles}/{vacantesTotales}
          </p>
          {loggedIn && (
            <button
              onClick={handleAgregarAlCarro}
              className={`curso-carro`}
              disabled={cursoInCart}
            >
              {cursoInCart ? "Añadido al carrito" : "Añadir al carrito"}
            </button>
          )}
        </div>
        <div className="panel-right">
          <img src={courseimage} alt="course-image" />
        </div>
      </div>
    </section>
  );
};
