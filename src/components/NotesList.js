/**
 * Renders a list of notes that can be searched and filtered by title.
 * Allows users to view, edit and delete notes.
  @component
  @example
  return (
    <NotesList />
  )
*/

import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveNotes,
  findNotesByTitle,
  deleteAllNotes,
  deleteNote,
} from "../slices/notes";
import { Link } from "react-router-dom";
import moment from 'moment'
import { FaPen, FaTrashAlt } from "react-icons/fa";

const NotesList = () => {
  const [currentNote, setCurrentNote] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const notes = useSelector(state => state.notes);
  const dispatch = useDispatch();

  /**
    Handles updating the search title based on user input.
    @param {object} e - The event object.
  */
  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  /**
    Handles fetching notes from the server.
  */
  const initFetch = useCallback(() => {
    dispatch(retrieveNotes());
  }, [dispatch])

  useEffect(() => {
    initFetch()
  }, [initFetch])

  /**
    Resets the current note and index.
  */
  const refreshData = () => {
    setCurrentNote(null);
    setCurrentIndex(-1);
  };

  /**
    Handles deleting all notes.
  */
  const removeAllNotes = () => {
    dispatch(deleteAllNotes())
      .then(response => {
        refreshData();
      })
      .catch(e => {
        console.log(e);
      });
  };

  /**
    Handles filtering notes by title.
  */
  const findByTitle = () => {
    refreshData();
    dispatch(findNotesByTitle({ title: searchTitle }));
  };

  /**
    Handles deleting a specific note.
    @param {object} note - The note to be deleted.
  */
  const removeNote = (note) => {
    dispatch(deleteNote({ id: note.id }))
      .unwrap()
      .then(() => {
        refreshData();
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-12 ">
        <h4>Notes List</h4>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
        <div id="note-full-container" className="note-has-grid row">
        {notes &&
          notes.map((note, index) => (
            <div className="col-md-4 single-note-item all-category"
            key={index}>
              <div className="card card-body">
                  <span className="side-stick"></span>
                  <h5 className="note-title text-truncate w-75 mb-0" data-noteheading="Book a Ticket for Movie">{note.title}<i className="point fa fa-circle ml-1 font-10"></i></h5>
                  <p className="note-date font-12 text-muted">{moment(note.createdAt).format("MM-DD-YYYY")}</p>
                  <div className="note-content">
                      <p className="note-inner-content text-muted" data-notecontent="Blandit tempus porttitor aasfs. Integer posuere erat a ante venenatis.">{note.description}</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <span class="mr-1">
                      <Link
                          to={"/notes/" + note.id}
                          className="badge badge-warning"
                        >
                          <FaPen />
                      </Link>
                    </span>
                    <span class="mr-1">
                      <div className="badge badge-danger" onClick={() => removeNote(note)}>
                        <FaTrashAlt />
                      </div>
                    </span>
                  </div>
              </div>
          </div>
          ))}

          
        </div>
        
      </div>
      <div className="col-md-6">
        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllNotes}
        >
          Remove All
        </button>
      </div>
    </div>
  );
};

export default NotesList;
