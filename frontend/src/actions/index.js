import * as types from '../constants';
import fetch from 'isomorphic-fetch';

const url = 'http://172.20.237.54:1322/api/notes';

export const fetchNotes = () => dispatch => {
    dispatch({type: types.FETCH_NOTES});
    return fetch(url)
        .then(response => response.json())
        .then(json => {
            dispatch({type: types.RECEIVE_NOTES, payload: json})
        });
};

export const addNote = (title, content = '') => dispatch => {
    dispatch({type: types.FETCH_NOTES});
    console.log(title, content);

    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({title, content})
    })
        .then(response => response.json())
        .then(json => {
            if (json.id) {
                let payload = {
                    id: json.id,
                    title,
                    content
                };
                dispatch({type: types.ADD_NOTE, payload: payload})
            }
        });
};

export const deleteNote = (id) => dispatch => {
    dispatch({type: types.FETCH_NOTES});
    return fetch(`${url}/${id}`, {method: 'DELETE'})
        .then(res => res.json)
        .then(json => {
            dispatch({type: types.DELETE_NOTE, payload: {id}});
        });
};

export const updateNote = (id, title, content) => dispatch => {
    dispatch({type: types.FETCH_NOTES});
    return fetch(`${url}/${id}`, {method: 'PUT'})
        .then(res => res.json)
        .then(json => {
            dispatch({type: types.UPDATE_NOTE, payload: {id, title, content}});
        });
};

export const selectNote = (note) => ({
    type: types.SELECT_NOTE,
    payload: note
});

export const updateSelectedNote = (type, payload) => ({
    type: type,
    payload: payload
});