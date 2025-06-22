import '../styles/footer.css';
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-col">
          <h3>Contacto</h3>
          <p>Email: lyskike@gmail.com</p>
          <p>Teléfono: +51 969993030</p>
        </div>

        <div className="footer-col redes">
          <h3>Redes Sociales</h3>
          <a href="https://www.facebook.com/marcosarturo69?locale=es_LA" target="_blank" rel="noopener noreferrer">
            <FaFacebook /> Facebook
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <FaInstagram /> Instagram
          </a>
        </div>
      </div>
      <p className="copyright">
        &copy; 2025 Lavadero y Servicios Kike. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;
