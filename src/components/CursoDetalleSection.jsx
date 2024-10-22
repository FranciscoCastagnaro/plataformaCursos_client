import { useLocation } from "react-router-dom";
import "./styles/cursodetallesection.css";

export const CursoDetalleSection = () => {
  const { state } = useLocation();
  const curso = state;

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
        </div>
      </div>
    </section>
  );
};
