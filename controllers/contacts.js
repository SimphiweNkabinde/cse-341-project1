const mongodb = require("../config/database");
const ObjectId = require("mongodb").ObjectId;

async function getContactsCollection() {
  return mongodb.getDb().db("project1").collection("contacts");
}

async function getAll(req, res) {
  const collection = await getContactsCollection();

  const result = await collection.find();
  const contacts = await result.toArray();

  res.setHeader("Content-type", "application/json");
  return res.status(200).json(contacts);
}

async function getOne(req, res) {
  const id = new ObjectId(req.params.id);
  const collection = await getContactsCollection();

  const result = await collection.find({ _id: id });

  const contacts = await result.toArray();
  if (!contacts.length) return res.sendStatus(404);

  res.setHeader("Content-type", "application/json");
  return res.status(200).json(contacts[0]);
}

async function create(req, res) {
  if (!req.body) return res.sendStatus(400);

  const { firstName, lastName, email, favouriteColor, birthday } = req.body;
  const data = { firstName, lastName, email, favouriteColor, birthday };

  const collection = await getContactsCollection();
  const result = await collection.insertOne(data);

  if (result.acknowledged)
    return res.status(201).json({ id: result.insertedId });
  else
    res
      .status(500)
      .json(error || "some error occured while creating the contact");
}

async function update(req, res) {
  const id = new ObjectId(req.params.id);

  const { firstName, lastName, email, favouriteColor, birthday } = req.body;
  const data = { firstName, lastName, email, favouriteColor, birthday };

  const collection = await getContactsCollection();
  const result = await collection.replaceOne({ _id: id }, data);

  if (result.modifiedCount > 0) res.sendStatus(200);
  else
    res
      .status(500)
      .json(result.error || "some error occured while updating the contact");
}

async function remove(req, res) {
  const id = new ObjectId(req.params.id);

  const collection = await getContactsCollection();
  const result = await collection.deleteOne({ _id: id });

  if (result.acknowledged && result.deletedCount == 0)
    return res.sendStatus(404);

  if (result.deletedCount > 0) res.status(204).json(result);
  else
    res
      .status(500)
      .json(result.error || "some error occured while deleting the contact");
}

module.exports = { getAll, getOne, create, update, remove };
