import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navBar.css';
import Logo from "../assets/LogoLavaderoRender.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);
  const cerrarMenu = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-content">
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>

        <div className="logo">
          <Link to="/" onClick={cerrarMenu}>
            <img src={Logo} alt="LogoLavadero" />
          </Link>
        </div>
      </div>

      <nav className={`nav-links ${open ? 'open' : ''}`}>
        <Link to="/servicios" onClick={cerrarMenu}>Nuestros Servicios</Link>
        <Link to="/marcas" onClick={cerrarMenu}>Marcas con las que trabajamos</Link>
        <Link to="/registro" onClick={cerrarMenu}>Registro de visitas</Link>
        <Link to="/contacto" onClick={cerrarMenu}>Contacto</Link>
        <Link to="/galeria" onClick={cerrarMenu}>Galería</Link>
      </nav>
    </header>
  );
};

export default Navbar;
