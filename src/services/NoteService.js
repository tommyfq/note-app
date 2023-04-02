/**
 * NoteService is a service module that provides a set of functions to perform CRUD operations on notes.
 * Functions:
  - getAll(): retrieves all notes.
  - get(id): retrieves a single note by ID.
  - create(data): creates a new note.
  - update(id, data): updates a note with the given ID.
  - remove(id): deletes a note with the given ID.
  - removeAll(): deletes all notes.
  - findByTitle(title): retrieves notes by title.
  Note: All functions return a promise that resolves with the response data or rejects with an error.
*/
import http from "../http-common";

const getAll = () => {
  return http.get("/notes");
};

const get = id => {
  return http.get(`/notes/${id}`);
};

const create = data => {
  return http.post("/notes", data);
};

const update = (id, data) => {
  return http.put(`/notes/${id}`, data);
};

const remove = id => {
  return http.delete(`/notes/${id}`);
};

const removeAll = () => {
  return http.delete(`/notes`);
};

const findByTitle = title => {
  return http.get(`/notes?title=${title}`);
};

const NoteService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default NoteService;