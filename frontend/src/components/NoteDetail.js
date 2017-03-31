import React from 'react';
import '../styles/notedetail.css';
import {addNote, updateNote, updateSelectedNote} from '../actions';
import {connect} from 'react-redux';

const NoteDetail = ({note, addNote, updateNote, updateSelectedNote}) => {
    const {content, title, id} = note;

    function onChangeTitle(e) {
        updateSelectedNote('TITLE', e.target.value);
    }

    function onChangeContent(e) {
        updateSelectedNote('CONTENT', e.target.value);
    }

    return (
        <div className="note-detail">
            <div className="container">
                <div className="note-title">
                    <input type="text" value={title} placeholder="please input the note title"
                           onChange={onChangeTitle}/>
                </div>
                <div className="note-content">
                <textarea name="note" cols="30" rows="10" placeholder="please input the content"
                          onChange={onChangeContent} value={content}/>
                </div>
                <div className="note-operate">
                    <button className="save-btn btn"
                            onClick={() => id ? updateNote(id, title, content) : addNote(title, content)}>Save
                    </button>
                </div>
            </div>
        </div>
    );
};


const mapStateToProps = (state) => ({
    note: state.selectedNote
});

export default connect(mapStateToProps, {addNote, updateNote, updateSelectedNote})(NoteDetail);