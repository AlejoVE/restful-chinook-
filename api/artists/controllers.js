const db = require("../db-connection");

const controllers = {
  getAll: (req, res) => {
    const sql = `SELECT * FROM artists`;

    db.all(sql, (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      res.json(rows);
    });
  },
  getOne: (req, res) => {
    const sql = `SELECT * FROM artists WHERE artistId = ${req.params.id} `;

    db.all(sql, (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      res.json(rows);
    });
  },
  create: (req, res) => {
    const data = {
      artistId: req.body.artistId,
      name: req.body.name,
    };

    const sql = `INSERT INTO artists VALUES (${data.artistId}, "${data.name}")`;

    db.run(sql, (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: data,
      });
    });
  },
  update: (req, res) => {
    const id = Number(req.params.id);
    const data = req.body;
    const sql = `UPDATE artists SET artistId = ${req.body.artistId}, name = "${req.body.name}" WHERE artistId = ${id}`;

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
