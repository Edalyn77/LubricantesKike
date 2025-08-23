import { useState } from "react";
import "../styles/admin.css";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState("");
  const [visits, setVisits] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    plate: "",
    visit_date: "",
    service: "",
    product: "",
  });

  const [search, setSearch] = useState("");

  // Login
  const handleLogin = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setIsLogged(true);
        setToken(password);
        setPassword("");
        fetchVisits();
      } else {
        alert("Contraseña incorrecta");
      }
    } catch (err) {
      console.error(err);
      alert("Error al conectarse al backend");
    }
  };

  // Inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "plate") {
      const val = value.toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 7);
      setForm({ ...form, [name]: val });
    } else if (name === "service" || name === "product") {
      const val = value.replace(/[^A-Za-z0-9 ]/g, "").slice(0, 50);
      setForm({ ...form, [name]: val });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Crear o editar visita
  const saveVisit = async () => {
    if (!form.plate || !form.visit_date || !form.service || !form.product) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const url = editingId
        ? `${import.meta.env.VITE_BACKEND_URL}/api/visits/${editingId}`
        : `${import.meta.env.VITE_BACKEND_URL}/api/visits`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, password: token }),
      });

      if (res.ok) {
        alert(editingId ? "Visita actualizada" : "Visita creada correctamente");
        setForm({ plate: "", visit_date: "", service: "", product: "" });
        setEditingId(null);
        fetchVisits();
      } else {
        const data = await res.json();
        alert(data.error || "Error al guardar la visita");
      }
    } catch (err) {
      console.error(err);
      alert("Error al conectarse al backend");
    }
  };

  // Obtener visitas
  const fetchVisits = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/visits`);
      if (res.ok) {
        const data = await res.json();
        setVisits(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Eliminar visita
  const deleteVisit = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/visits/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: token }),
      });
      if (res.ok) {
        if (editingId === id) cancelEdit();
        fetchVisits();
      } else {
        const data = await res.json();
        alert(data.error || "Error al eliminar visita");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Editar
  const startEdit = (v) => {
    setEditingId(v.id);
    setForm({
      plate: v.plate,
      visit_date: v.visit_date,
      service: v.service,
      product: v.product,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cancelar edición
  const cancelEdit = () => {
    setEditingId(null);
    setForm({ plate: "", visit_date: "", service: "", product: "" });
  };

  // Buscador
  const handleSearchChange = (e) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 7);
    setSearch(val);
  };

  // Filtrado
  const filteredVisits = visits.filter((v) =>
    v.plate.toUpperCase().includes(search)
  );

  return (
    <div className="admin-container">
      {!isLogged ? (
        <div className="login-box">
          <h2>Login Administrador</h2>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Ingresar</button>
        </div>
      ) : (
        <div className="admin-panel">
          <h2>Panel de administración</h2>

          {/* Formulario alta / edición */}
          <div className="form">
            <input
              type="text"
              name="plate"
              placeholder="Placa (máx 7, A-Z 0-9 -)"
              value={form.plate}
              onChange={handleChange}
            />
            <input
              type="date"
              name="visit_date"
              value={form.visit_date}
              onChange={handleChange}
            />
            <input
              type="text"
              name="service"
              placeholder="Servicio"
              value={form.service}
              onChange={handleChange}
            />
            <input
              type="text"
              name="product"
              placeholder="Producto"
              value={form.product}
              onChange={handleChange}
            />

            {editingId ? (
              <div className="actions">
                <button onClick={saveVisit}>Guardar cambios</button>
                <button onClick={cancelEdit}>Cancelar</button>
              </div>
            ) : (
              <button onClick={saveVisit}>Agregar visita</button>
            )}
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Buscar por placa..."
              value={search}
              onChange={handleSearchChange}
            />
          </div>

          <h3>Visitas existentes</h3>
          <table>
            <thead>
              <tr>
                <th>Placa</th>
                <th>Fecha</th>
                <th>Servicio</th>
                <th>Producto</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisits.map((v) => (
                <tr key={v.id}>
                  <td>{v.plate}</td>
                  <td>{v.visit_date}</td>
                  <td>{v.service}</td>
                  <td>{v.product}</td>
                  <td>
                    <button onClick={() => startEdit(v)}>Editar</button>
                    <button onClick={() => deleteVisit(v.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
              {filteredVisits.length === 0 && (
                <tr>
                  <td colSpan="5">Sin resultados</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
