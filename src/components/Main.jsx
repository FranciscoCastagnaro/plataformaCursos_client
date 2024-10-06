import './styles/main.css'

export const Main = () => {
    return (
        <main className="homeMain">
            <div className="text">
                <h1>
                    Descubre tu potencial con nuestros <span>cursos de alto nivel</span>
                </h1>
                <h3>
                    Potencia tus habilidades con nuestra selección de cursos de primer nivel. 
                    Contamos con instructores expertos, listos para enseñar e inspirar a quienes desean aprender y crecer.
                </h3>
                <h4>
                    Contamos con más de 200 cursos en diversas áreas, a un <span>click</span> de distancia.
                </h4>
            </div>
            <img src={"./src/assets/collorpatternmain.png"} alt="color-pattern" />
        </main>
    )
}