import React, { Component } from "react";
import Unsplash, { toJson } from 'unsplash-js';
import { Container, Row, Column } from "../components/Grid";
import Button from "../components/Button";
import Question from "../components/Question";
import ProgressBar from "../components/Progressbar";
import data from "../data/data";
import "./Assets/CSS/style.css";

class Home extends Component {
    state = {
        data: data,
        answeredQuestions: [],
        questionCard: "question-card",
        question: "",
        answer: "",
        answerImage: "",
        progressValue: 0,
        increment: 0,
    }

    UNSAFE_componentWillMount() {
        this.randomQuestion();
    }
    randomQuestion = () => {
        const data = this.state.data;
        console.log(this.state.answeredQuestions);
        const increment = (this.state.data.length + this.state.answeredQuestions.length) / 100;
        if (data) {
            const randomIndex = Math.floor(Math.random() * this.state.data.length);
            const selectedQuestion = data.splice(randomIndex, 1);
            const answer = selectedQuestion[0].answer
                .split(' ')
                .map((letter) => letter.charAt(0).toUpperCase() + letter.substring(1))
                .join(' ');
            const question = selectedQuestion[0].question
                .split(' ')
                .map((letter) => letter.charAt(0).toUpperCase() + letter.substring(1))
                .join(' ');
            const unsplash = new Unsplash ({
                 accessKey: process.env.REACT_APP_UNSPLASH_KEY,
                 secret: process.env.REACT_APP_UNSPLASH_SECRET_KEY
             });
             unsplash.search.photos(
                 answer,
                 1,
                 1
             ).then(toJson)
             .then(res => {
                 this.setState({
                     answerImage: res.results[0].urls.regular
                 })
             });
            this.setState({
                increment: increment,
                question: question,
                answer: answer
            });
        } else {
            alert(
                "Complete!"
            );
            this.setState({
                data: this.state.answeredQuestions
            });
        }
    }
    nextQuestion = () => (event) => {
        event.preventDefault();
        const answeredQuestion = {
            question: this.state.question,
            answer: this.state.answer,
            answerImage: this.state.answerImage
        }
        const answeredQuestions = this.state.answeredQuestions;
        const value = this.state.progressValue;
        const increment = this.state.increment;
        this.setState({
            answeredQuestions: answeredQuestions.concat(answeredQuestion),
            progressValue: value + increment,
            questionCard: "question-card"
        });
        const thisIsThis = this;
        setTimeout(function () {
            thisIsThis.randomQuestion();
        }, 250);
    }
    resetQuiz = () => (event) => {
        event.preventDefault();
        this.setState({
            progressValue: 0,
            data: data,
            answeredQuestions: []
        });
    }
    flipCard = () => (event) => {
        event.preventDefault();
        if (this.state.questionCard === "question-card") {
            this.setState({ questionCard: "question-card is-flipped" });
        } else {
            this.setState({ questionCard: "question-card" });
        }
    }
    showAnswer = () => (event) => {
        event.preventDefault();
        this.setState({
            questionCard: "question-card is-flipped"
        });
    }
    showQuestion = () => (event) => {
        event.preventDefault();
        this.setState({
            questionCard: "question-card"
        });
    }
    previousQuestion = () => (event) => {
        event.preventDefault();
        if (this.state.answeredQuestions.length > 0) {
            const lastQuestion = this.state.answeredQuestions.splice(this.state.answeredQuestions.length - 1, 1);
            const progress = this.state.progressValue;
            const unansweredQuestions = this.state.data;
            this.setState({
                question: lastQuestion[0].question,
                answer: lastQuestion[0].answer,
                progressValue: progress - this.state.increment,
                data: unansweredQuestions.concat(lastQuestion)
            });
        }
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Column size="md-12">
                        <Row>
                            <Column size="md-1" />
                            <Column size="md-8">
                                <div className="quiz-header content-background twenty-margin-top">
                                    <p>
                                        USCIS Citizenship Exam
                                    </p>
                                </div>
                            </Column>
                            <Column size="md-1">
                                <div className="twenty-margin-top">
                                    <Button
                                        buttonClass="study"
                                        text="Study"
                                    />
                                </div>

                            </Column>
                            <Column size="md-1">
                                <div className="twenty-margin-top">
                                    <Button
                                        buttonClass="quiz"
                                        text="Quiz"
                                    />
                                </div>
                            </Column>
                            <Column size="md-1" />
                        </Row>
                        <Row>
                            <Column size="md-1" />
                            <Column size="md-10">
                                <Question
                                    card={this.state.questionCard}
                                    flip={this.flipCard()}
                                    question={this.state.question}
                                    answer={this.state.answer}
                                    answerImage={this.state.answerImage}
                                />
                            </Column>
                            <Column size="md-1" />
                        </Row>
                        <Row>
                            <Column size="md-1" />
                            <Column size="md-10">
                                <ProgressBar
                                    value={this.state.progressValue}
                                />
                            </Column>
                            <Column size="md-1" />
                        </Row>
                        <Row>
                            <Column size="md-1" />
                            <Column size="md-9">
                                <div className="question-controls ten-margin-top twenty-margin-bottom">
                                    <Button
                                        buttonClass="quiz"
                                        action={this.nextQuestion()}
                                        text="Next"
                                    />
                                    <Button
                                        buttonClass="repeat"
                                        action={this.showQuestion()}
                                        text="Show Question"
                                    />
                                    <Button
                                        buttonClass="show-answer"
                                        action={this.showAnswer()}
                                        text="Show Answer"
                                    />
                                    <Button
                                        buttonClass="previous"
                                        action={this.previousQuestion()}
                                        text="Previous Question"
                                    />
                                </div>
                            </Column>
                            <Column size="md-1">
                                <div className="ten-margin-top twenty-margin-bottom">
                                    <Button
                                        buttonClass="reset"
                                        action={this.resetQuiz()}
                                        text="Reset"
                                    />
                                </div>
                            </Column>
                            <Column size="md-1" />
                        </Row>
                    </Column>
                </Row>
            </Container>
        )
    }
}

export default Home;