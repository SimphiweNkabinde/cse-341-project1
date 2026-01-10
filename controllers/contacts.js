const mongodb = require("../config/database");
const ObjectId = require("mongodb").ObjectId;

async function getAll(req, res) {
  const result = await mongodb
    .getDb()
    .db("project1")
    .collection("contacts")
    .find();
  const contacts = await result.toArray();
  res.setHeader("Content-type", "application/json");
  return res.status(200).json(contacts);
}

async function getOne(req, res) {
  const id = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("project1")
    .collection("contacts")
    .find({ _id: id });
  const contacts = await result.toArray();
  res.setHeader("Content-type", "application/json");
  return res.status(200).json(contacts[0]);
}
module.exports = { getAll, getOne };
