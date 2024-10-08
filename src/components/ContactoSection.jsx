import "./styles/contactosection.css";

export const ContactoSection = () => {
  return (
    <section className="contacto-section">
      <div className="contacto-info">
        <h2>Estamos aquí para ayudarte</h2>
        <p>
          En Course Commerce, valoramos tu experiencia. Si tienes preguntas,
          comentarios o necesitas asistencia, no dudes en ponerte en contacto
          con nosotros.
        </p>
      </div>
      <form className="form-contacto">
        <label htmlFor="nombre-completo">Nombre completo:</label>
        <input type="text" name="nombre-completo" />
        <label htmlFor="correo">Correo electrónico:</label>
        <input type="email" name="correo" />
        <label htmlFor="asunto">Asunto:</label>
        <input type="text" name="asunto" />
        <label htmlFor="mensaje">Mensaje:</label>
        <textarea name="mensaje"></textarea>
        <label htmlFor="recibir-actualizaciones">
          Quiero recibir actualizaciones y ofertas especiales de Course
          Commerce.
        </label>
        <input type="checkbox" name="recibir-actualizaciones"/>
        <br />
        <button type="submit">Enviar</button>
      </form>
      <div className="contacto-info">
        <h2>Contáctanos directamente</h2>
        <ul>
            <li><span>Correo electrónico:</span> soporte@coursecommerce.com</li>
            <li><span>Teléfono:</span> +54 123 456 789</li>
            <li><span>Horario de atención:</span> Lunes a Viernes, 9:00 AM - 6:00 PM (GMT -3)</li>
        </ul>
      </div>
    </section>
  );
};
