import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNote } from "../slices/notes";

const AddNote = () => {
  const initialNoteState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [note, setNote] = useState(initialNoteState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNote({ ...note, [name]: value });
  };

  const saveNote = () => {
    const { title, description } = note;

    dispatch(createNote({ title, description }))
      .unwrap()
      .then(data => {
        console.log(data);
        setNote({
          id: data.id,
          title: data.title,
          description: data.description,
          published: data.published
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
