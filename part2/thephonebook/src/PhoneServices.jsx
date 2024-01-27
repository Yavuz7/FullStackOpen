import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newContact) => {
  const request = axios.post(baseUrl, newContact);
  return request.then((response) => response.data);
};

const remove = (contactId) => {
  const urlToDelete = `${baseUrl}/${contactId}`;
  const request = axios.delete(urlToDelete);
  return request.then((response) => response.data);
};

const change = (contactId, newPerson) => {
  const urlToChange = `${baseUrl}/${contactId}`;
  const request = axios.put(urlToChange, newPerson);
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  remove,
  change,
};
