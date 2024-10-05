import './styles/navbar.css'

export const Navbar = () => {

    return (
        <nav className="navbar">
            <div className="logo">
                <img src="src\assets\logoblanco.png" alt="logo-navbar" />
                <p>Course Commerce</p>
            </div>
            <div>
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>
            </div>
        </nav>
    );

};
