// db.js
// ========================
// Conexión a MongoDB Atlas (reemplaza a SQLite)

require("dotenv").config();
const mongoose = require("mongoose");

// URI desde .env
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ ERROR: MONGODB_URI no está definida en el archivo .env");
  process.exit(1);
}

// Conexión a MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => {
    console.error("❌ Error al conectar a MongoDB:", err);
    process.exit(1);
  });

// Esquema de la colección "visits"
const visitSchema = new mongoose.Schema({
  plate: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    match: [
      /^[A-Z0-9-]{2,8}$/,
      "Formato de placa inválido (solo letras, números y guion)",
    ],
  },
  visit_date: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^\d{4}-\d{2}-\d{2}$/.test(v),
      message: "Fecha inválida (debe ser YYYY-MM-DD)",
    },
  },
  service: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  product: {
    type: String,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Modelo
const Visit = mongoose.model("Visit", visitSchema);

module.exports = Visit;
