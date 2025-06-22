import '../styles/marcas.css';

import castrol from '../assets/marcasAceites/castrol.png';
import chevron from '../assets/marcasAceites/chevron.png';
import hyundai from '../assets/marcasAceites/hyundai.png';
import mobil from '../assets/marcasAceites/mobil.png';
import repsol from '../assets/marcasAceites/repsol.png';
import shell from '../assets/marcasAceites/shell.png';
import toyota from '../assets/marcasAceites/toyota.png';

import daruma from '../assets/marcasFiltros/daruma.png';
import seineca from '../assets/marcasFiltros/seineca.png';
import lys from '../assets/marcasFiltros/lys.png';

const Marcas = () => {
  return (
    <section className="marcas" id="marcas">
       <div className="marcas-header">
        <h1>Marcas con las que trabajamos</h1>
        <p>
          En nuestro lavadero confiamos únicamente en las mejores marcas del mercado. Sabemos que la calidad de los productos que usamos impacta directamente en el rendimiento y la vida útil de tu vehículo. Por eso, elegimos cuidadosamente nuestros proveedores, priorizando aquellos con trayectoria, respaldo técnico y reconocimiento internacional. Cada marca con la que trabajamos ha sido seleccionada para garantizarte confianza, rendimiento y excelencia en cada servicio.
        </p>
      </div>

      <div className="categoria">
        <h2>Aceites</h2>
        <div className="grid-marcas">
          {[castrol, mobil, chevron, hyundai, shell ,repsol, toyota].map((img, i) => (
            <img key={i} src={img} alt={`aceite-${i + 1}`} />
          ))}
        </div>
      </div>

      <div className="categoria">
        <h2>Filtros</h2>
        <div className="grid-marcas">
          {[toyota, lys, daruma, seineca].map((img, i) => (
            <img key={i} src={img} alt={`filtro-${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marcas;
