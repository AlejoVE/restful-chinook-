const db = require("../db-connection");

const controllers = {
  getAll: (req, res) => {
    const sql = `SELECT * FROM albums`;

    db.all(sql, (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      res.json(rows);
    });
  },
  getOne: (req, res) => {
    const sql = `SELECT * FROM albums WHERE albumId = ${req.params.id} `;

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
      albumId: req.body.albumId,
      title: req.body.title,
      artistId: req.body.artistId,
    };

    const sql = `INSERT INTO albums VALUES (${data.albumId}, "${data.title}", ${data.artistId})`;

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
    const sql = `UPDATE albums SET Title = "${req.body.title}", albumId = ${req.body.albumId}, artistId = ${req.body.artistId} WHERE AlbumId = ${id}`;

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
