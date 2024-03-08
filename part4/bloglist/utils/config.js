//Code directly from : https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing#project-structure

require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
  MONGODB_URI,
  PORT,
};
