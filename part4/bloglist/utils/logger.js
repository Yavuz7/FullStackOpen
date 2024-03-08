// Code taken directly from https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing#project-structure

const info = (...params) => {
  console.log(...params);
};

const error = (...params) => {
  console.error(...params);
};

module.exports = {
  info,
  error,
};
