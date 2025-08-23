import React, { useState, useEffect } from 'react';
import "../styles/galeria.css";

import img1 from '../assets/galeria/lav1.png';
import img2 from '../assets/galeria/lav2.png';
import img3 from '../assets/galeria/lav3.png';
import img4 from '../assets/galeria/lav4.png';
import img5 from '../assets/galeria/lav5.png';
import img6 from '../assets/galeria/lav6.png';
import img7 from '../assets/galeria/lav7.png';

const imagenes = [img1, img2, img3, img4, img5, img6, img7];

const Galeria = () => {
  const [index, setIndex] = useState(0);

  const siguiente = () => setIndex((prev) => (prev + 1) % imagenes.length);
  const anterior = () => setIndex((prev) => (prev - 1 + imagenes.length) % imagenes.length);
  const irA = (i) => setIndex(i);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagenes.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="galeria" id="galeria">
      <h1>Galería</h1>
      <p>Un vistazo a nuestros trabajos y a las instalaciones. Calidad, dedicación y detalle en cada servicio.</p>

      <div className="carrusel">
        <button className="btn-carrusel izquierda" onClick={anterior}>‹</button>

        <div className="carrusel-ventana">
          <div
            className="carrusel-slider"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {imagenes.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`galeria-${i + 1}`}
                className="imagen-slide"
              />
            ))}
          </div>
        </div>

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
