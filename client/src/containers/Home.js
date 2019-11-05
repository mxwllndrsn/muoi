import React, { Component } from "react";
import { Container, Row, Column } from "../components/Grid";
import Button from "../components/Button";
import Question from "../components/Question";
import data from "../data/data";
import "./Assets/CSS/style.css";

class Home extends Component {
    state = {
        data: data,
        questionCard: "question-card",
        question: "Here is the question",
        answer: "Here is the answer",
        answerImage: "https://images.unsplash.com/photo-1520525003249-2b9cdda513bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
    }
    componentWillMount() {
        // console.log(this.state.data);
    }
    flipCard = () => (event) => {
        event.preventDefault();
        if (this.state.questionCard === "question-card") {
            this.setState({ questionCard: "question-card is-flipped" });
        } else {
            this.setState({ questionCard: "question-card" });
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
                        </Row>
                    </Column>
                </Row>
            </Container>
        )
    }
}

export default Home;