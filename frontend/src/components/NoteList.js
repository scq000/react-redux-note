import React from "react";
import {connect} from "react-redux";
import {deleteNote, selectNote} from "../actions";
import "../styles/notelist.css";

const NoteList = ({notes = [], deleteNote, selectNote}) => {

    const theList = notes.map(note => (
        <li key={note.id} className="note-list-item" onClick={() => selectNote(note)}>
            <span className="title">{note.title}</span>
            <button className="btn remove" onClick={(e) => {
                e.stopPropagation();
                deleteNote(note.id);
            }}>remove
            </button>
        </li>
    ));

    return (
        <div className="note-list-wrap">
            <ul className="note-list">
                {theList}
            </ul>
        </div>);
};

const mapStateToProps = (state) => ({
    notes: state.notes
});

export default connect(mapStateToProps, {deleteNote, selectNote})(NoteList);