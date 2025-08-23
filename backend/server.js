require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(express.json());
app.use(cors());

const adminPassword = process.env.ADMIN_PASSWORD;


// Test
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend y DB listos 🚀" });
});

// Verificar contraseña
app.post("/api/admin/check", (req, res) => {
  const { password } = req.body;
  if (password === adminPassword) return res.json({ ok: true });
  return res.status(403).json({ error: "Contraseña incorrecta" });
});

// Middleware para admin
function checkAdmin(req, res, next) {
  const { password } = req.body;
  if (!password || password !== adminPassword) {
    return res.status(403).json({ error: "Contraseña incorrecta" });
  }
  next();
}

// Normalizar placa
function normalizePlate(plate) {
  return String(plate || "")
    .toUpperCase()
    .replace(/[^A-Z0-9-]/g, "")
    .slice(0, 7);
}

// Obtener visitas
app.get("/api/visits", (req, res) => {
  try {
    const raw = (req.query.plate || "").trim();
    if (raw) {
      const normalizedPlate = normalizePlate(raw);
      const stmt = db.prepare(`
        SELECT id, plate, visit_date, service, product, created_at
        FROM visits
        WHERE plate = ?
        ORDER BY visit_date DESC, id DESC
      `);
      const visits = stmt.all(normalizedPlate);
      return res.json(visits);
    } else {
      const stmt = db.prepare(`
        SELECT id, plate, visit_date, service, product, created_at
        FROM visits
        ORDER BY visit_date DESC, id DESC
      `);
      const visits = stmt.all();
      return res.json(visits);
    }
  } catch (err) {
    console.error("ERROR AL OBTENER VISITAS:", err);
    return res.status(500).json({ error: "Error al obtener visitas" });
  }
});

// Crear visita (admin)
app.post("/api/visits", checkAdmin, (req, res) => {
  try {
    let { plate, visit_date, service, product } = req.body;
    if (!plate || !visit_date || !service || !product) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    plate = normalizePlate(plate);

    const stmt = db.prepare(`
      INSERT INTO visits (plate, visit_date, service, product)
      VALUES (?, ?, ?, ?)
    `);
    const info = stmt.run(plate, visit_date, String(service).trim(), String(product).trim());
    return res.json({ message: "Visita creada correctamente", visitId: info.lastInsertRowid });
  } catch (err) {
    console.error("ERROR AL CREAR VISITA:", err);
    return res.status(500).json({ error: "Error al crear la visita" });
  }
});

// Editar visita
app.put("/api/visits/:id", checkAdmin, (req, res) => {
  try {
    const { id } = req.params;
    let { plate, visit_date, service, product } = req.body;
    if (!plate || !visit_date || !service || !product) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    plate = normalizePlate(plate);

    const stmt = db.prepare(`
      UPDATE visits
      SET plate = ?, visit_date = ?, service = ?, product = ?
      WHERE id = ?
    `);
    const info = stmt.run(plate, visit_date, String(service).trim(), String(product).trim(), id);

    if (info.changes === 0) {
      return res.status(404).json({ error: "Visita no encontrada" });
    }

    return res.json({ message: "Visita editada correctamente" });
  } catch (err) {
    console.error("ERROR AL EDITAR VISITA:", err);
    return res.status(500).json({ error: "Error al editar visita" });
  }
});

// Eliminar visita
app.delete("/api/visits/:id", checkAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const stmt = db.prepare(`DELETE FROM visits WHERE id = ?`);
    const info = stmt.run(id);

    if (info.changes === 0) {
      return res.status(404).json({ error: "Visita no encontrada" });
    }

    return res.json({ message: "Visita eliminada correctamente" });
  } catch (err) {
    console.error("ERROR AL ELIMINAR VISITA:", err);
    return res.status(500).json({ error: "Error al eliminar visita" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API on :${PORT}`);
});
