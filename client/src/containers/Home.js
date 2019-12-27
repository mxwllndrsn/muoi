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
        mode: "study",
        quizQuestions: [],
        quizQuestion: "",
        quizAnswer: "",
        quizAnswerImage: "",
        topic: "USCIS Citizenship Exam",
        quizIndex: 0
    }

    UNSAFE_componentWillMount() {
        switch (this.state.mode) {
            case (this.state.mode === "study"):
                this.randomQuestion();
                break;
            case (this.state.mode === "quiz"):
                this.createQuiz();
                break;
            default:
                this.randomQuestion();
                return;
        }
    }
    randomQuestion = () => {
        const data = this.state.data;
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
            const unsplash = new Unsplash({
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
    createQuiz = () => {
        const quizArr = [];
        const data = this.state.data;
        if (data.length > 9) {
            for (let i = 0; i <= 10; i++) {
                if (i > 9) {
                    this.setState({
                        quizQuestions: [...this.state.quizQuestions, quizArr],
                        increment: 10
                    });
                    this.displayQuiz();
                } else {
                    const randomIndex = Math.floor(Math.random() * data.length);
                    const questionObj = data[randomIndex];
                    const unsplash = new Unsplash({
                        accessKey: process.env.REACT_APP_UNSPLASH_KEY,
                        secret: process.env.REACT_APP_UNSPLASH_SECRET_KEY
                    });
                    unsplash.search.photos(
                        questionObj.answer,
                        1,
                        1
                    )
                    .then(toJson)
                    .then(res => {
                        questionObj.quizAnswerImage = res.results[0].urls.regular
                        quizArr.push(questionObj);
                    })
                    .then(quizArr.push(questionObj))
                    .catch(err => console.log(err));
                }
            }
        } else {
            for (let i = 0; i <= data.length; i++) {
                if (i >= data.length) {
                    this.setState({
                        quizQuestions: [...this.state.quizQuestions, quizArr],
                        increment: data.length
                    });
                    this.displayQuiz();
                } else {
                    const randomIndex = Math.floor(Math.random() * data.length);
                    const questionObj = data[randomIndex];
                    const unsplash = new Unsplash({
                        accessKey: process.env.REACT_APP_UNSPLASH_KEY,
                        secret: process.env.REACT_APP_UNSPLASH_SECRET_KEY
                    });
                    unsplash.search.photos(
                        questionObj.answer,
                        1,
                        1
                    )
                        .then(toJson)
                        .then(res => {
                            questionObj.quizAnswerImage = res.results[0].urls.regular
                            quizArr.push(questionObj);
                        })
                        .then(quizArr.push(questionObj))
                        .catch(err => console.log(err));
                }
            }
        }
    }
    displayQuiz = () => {
        if (this.state.quizQuestions.length > 9) {
            const quiz = this.state.quizQuestions[0];
            this.setState({
                quizQuestion: quiz[0].question,
                quizAnswer: quiz[0].answer,
                quizAnswerImage: quiz[0].quizAnswerImage,
                questionCard: "question-card",
                quizIndex: 0
            });
        } else {
            setTimeout(() => {
                const quiz = this.state.quizQuestions[0];
                this.setState({
                    quizQuestion: quiz[0].question,
                    quizAnswer: quiz[0].answer,
                    quizAnswerImage: quiz[0].quizAnswerImage,
                    questionCard: "question-card",
                    quizIndex: 0
                });
            }, 1000);
        }
    }
    quizNext = () => (event) => {
        event.preventDefault();
        const nextIndex = this.state.quizIndex + 1;
        this.setState({
            quizQuestion: this.state.quizQuestions[0][nextIndex].question,
            quizAnswer: this.state.quizQuestions[0][nextIndex].answer,
            quizAnswerImage: this.state.quizQuestions[0][nextIndex].quizAnswerImage,
            questionCard: "question-card",
            quizIndex: nextIndex
        });
    }
    quizLast = () => (event) => {
        event.preventDefault();
        const lastIndex = this.state.quizIndex - 1;
        this.setState({
            quizQuestion: this.state.quizQuestions[0][lastIndex].question,
            quizAnswer: this.state.quizQuestions[0][lastIndex].answer,
            quizAnswerImage: this.state.quizQuestions[0][lastIndex].quizAnswerImage,
            questionCard: "question-card",
            quizIndex: lastIndex
        });
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
    resetStudy = () => (event) => {
        event.preventDefault();
        this.setState({
            progressValue: 0,
            data: data,
            answeredQuestions: []
        });
    }
    resetQuiz = () => (event) => {
        event.preventDefault();
        this.setState({
            progressValue: 0,
            quizQuestions: []
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
    studyMode = () => (event) => {
        event.preventDefault();
        this.setState({
            mode: "study",
            progressValue: 0
        });
        this.randomQuestion();
    }
    quizMode = () => (event) => {
        event.preventDefault();
        this.setState({
            mode: "quiz",
            progressValue: 0
        });
        this.createQuiz();
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
                                        {this.state.topic}
                                    </p>
                                </div>
                            </Column>
                            <Column size="md-1">
                                <div className="twenty-margin-top">
                                    <Button
                                        action={this.studyMode()}
                                        buttonClass="study"
                                        text="Study"
                                    />
                                </div>
                            </Column>
                            <Column size="md-1">
                                <div className="twenty-margin-top">
                                    <Button
                                        action={this.quizMode()}
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
                                {this.state.mode === "study" ? (
                                    <Question
                                        card={this.state.questionCard}
                                        flip={this.flipCard()}
                                        question={this.state.question}
                                        answer={this.state.answer}
                                        answerImage={this.state.answerImage}
                                    />
                                ) : (
                                        <Question
                                            card={this.state.questionCard}
                                            flip={this.flipCard()}
                                            question={this.state.quizQuestion}
                                            answer={this.state.quizAnswer}
                                            answerImage={this.state.quizAnswerImage}
                                        />
                                    )}

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
                                    {this.state.mode === "study" ? (
                                        <Button
                                            buttonClass="quiz"
                                            action={this.nextQuestion()}
                                            text="Next"
                                        />
                                    ) : (
                                            <Button
                                                buttonClass="quiz"
                                                action={this.quizNext()}
                                                text="Next"
                                            />
                                        )}
                                    {this.state.mode === "study" ? (
                                        <Button
                                            buttonClass="repeat"
                                            action={this.showQuestion()}
                                            text="Show Question"
                                        />
                                    ) : (
                                            <Button
                                                buttonClass="repeat"
                                                action={this.showQuestion()}
                                                text="Show Question"
                                            />
                                        )}
                                    {this.state.mode === "study" ? (
                                        <Button
                                            buttonClass="show-answer"
                                            action={this.showAnswer()}
                                            text="Show Answer"
                                        />
                                    ) : (
                                            <Button
                                                buttonClass="show-answer"
                                                action={this.showAnswer()}
                                                text="Show Answer"
                                            />
                                        )}
                                    {this.state.mode === "study" ? (
                                        <Button
                                            buttonClass="previous"
                                            action={this.previousQuestion()}
                                            text="Previous Question"
                                        />
                                    ) : (
                                            <Button
                                                buttonClass="previous"
                                                action={this.quizLast()}
                                                text="Previous Question"
                                            />
                                        )}
                                </div>
                            </Column>
                            <Column size="md-1">
                                <div className="ten-margin-top twenty-margin-bottom">
                                    {this.state.mode === "study" ? (
                                        <Button
                                            buttonClass="reset"
                                            action={this.resetStudy()}
                                            text="Reset"
                                        />
                                    ) : (
                                            <Button
                                                buttonClass="reset"
                                                action={this.quizMode()}
                                                text="Reset"
                                            />
                                        )}
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