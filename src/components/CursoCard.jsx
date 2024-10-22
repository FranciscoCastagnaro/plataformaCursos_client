import "./styles/cursocard.css";
import { useNavigate } from "react-router-dom";

export const CursoCard = ({
  descripcion,
  descripcionLarga,
  categoria,
  vacantesDisponibles,
  vacantesTotales,
  fechaInicio,
  profesor,
  descuento,
}) => {
  const navigate = useNavigate();

  function transformarFecha(fecha) {
    const year = fecha.substring(0, 4);
    const month = fecha.substring(4, 6);
    const day = fecha.substring(6, 8);
    return `${day}/${month}/${year}`;
  }

  const handleClick = () => {
    navigate("/detalle", {
      state: {
        descripcion,
        descripcionLarga,
        categoria,
        vacantesDisponibles,
        vacantesTotales,
        fechaInicio,
        profesor,
      },
    });
  };

  return (
    <div className="curso-card" onClick={handleClick}>
      <div className="card-left"></div>
      <h3 className="curso-titulo">{descripcion}</h3>
      <p className="curso-categoria">Categoría: {categoria}</p>
      <p className="curso-profesor">Instructor: {profesor}</p>
      <p className="curso-fecha">
        Fecha de inicio: {transformarFecha(fechaInicio)}
      </p>
      {descuento != 0 && (
        <p className="curso-descuento">{descuento}% de descuento!</p>
      )}
      <div className="curso-vacantes">
        <p>
          Vacantes: {vacantesDisponibles}/{vacantesTotales}
        </p>
      </div>
    </div>
  );
};
