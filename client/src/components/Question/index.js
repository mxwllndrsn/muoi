import React from 'react';
import { Textfit } from 'react-textfit';
import "./style.css";

function Question(props) {
    return (
        <div className="question-section">
            <div className={props.card}>
                <div className="question-side question">
                    <div onClick={props.flip}>
                        <Textfit
                            mode="multi"
                            min={10}
                            max={52}
                        >
                            {props.question}
                        </Textfit>
                    </div>
                </div>
                <div className="question-side answer">
                    <img src={props.answerImage} alt={props.answer} className="answer-image" />
                    <div onClick={props.flip}>
                        <Textfit
                            mode="multi"
                            min={20}
                            max={72}
                        >
                            {props.answer}
                        </Textfit>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Question;