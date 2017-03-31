import React from 'react';
import NoteList from "./NoteList";
import NoteDetail from './NoteDetail';
import Loading from './Loading';

import {Component} from 'react';
import {connect} from 'react-redux';
import {fetchNotes} from '../actions';
import '../styles/app.css';

class App extends Component {
    componentWillMount() {
        this.props.fetchNotes();
    }

    render() {
        return (
            <div className="main">
                <NoteList />
                <NoteDetail/>
                <Loading/>
            </div>);
    }
}

export default connect(null, {fetchNotes})(App);