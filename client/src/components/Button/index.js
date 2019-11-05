import React from 'react';
import "./style.css";

function CustomButton(props) {
    return (
        <button className={props.buttonClass} onClick={props.action}>
            {props.text}
        </button>
    )
}

export default CustomButton;