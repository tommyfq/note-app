import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { updateNote, deleteNote } from "../slices/notes";
import NoteDataService from "../services/NoteService";

const Note = (props) => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialNoteState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentNote, setCurrentNote] = useState(initialNoteState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getNote = id => {
    NoteDataService.get(id)
      .then(response => {
        setCurrentNote(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getNote(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentNote({ ...currentNote, [name]: value });
  };

  const updateStatus = status => {
    const data = {
      id: currentNote.id,
      title: currentNote.title,
      description: currentNote.description,
      published: status
    };

    dispatch(updateNote({ id: currentNote.id, data }))
      .unwrap()
      .then(response => {
        console.log(response);
        setCurrentNote({ ...currentNote, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

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

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentNote.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentNote.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(true)}
            >
              Publish
            </button>
          )}

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
