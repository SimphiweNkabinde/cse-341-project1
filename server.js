const express = require("express");
const mongodb = require("./config/database");
const app = express();

const routes = require("./routes/index");

const port = process.env.PORT || 3000;

app.use("/", routes);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => console.log(`Database connected. running on port ${port}`));
  }
});
