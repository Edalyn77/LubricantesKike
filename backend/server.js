// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Visit = require("./db");

const app = express();

// URL del frontend
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(express.json());

// Configuración CORS para frontend en Render
app.use(cors({
  origin: frontendUrl,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

// Permitir preflight requests
app.options("*", cors({
  origin: frontendUrl,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

// Contraseña de administrador desde .env
const adminPassword = process.env.ADMIN_PASSWORD;
if (!adminPassword)
  console.warn("⚠️ WARNING: ADMIN_PASSWORD no está definida en .env");

// Middleware para verificar contraseña de admin
function checkAdmin(req, res, next) {
  const { password } = req.body;
  if (!password || password !== adminPassword) {
    return res.status(403).json({ error: "Contraseña incorrecta" });
  }
  next();
}

// Normaliza las patentes (mayúsculas, sin espacios, solo letras/números/guion)
function normalizePlate(plate) {
  return String(plate || "")
    .toUpperCase()
    .replace(/[^A-Z0-9-]/g, "")
    .slice(0, 8);
}

// Ruta de prueba
app.get("/api/test", (req, res) => {
  res.json({ message: "✅ Backend y MongoDB funcionando correctamente" });
});

// Verifica si la contraseña de admin es correcta
app.post("/api/admin/check", (req, res) => {
  const { password } = req.body;
  if (password === adminPassword) return res.json({ ok: true });
  return res.status(403).json({ error: "Contraseña incorrecta" });
});

// Obtiene todas las visitas o busca por placa
app.get("/api/visits", async (req, res) => {
  try {
    const raw = (req.query.plate || "").trim();
    let visits;

    if (raw) {
      const normalized = normalizePlate(raw);
      visits = await Visit.find({ plate: normalized }).sort({ visit_date: -1, _id: -1 });
    } else {
      visits = await Visit.find().sort({ visit_date: -1, _id: -1 });
    }

    res.json(visits);
  } catch (err) {
    console.error("❌ ERROR AL OBTENER VISITAS:", err);
    res.status(500).json({ error: "Error al obtener visitas" });
  }
});

// Crea una nueva visita
app.post("/api/visits", checkAdmin, async (req, res) => {
  try {
    let { plate, visit_date, service, product } = req.body;

    if (!plate || !visit_date || !service) {
      return res.status(400).json({ error: "Placa, fecha y servicio son obligatorios" });
    }

    plate = normalizePlate(plate);
    service = String(service).trim();
    product = product && String(product).trim() !== "" ? String(product) : null;

    const newVisit = new Visit({ plate, visit_date, service, product });
    await newVisit.save();

    res.json({ message: "Visita creada correctamente", visit: newVisit });
  } catch (err) {
    console.error("❌ ERROR AL CREAR VISITA:", err);
    res.status(500).json({ error: "Error al crear la visita" });
  }
});

// Edita una visita existente
app.put("/api/visits/:id", checkAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    let { plate, visit_date, service, product } = req.body;

    if (!plate || !visit_date || !service) {
      return res.status(400).json({ error: "Placa, fecha y servicio son obligatorios" });
    }

    plate = normalizePlate(plate);
    service = String(service).trim();
    product = product && String(product).trim() !== "" ? String(product) : null;

    const updated = await Visit.findByIdAndUpdate(
      id,
      { plate, visit_date, service, product },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Visita no encontrada" });

    res.json({ message: "Visita editada correctamente", visit: updated });
  } catch (err) {
    console.error("❌ ERROR AL EDITAR VISITA:", err);
    res.status(500).json({ error: "Error al editar visita" });
  }
});

// Elimina una visita
app.delete("/api/visits/:id", checkAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Visit.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ error: "Visita no encontrada" });

    res.json({ message: "Visita eliminada correctamente" });
  } catch (err) {
    console.error("❌ ERROR AL ELIMINAR VISITA:", err);
    res.status(500).json({ error: "Error al eliminar visita" });
  }
});

// Inicia el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
