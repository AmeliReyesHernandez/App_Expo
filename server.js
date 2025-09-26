const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MySQL
const db = mysql.createConnection({
  host: "192.168.0.103",  
  user: "root",         
  password: "1312",
  database: "AppConexion"
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error(" Error al conectar a MySQL:", err);
  } else {
    console.log(" Conectado a la base de datos MySQL");
  }
});

// Crear publicación
app.post("/posts", (req, res) => {
  const { titulo, descripcion, categoria, imagen } = req.body;
  const query = "INSERT INTO publicaciones (titulo, descripcion, categoria, imagen) VALUES (?, ?, ?, ?)";
  db.query(query, [titulo, descripcion, categoria, imagen], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Publicación creada", id: result.insertId });
  });
});

// Obtener todas las publicaciones
app.get("/posts", (req, res) => {
  const query = "SELECT * FROM publicaciones ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Borrar publicación
app.delete("/posts/:id", (req, res) => {
  const postId = req.params.id;
  const query = "DELETE FROM publicaciones WHERE id = ?";
  db.query(query, [postId], (err, result) => { if (err) return res.status(500).json({ error: err }); res.json({ message: " Publicación eliminada" });
  });
});


// Crear amigo
app.post("/amigos", (req, res) => {
  const { nombre, correo, telefono, imagen } = req.body;
  const imagenAmigo = imagen || "https://i.pinimg.com/1200x/45/1f/2e/451f2e4eb5964ba0afa25d9a19bf2d4d.jpg";
  const query = "INSERT INTO amigos (nombre, correo, telefono, imagen) VALUES (?, ?, ?, ?)";
  db.query(
    query,
    [nombre, correo, telefono, imagenAmigo || defaultImage], // usa la que viene o la default
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Amigo agregado", id: result.insertId });
    }
  );
});

// Obtener amigos
app.get("/amigos", (req, res) => {
  const query = "SELECT * FROM amigos ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Eliminar amigo
app.delete("/amigos/:id", (req, res) => {
  const amigoId = req.params.id;
  const query = "DELETE FROM amigos WHERE id = ?";
  db.query(query, [amigoId], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: " Amigo eliminado" });
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`a Servidor corriendo en http://localhost:${PORT}`);
});
