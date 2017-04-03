import {call, fork, put, takeEvery} from "redux-saga/effects";
import * as types from "../constants";
import fetch from "isomorphic-fetch";
const url = 'http://172.20.237.21:1322/api/notes';

function request(url, type, data) {
    return fetch(url, {
        method: type,
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: data && JSON.stringify(data)
    }).then(response => response.json());
}

function* fetchNotes() {
    try {
        const response = yield call(fetch, url);
        const notes = yield response.json();
        yield put({type: types.RECEIVE_NOTES, payload: notes});
    } catch (e) {
        yield put({type: types.ERROR, payload: e});
    }
}

function* addNote({payload}) {
    try {
        debugger;
        const {title, content} = payload;
        const id = yield call(request, url, 'POST', {title, content});
        yield put({type: types.ADD_NOTE, payload: {id, title, content}});
    } catch (e) {
        yield put({type: types.ERROR, payload: e});
    }
}

function* deleteNote({id}) {
    try {
        yield call(request, `${url}/${id}`, 'DELETE');
        yield put({type: types.DELETE_NOTE, payload: {id}});
    } catch (e) {
        yield put({type: types.ERROR, payload: e});
    }
}

function* updateNote({payload}) {
    try {
        const id = payload.id;
        yield call(request, `${url}/${id}`, 'PUT', payload);
        yield put({type: types.UPDATE_NOTE, payload: payload});
    } catch (e) {
        yield put({type: types.ERROR, payload: e});
    }
}

export function* watchAddNote() {
    yield takeEvery(types.BEGIN_ADD_NOTE, addNote);
}

export function* watchDeleteNote() {
    yield takeEvery(types.BEGIN_DELETE_NOTE, deleteNote);
}

export function* watchUpdateNote() {
    yield takeEvery(types.BEGIN_UPDATE_NOTE, updateNote);
}

export default function* rootSaga() {
    yield [
        fork(fetchNotes),
        fork(watchAddNote),
        fork(watchDeleteNote),
        fork(watchUpdateNote),
    ]
}