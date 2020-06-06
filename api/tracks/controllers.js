const db = require("../db-connection");

const controllers = {
  getAll: (req, res) => {
    const sql = `SELECT * FROM tracks`;

    db.all(sql, (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      res.json(rows);
    });
  },
  getOne: (req, res) => {
    const sql = `SELECT * FROM tracks WHERE trackId = ${req.params.id} `;

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
      name: req.body.name,
      albumId: req.body.albumId,
      mediaTypeId: req.body.mediaTypeId,
      genreId: req.body.genreId,
      composer: req.body.composer,
      milliseconds: req.body.milliseconds,
      bytes: req.body.bytes,
      unitPrice: req.body.unitPrice,
    };

    const sql = `INSERT INTO tracks (name, albumId, mediaTypeId, genreId, composer, milliseconds, bytes, unitPrice) VALUES ("${data.name}", ${data.albumId}, ${data.mediaTypeId}, ${data.genreId}, "${data.composer}", ${data.milliseconds}, ${data.bytes}, ${data.unitPrice})`;
    console.log(sql);
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
    const data = {
      name: req.body.name,
      albumId: req.body.albumId,
      mediaTypeId: req.body.mediaTypeId,
      genreId: req.body.genreId,
      composer: req.body.composer,
      milliseconds: req.body.milliseconds,
      bytes: req.body.bytes,
      unitPrice: req.body.unitPrice,
    };

    const sql = `UPDATE  tracks SET name ="${data.name}", albumId = ${data.albumId}, mediaTypeId =${data.mediaTypeId}, genreId=${data.genreId} , composer = "${data.composer}", milliseconds = ${data.milliseconds}, bytes = ${data.bytes}, unitPrice = ${data.unitPrice}  WHERE trackID =${id}`;
    console.log(sql);
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
  delete: (req, res) => {
    const id = Number(req.params.id);
    const sql = `DELETE FROM tracks WHERE trackId = ${id}`;
    db.run(sql, (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.send("DELETED").end();
    });
  },
};

module.exports = controllers;
