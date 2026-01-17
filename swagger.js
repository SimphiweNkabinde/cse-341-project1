const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description:
      "API for storing, retrieving, and modifying contact information",
  },
};

// host and schemes can be omitted for a more dynamic association. (ommit in swagger.json)
// https://swagger.io/docs/specification/v2_0/api-host-and-base-path/

const outputFile = "./swagger.json";
const routes = ["./routes/index.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
