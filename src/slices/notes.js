/**
 * This module exports a Redux Toolkit slice that defines actions and reducers
 * for managing notes. It defines asynchronous actions for creating, retrieving,
 * updating, and deleting notes, using the NoteService module to interact with
 * the backend API. It also defines reducers to handle the state changes resulting
 * from these actions.
 @module NoteSlice
*/

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NoteDataService from "../services/NoteService";

/**
The initial state for the note slice.
@type {Array.<Object>}
*/
const initialState = [];

/**
An asynchronous thunk action that creates a new note.
@type {AsyncThunk.<Object, { title: string, description: string }, {}>}
*/
export const createNote = createAsyncThunk(
  "notes/create",
  async ({ title, description }) => {
    const res = await NoteDataService.create({ title, description });
    return res.data;
  }
);

/**
An asynchronous thunk action that retrieves all notes.
@type {AsyncThunk.<Array.<Object>, undefined, {}>}
*/
export const retrieveNotes = createAsyncThunk(
  "notes/retrieve",
  async () => {
    const res = await NoteDataService.getAll();
    return res.data;
  }
);

/**
An asynchronous thunk action that updates an existing note.
@type {AsyncThunk.<Object, { id: string, data: { title: string, description: string } }, {}>}
*/
export const updateNote = createAsyncThunk(
  "notes/update",
  async ({ id, data }) => {
    const res = await NoteDataService.update(id, data);
    return res.data;
  }
);

/**
An asynchronous thunk action that deletes an existing note.
@type {AsyncThunk.<Object, { id: string }, {}>}
*/
export const deleteNote = createAsyncThunk(
  "notes/delete",
  async ({ id }) => {
    await NoteDataService.remove(id);
    return { id };
  }
);

/**
An asynchronous thunk action that deletes all notes.
@type {AsyncThunk.<Array.<Object>, undefined, {}>}
*/
export const deleteAllNotes = createAsyncThunk(
  "notes/deleteAll",
  async () => {
    const res = await NoteDataService.removeAll();
    return res.data;
  }
);

/**
An asynchronous thunk action that finds notes by title.
@type {AsyncThunk.<Array.<Object>, { title: string }, {}>}
*/
export const findNotesByTitle = createAsyncThunk(
  "notes/findByTitle",
  async ({ title }) => {
    const res = await NoteDataService.findByTitle(title);
    return res.data;
  }
);

/**
A Redux Toolkit slice that defines reducers for handling state changes resulting from
the note-related actions.
@type {Slice.<Array.<Object>>}
*/
const noteSlice = createSlice({
  name: "note",
  initialState,
  extraReducers: {
    [createNote.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveNotes.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateNote.fulfilled]: (state, action) => {
      const index = state.findIndex(note => note.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteNote.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllNotes.fulfilled]: (state, action) => {
      return [];
    },
    [findNotesByTitle.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

const { reducer } = noteSlice;
export default reducer;