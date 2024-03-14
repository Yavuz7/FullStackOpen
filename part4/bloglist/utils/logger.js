// Code taken directly from https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing#project-structure

const info = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.log(...params);
  }
};

const error = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.log(...params);
  }
};

module.exports = {
  info,
  error,
};
