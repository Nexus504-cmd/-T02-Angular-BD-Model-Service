const mysql = require('mysql2');
const cors = require('cors');
const express = require('express');

const app = express();
const port = 3300;

app.use(cors());
app.use(express.json());

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Biblioteca',
    port: 3306
});

conexion.connect((err) => {
    if (err) {
        console.error("Error de conexión a MySQL:", err);
        return;
    }

    console.log("Conectado a MySQL");
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});


// ========================
// GET
// ========================

app.get('/autor', (req, res) => {

    conexion.query(
        'SELECT * FROM autor',
        (err, result) => {

            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }

            res.status(200).json(result);

        }
    );

});


// ========================
// POST
// ========================

app.post('/autor', (req, res) => {

    const { nombre, apellido, anio_nacimiento } = req.body;

    const sql =
        'INSERT INTO autor(nombre, apellido, anio_nacimiento) VALUES (?,?,?)';

    conexion.query(
        sql,
        [nombre, apellido, anio_nacimiento],
        (err, result) => {

            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }

            res.status(201).json({
                mensaje: 'Autor creado correctamente',
                id: result.insertId
            });

        }
    );

});


// ========================
// PUT
// ========================

app.put('/autor/:id', (req, res) => {

    const { id } = req.params;
    const { nombre, apellido, anio_nacimiento } = req.body;

    const sql =
        'UPDATE autor SET nombre=?, apellido=?, anio_nacimiento=? WHERE id_autor=?';

    conexion.query(
        sql,
        [nombre, apellido, anio_nacimiento, id],
        (err, result) => {

            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }

            res.json({
                mensaje: 'Autor actualizado',
                filasAfectadas: result.affectedRows
            });

        }
    );

});


// ========================
// DELETE
// ========================

app.delete('/autor/:id', (req, res) => {

    const { id } = req.params;

    conexion.query(
        'DELETE FROM autor WHERE id_autor = ?',
        [id],
        (err, result) => {

            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }

            res.json({
                mensaje: 'Autor eliminado',
                filasAfectadas: result.affectedRows
            });

        }
    );

});