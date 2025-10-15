require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Visit = require("./db");

const app = express();

// URL del frontend sin slash final
const frontendUrl = process.env.FRONTEND_URL?.replace(/\/$/, "") || "http://localhost:5173";

const corsOptions = {
  origin: frontendUrl,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.options("*", cors(corsOptions));

// Contraseña de administrador desde .env
const adminPassword = process.env.ADMIN_PASSWORD;
if (!adminPassword) console.warn("⚠️  WARNING: ADMIN_PASSWORD no está definida en .env");

// Middleware admin
function checkAdmin(req, res, next) {
  const { password } = req.body;
  if (!password || password !== adminPassword) {
    return res.status(403).json({ error: "Contraseña incorrecta" });
  }
  next();
}

// Normaliza patentes
function normalizePlate(plate) {
  return String(plate || "").toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 8);
}

// Rutas CRUD y test (igual que tu versión anterior)
app.get("/api/test", (req, res) => res.json({ message: "✅ Backend y MongoDB funcionando correctamente" }));
app.post("/api/admin/check", (req, res) => {
  const { password } = req.body;
  if (password === adminPassword) return res.json({ ok: true });
  return res.status(403).json({ error: "Contraseña incorrecta" });
});
app.get("/api/visits", async (req, res) => {
  try {
    const raw = (req.query.plate || "").trim();
    const visits = raw
      ? await Visit.find({ plate: normalizePlate(raw) }).sort({ visit_date: -1, _id: -1 })
      : await Visit.find().sort({ visit_date: -1, _id: -1 });
    res.json(visits);
  } catch (err) {
    console.error("❌ ERROR AL OBTENER VISITAS:", err);
    res.status(500).json({ error: "Error al obtener visitas" });
  }
});
app.post("/api/visits", checkAdmin, async (req, res) => {
  try {
    let { plate, visit_date, service, product } = req.body;
    if (!plate || !visit_date || !service)
      return res.status(400).json({ error: "Placa, fecha y servicio son obligatorios" });
    const newVisit = new Visit({
      plate: normalizePlate(plate),
      visit_date,
      service: String(service).trim(),
      product: product && String(product).trim() !== "" ? String(product) : null,
    });
    await newVisit.save();
    res.json({ message: "Visita creada correctamente", visit: newVisit });
  } catch (err) {
    console.error("❌ ERROR AL CREAR VISITA:", err);
    res.status(500).json({ error: "Error al crear la visita" });
  }
});
app.put("/api/visits/:id", checkAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    let { plate, visit_date, service, product } = req.body;
    if (!plate || !visit_date || !service)
      return res.status(400).json({ error: "Placa, fecha y servicio son obligatorios" });
    const updated = await Visit.findByIdAndUpdate(
      id,
      {
        plate: normalizePlate(plate),
        visit_date,
        service: String(service).trim(),
        product: product && String(product).trim() !== "" ? String(product) : null,
      },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Visita no encontrada" });
    res.json({ message: "Visita editada correctamente", visit: updated });
  } catch (err) {
    console.error("❌ ERROR AL EDITAR VISITA:", err);
    res.status(500).json({ error: "Error al editar visita" });
  }
});
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
