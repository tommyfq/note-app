/**
 * A component for viewing and editing a single note.
 * It retrieves the note data from the server using a NoteDataService,
 * and allows the user to update or delete the note.
  @component
  @param {Object} props - The properties passed to the component.
  @param {string} props.id - The ID of the note to display.
*/

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { updateNote, deleteNote } from "../slices/notes";
import NoteDataService from "../services/NoteService";

const Note = (props) => {
  // Retrieve the ID of the note to display from the URL
  const { id }= useParams();
  let navigate = useNavigate();

  // Define the initial state of the currentNote object
  const initialNoteState = {
    id: null,
    title: "",
    description: ""
  };
  const [currentNote, setCurrentNote] = useState(initialNoteState);
  const [message, setMessage] = useState("");

  // Retrieve the Redux dispatch function
  const dispatch = useDispatch();

  // Get the note data from the server and store it in the currentNote state
  const getNote = id => {
    NoteDataService.get(id)
      .then(response => {
        setCurrentNote(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  // If an ID is provided in the URL, get the note data from the server
  useEffect(() => {
    if (id)
      getNote(id);
  }, [id]);

  // Handle changes to the input fields by updating the currentNote state
  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentNote({ ...currentNote, [name]: value });
  };

  // Update the note data on the server
  const updateContent = () => {
    dispatch(updateNote({ id: currentNote.id, data: currentNote }))
      .unwrap()
      .then(response => {
        console.log(response);
        setMessage("The note was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  // Delete the note data from the server
  const removeNote = () => {
    dispatch(deleteNote({ id: currentNote.id }))
      .unwrap()
      .then(() => {
        navigate("/notes");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentNote ? (
        <div className="edit-form">
          <h4>Note</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentNote.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentNote.description}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={removeNote}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateContent}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Note...</p>
        </div>
      )}
    </div>
  );
};

export default Note;
