import * as types from '../constants';

export const fetchNotes = () => ({
    type: types.FETCH_NOTES
});

export const addNote = (title, content = '') => ({
    type: types.BEGIN_ADD_NOTE,
    payload: {title, content}
});

export const deleteNote = (id) => ({
    type: types.BEGIN_DELETE_NOTE,
    id: id
});

export const updateNote = (id, title, content) => ({
    type: types.BEGIN_UPDATE_NOTE,
    payload: {id, title, content}
});

export const selectNote = (note) => ({
    type: types.SELECT_NOTE,
    payload: note
});

export const updateSelectedNote = (type, payload) => ({
    type: type,
    payload: payload
});