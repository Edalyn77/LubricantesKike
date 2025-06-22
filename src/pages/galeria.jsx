import React, { useState, useEffect } from 'react';
import "../styles/galeria.css"

import img1 from '../assets/galeria/lav1.png';
import img2 from '../assets/galeria/lav2.png';
import img3 from '../assets/galeria/lav3.png';

const imagenes = [img1, img2, img3];

const Galeria = () => {
  const [index, setIndex] = useState(0);

  const irA = (i) => setIndex(i);
  const siguiente = () => setIndex((prev) => (prev + 1) % imagenes.length);
  const anterior = () => setIndex((prev) => (prev - 1 + imagenes.length) % imagenes.length);

  // autoplay cada 4s
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagenes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="galeria" id="galeria">
      <h1>Galería</h1>
      <p>Un vistazo a nuestros trabajos y a las instalaciones. Calidad, dedicación y detalle en cada servicio.</p>

      <div className="carrusel">
        <button className="btn-carrusel izquierda" onClick={anterior}>‹</button>

        <img src={imagenes[index]} alt={`galeria-${index + 1}`} className="imagen-galeria" />

        <button className="btn-carrusel derecha" onClick={siguiente}>›</button>

        <div className="indicadores">
          {imagenes.map((_, i) => (
            <span
              key={i}
              className={`punto ${i === index ? 'activo' : ''}`}
              onClick={() => irA(i)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Galeria;