import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NoteDataService from "../services/NoteService";

const initialState = [];

export const createNote = createAsyncThunk(
  "notes/create",
  async ({ title, description }) => {
    const res = await NoteDataService.create({ title, description });
    return res.data;
  }
);

export const retrieveNotes = createAsyncThunk(
  "notes/retrieve",
  async () => {
    const res = await NoteDataService.getAll();
    return res.data;
  }
);

export const updateNote = createAsyncThunk(
  "notes/update",
  async ({ id, data }) => {
    const res = await NoteDataService.update(id, data);
    return res.data;
  }
);

export const deleteNote = createAsyncThunk(
  "notes/delete",
  async ({ id }) => {
    await NoteDataService.remove(id);
    return { id };
  }
);

export const deleteAllNotes = createAsyncThunk(
  "notes/deleteAll",
  async () => {
    const res = await NoteDataService.removeAll();
    return res.data;
  }
);

export const findNotesByTitle = createAsyncThunk(
  "notes/findByTitle",
  async ({ title }) => {
    const res = await NoteDataService.findByTitle(title);
    return res.data;
  }
);

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