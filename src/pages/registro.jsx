import { useState } from "react";
import "../styles/registro.css";

const RegistroVisitas = () => {
  const [patente, setPatente] = useState("");
  const [visitas, setVisitas] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const buscarVisitas = async () => {
    const patenteTrimmed = patente
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9-]/g, "") // Solo letras, números y guion
      .slice(0, 7); // Limitar a 7 caracteres (ej: 8806-KM)

    if (!patenteTrimmed) {
      setMensaje("Por favor ingresa tu placa.");
      setVisitas([]);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/visits?plate=${patenteTrimmed}`
      );
      if (!response.ok) throw new Error("Error en el servidor");
      const data = await response.json();

      if (data.length === 0) {
        setMensaje("No se encontraron visitas para esa placa.");
        setVisitas([]);
      } else {
        setMensaje("");
        setVisitas(data);
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error al conectar con el servidor.");
      setVisitas([]);
    }
  };

  return (
    <div className="visitas">
      <h1>Consulta tus Visitas</h1>

      <div className="inputGroup">
        <input
          type="text"
          placeholder="Ingresa tu placa (ej: 8806-KM)"
          value={patente}
          maxLength={7}
          onChange={(e) =>
            setPatente(
              e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 7)
            )
          }
        />
        <button onClick={buscarVisitas}>Buscar</button>
      </div>

      {mensaje && <p className="message">{mensaje}</p>}

      {/* Tabla escritorio */}
      {visitas.length > 0 && (
        <div className="tabla-visitas desktop-table">
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Servicio</th>
                <th>Producto</th>
              </tr>
            </thead>
            <tbody>
              {visitas.map((v) => (
                <tr key={v.id}>
                  <td>{v.visit_date}</td>
                  <td>{v.service}</td>
                  <td>{v.product || ""}</td> {/* Permitir vacío o símbolos */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Versión móvil */}
      {visitas.length > 0 && (
        <div className="mobile-table">
          {visitas.map((v) => (
            <div key={v.id} className="mobile-card">
              <p><strong>Fecha:</strong> {v.visit_date}</p>
              <p><strong>Servicio:</strong> {v.service}</p>
              <p><strong>Producto:</strong> {v.product || ""}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RegistroVisitas;
