// db.js
// ========================
// Conexión a SQLite y creación de tabla "visits"

const Database = require("better-sqlite3");

// Abro (o creo) el archivo lavadero.db en la carpeta backend
const db = new Database("lavadero.db");

// Creo la tabla si no existe
db.exec(`
  CREATE TABLE IF NOT EXISTS visits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plate TEXT NOT NULL
      CHECK(plate = TRIM(UPPER(plate)))
      CHECK(
        -- Patrones de placas peruanas comunes
        plate GLOB '[A-Z][A-Z][A-Z]-[0-9][0-9][0-9]'      -- ABC-123
        OR plate GLOB '[A-Z][A-Z][0-9]-[0-9][0-9][0-9]'   -- AB1-234
        OR plate GLOB '[A-Z][0-9][A-Z]-[0-9][0-9][0-9]'   -- A1B-234
        OR plate GLOB '[A-Z][A-Z]-[0-9][0-9][0-9][0-9]'   -- AB-1234 (motos)
      ),
    visit_date TEXT NOT NULL
      CHECK (length(visit_date) = 10 AND date(visit_date) IS NOT NULL), -- YYYY-MM-DD
    service TEXT NOT NULL CHECK (length(TRIM(service)) >= 2),
    product TEXT NOT NULL CHECK (length(TRIM(product)) >= 2),
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_visits_plate_date
    ON visits (plate, visit_date);
`);

// Exporto la conexión para usar en otros archivos
module.exports = db;
