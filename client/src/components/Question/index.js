import React from 'react';
import "./style.css";

function Question(props) {
    return (
        <div className="question-section">
            <div className={props.card}>
                <div className="question-side question">
                    <div className="question-text" onClick={props.flip}>
                        {props.question}
                    </div>
                </div>
                <div className="question-side answer">
                    <img src={props.answerImage} alt={props.answer} className="answer-image" />
                    <div className="question-text" onClick={props.flip}>
                        {props.answer}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Question;