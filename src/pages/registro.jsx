import { useState } from "react";

export default function Registro() {
  const [form, setForm] = useState({
    name: "",
    dni: "",
    plate: "",
    visitDate: "",
  });

  const [message, setMessage] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL; 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${backendUrl}/api/visits`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMessage("✅ Visita registrada con éxito");
        setForm({ name: "", dni: "", plate: "", visitDate: "" });
      } else {
        setMessage("❌ Error al registrar visita");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ No se pudo conectar con el servidor");
    }
  };

  return (
    <div>
      <h2>Registrar Visita</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="dni"
          placeholder="DNI"
          value={form.dni}
          onChange={handleChange}
        />
        <input
          type="text"
          name="plate"
          placeholder="Patente"
          value={form.plate}
          onChange={handleChange}
        />
        <input
          type="date"
          name="visitDate"
          value={form.visitDate}
          onChange={handleChange}
        />
        <button type="submit">Registrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
