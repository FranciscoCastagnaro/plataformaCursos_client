import './styles/cursocard.css'

export const CursoCard = ({
  descripcion,
  categoria,
  vacantesDisponibles,
  vacantesTotales,
  fechaInicio,
  profesor,
}) => {
  return (
    <div className="curso-card">
      <h3 className="curso-titulo">{descripcion}</h3>
      <p className="curso-categoria">Categoría: {categoria}</p>
      <p className="curso-profesor">Instructor: {profesor}</p>
      <p className="curso-fecha">Fecha de inicio: {fechaInicio}</p>
      <div className="curso-vacantes">
        <p>
          Vacantes: {vacantesDisponibles}/{vacantesTotales}
        </p>
      </div>
    </div>
  );
};
