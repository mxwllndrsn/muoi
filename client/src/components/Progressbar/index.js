import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import "./style.css";

function Progress(props) {
    return (
        <ProgressBar animated striped variant="warning" now={props.value} label={`${props.value}%`} />
    )
}

export default Progress;