/**
 * A component that allows users to add new notes.
 * It utilizes React hooks like useState to manage the state of the note object
 * and useDispatch to dispatch a Redux action to create the note.
 @component
 @example
 return (
    <AddNote />
  )
*/

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNote } from "../slices/notes";

const AddNote = () => {
  // Initial state of the note object
  const initialNoteState = {
    id: null,
    title: "",
    description: ""
  };

  // Use state hooks to manage the state of the note object and the form submission status
  const [note, setNote] = useState(initialNoteState);
  const [submitted, setSubmitted] = useState(false);

  // Get the dispatch function from the Redux store
  const dispatch = useDispatch();

  /**
  A function to handle changes in the input fields and update the note object accordingly.
  @param {object} event - The input event object.
  */
  const handleInputChange = event => {
    const { name, value } = event.target;
    setNote({ ...note, [name]: value });
  };

  /**
  A function to save the note by dispatching a createNote action to the Redux store and update
  the state of the component accordingly.
  */
  const saveNote = () => {
    const { title, description } = note;

    dispatch(createNote({ title, description }))
      .unwrap()
      .then(data => {
        console.log(data);
        setNote({
          id: data.id,
          title: data.title,
          description: data.description
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newNote = () => {
    setNote(initialNoteState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newNote}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={note.title || ''}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={note.description || ''}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveNote} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddNote;
