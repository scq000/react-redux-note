import {combineReducers} from 'redux';
import * as types from '../constants';

export const notes = (state = [], {type, payload}) => {
    switch (type) {
        case types.RECEIVE_NOTES:
            return payload.map(note => ({id: note._id, title: note.title, content: note.content}));
        case types.ADD_NOTE:
            return [...state, payload];
        case types.UPDATE_NOTE:
            return state.map(note => note.id === payload.id ? payload : note);
        case types.DELETE_NOTE:
            return state.filter(note => note.id !== payload.id);
        default:
            return state;
    }
};

export const isFetchingData = (state = false, {type}) => {
    switch (type) {
        case types.FETCH_NOTES:
        case types.BEGIN_UPDATE_NOTE:
        case types.BEGIN_ADD_NOTE:
        case types.BEGIN_DELETE_NOTE:
            return true;
        default:
            return false;
    }
};

export const errMsg = (state = '', {type, payload}) => {
    switch (type) {
        case types.ERROR:
            return payload;
        default:
            return state;
    }
};

export const selectedNote = (state = {id: '', content: '', title: ''}, {type, payload}) => {
    switch (type) {
        case types.SELECT_NOTE:
            return payload;
        case 'CONTENT':
            return {...state, content: payload};
        case 'TITLE':
            return {...state, title: payload};
        case types.UPDATE_NOTE:
        case types.ADD_NOTE:
            return {id: '', content: '', title: ''};
        default:
            return state;
    }
};

export default combineReducers({
    isFetchingData,
    notes,
    selectedNote,
    errMsg
});