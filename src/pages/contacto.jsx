// src/pages/Contacto.jsx
import React from 'react';
import '../styles/contacto.css';

const Contacto = () => {
  return (
    <section className="contacto" id="contacto">
      <h1>Contacto</h1>
      <p>Estamos para ayudarte. Podés acercarte a nuestro local o consultar nuestros horarios.</p>

      <div className="contacto-info">
        <div className="contacto-dato">
          <h2>📍 Dirección</h2>
          <p>Av. Los Laureles Mza. A-1 Lote 19 Urb, San Ramón - Piura</p>
        </div>

        <div className="contacto-dato">
          <h2>🕒 Horarios de atención</h2>
          <p><strong>Lunes a Viernes:</strong> 08:00 a 18:00</p>
          <p><strong>Sábados:</strong> 08:00 a 15:00</p>
          <p><strong>Domingos y Feriados:</strong> 08:00 a 13:00</p>
        </div>

        <div className="contacto-dato mapa">
          <h3>📌 ¿Dónde estamos?</h3>
          <div className="mapa-container">
            <iframe
              title="Ubicación Lavadero"
              src="https://www.google.com/maps?q=-5.183342485745371, -80.6395440374274&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
             href="https://www.google.com/maps?q=-5.183342485745371, -80.6395440374274"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-maps">Abrir en Google Maps
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
