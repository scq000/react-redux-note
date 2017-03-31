import React from 'react';

import {connect} from 'react-redux';
import '../styles/loading.css';

const Loading = ({isFetchingData}) => (
    <div className="loading" style={isFetchingData ? {} : {display: "none"}}>
        loading....
    </div>
);

const mapStateToProps = (state) => ({
    isFetchingData: state.isFetchingData
});

export default connect(mapStateToProps, null)(Loading);