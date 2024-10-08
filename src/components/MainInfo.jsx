import "./styles/maininfo.css";
import maininfostock1 from "/src/assets/maininfostock1.jpg";
import maininfostock2 from "/src/assets/maininfostock2.jpg";

export const MainInfo = () => {
  return (
    <section className="infoSection">
      <div className="info">
        <div className="textInfo">
          <h4>
            Aprende a tu ritmo, <span>en cualquier lugar</span>
          </h4>
          <p>
            Ya sea que busques mejorar en tu carrera, aprender algo nuevo o
            desarrollar un hobby. Ofrecemos flexibilidad total con acceso 24/7
            para que puedas aprender a tu manera, cuando te convenga.
          </p>
        </div>
        <img
          src={maininfostock1}
          loading="lazy"
          alt="course stock image teacher 1"
        />
      </div>
      <div className="info">
        <img
          src={maininfostock2}
          loading="lazy"
          alt="course stock image teacher 2"
        />
        <div className="textInfo">
          <h4>
            Más que un curso, <span>una experiencia de aprendizaje</span>
          </h4>
          <p>
            Nuestros cursos no solo enseñan, transforman. Con herramientas
            interactivas y proyectos prácticos, aprenderás aplicando tus
            conocimientos desde el primer día.
          </p>
        </div>
      </div>
    </section>
  );
};
