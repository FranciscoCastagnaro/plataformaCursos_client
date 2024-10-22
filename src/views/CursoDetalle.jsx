import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CursoDetalleSection } from "../components/CursoDetalleSection";

export const CursoDetalle = (curso) => {
  return (
    <>
      <Navbar />
      <CursoDetalleSection
        curso={curso && Object.keys(curso).length > 0 ? curso : null}
      />
      <Footer />
    </>
  );
};
