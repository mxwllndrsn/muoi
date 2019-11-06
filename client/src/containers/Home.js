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
    }

    UNSAFE_componentWillMount() {
        this.randomQuestion();
    }
    randomQuestion = () => {
        const data = this.state.data;
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
                question: question,
                answer: answer
            })
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
        this.randomQuestion();
        const value = this.state.progressValue;
        const increment = (this.state.data.length + this.state.answeredQuestions.length) / 100;
        this.setState({
            progressValue: value + increment,
            questionCard: "question-card"
        });
    }
    resetQuiz = () => (event) => {
        event.preventDefault();
        this.setState({
            progressValue: 0
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