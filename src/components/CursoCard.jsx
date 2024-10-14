import "./styles/cursocard.css";

export const CursoCard = ({
  descripcion,
  categoria,
  vacantesDisponibles,
  vacantesTotales,
  fechaInicio,
  profesor,
}) => {

  function transformarFecha(fecha) {
    const year = fecha.substring(0, 4);
    const month = fecha.substring(4, 6);
    const day = fecha.substring(6, 8);
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="curso-card">
      <h3 className="curso-titulo">{descripcion}</h3>
      <p className="curso-categoria">Categoría: {categoria}</p>
      <p className="curso-profesor">Instructor: {profesor}</p>
      <p className="curso-fecha">Fecha de inicio: {transformarFecha(fechaInicio)}</p>
      <div className="curso-vacantes">
        <p>
          Vacantes: {vacantesDisponibles}/{vacantesTotales}
        </p>
      </div>
    </div>
  );
};
