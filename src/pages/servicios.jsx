import '../styles/servicios.css';
import Niveles from "../assets/servicios/niveles.png"
import Aceite from "../assets/servicios/aceite.png"
import Filtro from "../assets/servicios/filtro.png"
import Refrigerante from "../assets/servicios/refrigerante.png"

const servicios = [
  {
    titulo: "Revisión de niveles",
    descripcion: "Controlamos el nivel de aceite, líquido refrigerante, frenos y limpiaparabrisas para garantizar el correcto funcionamiento del vehículo.",
    imagen: Niveles
  },
  {
    titulo: "Cambio de refrigerante",
    descripcion: "Realizamos el drenado y reemplazo del líquido refrigerante para prevenir el sobrecalentamiento del motor.",
    imagen: Refrigerante
  },
  {
    titulo: "Cambio de filtro",
    descripcion: "Sustituimos los filtros de aire, aceite y combustible para mantener el motor limpio y eficiente.",
    imagen: Filtro
  },
  {
    titulo: "Cambio de aceite",
    descripcion: "Reemplazamos el aceite del motor utilizando productos de calidad que prolongan la vida útil del vehículo.",
    imagen: Aceite
  }
];

const Servicios = () => {
  return (
    <section className="servicios" id="servicios">
      <h1>Servicios que proporcionamos</h1>
      <div className="servicios-container">
        {servicios.map((servicio, index) => (
          <div className="card-servicio" key={index}>
            <div className="card-imagen">
              <img src={servicio.imagen} alt={servicio.titulo} />
            </div>
            <div className="card-texto">
              <h3>{servicio.titulo}</h3>
              <p>{servicio.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Servicios;