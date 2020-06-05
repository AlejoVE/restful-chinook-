const db = require("../db-connection");

const controllers = {
  getAll: (req, res) => {
    const sql = `SELECT * FROM genres`;

    db.all(sql, (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      res.json(rows);
    });
  },
  getOne: (req, res) => {
    const id = Number(req.params.id);
    const sql = `SELECT * FROM genres WHERE genreId = ${id}`;

    db.all(sql, (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      res.json(rows);
    });
  },
  create: (req, res) => {
    const name = req.body.name;

    const sql = `INSERT INTO genres (name) VALUES ("${name}")`;

    db.run(sql, (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
      });
    });
  },
  update: (req, res) => {
    const id = Number(req.params.id);
    const data = req.body;
    const sql = `UPDATE genres SET name = "${req.body.name}" WHERE genreId = ${id}`;

    db.run(sql, (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json(data);
    });
  },
  delete: (req, res) => {},
};

module.exports = controllers;
