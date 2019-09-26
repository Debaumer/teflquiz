import React, {Component} from 'react';
import Question from '../Components/Question';
import instance from '../Utility/auxiliary';

class Quiz extends Component {
  state = {
    content: null,
    testIsComplete: false,
    completeTest: [],
    answers: []
  };

  async componentDidMount() {

    await this.setState({
      content: this.props.quiz,
      loaded: true
    });

    if(this.props.displayQuiz) {
      this.setState({
        displayQuiz: true
      })
    }

    let array = [];
    for(var i = 0; i < this.state.content.length; i++) {
      array.push(this.state.content[i].correctAnswerIndex)
    }

    this.setState({
      answers: array
    })
  }

  handleRadialClick(e, index, question) {
    let completeTestCopy = this.state.completeTest;

    const questionObject = {
      answerCode: index,
      selected: e.target.value
    }

    if(this.state.completeTest.length < 1) {
      console.log('new array!');
      completeTestCopy.push(questionObject);
    } else {
      for(var i = 0; i < completeTestCopy.length; i++) {
        if(completeTestCopy[i].answerCode === index) {
          console.log('already in array');
          completeTestCopy[i] = questionObject;
        } else {
          console.log('not in array');
          completeTestCopy.push(questionObject);
        }
      }
    }

    this.setState({
      completeTest: completeTestCopy
    })
  }

  async handleFormSubmit(e) {
    e.preventDefault();
    var array = [];
    for(var i = 0; i < e.target.length; i++) {
      if(e.target[i].checked) {
        var answer = e.target[i].value;
        var answerCode = e.target[i].getAttribute('index');
        var item = {answer, correct: null, answerCode};
        array.push(item);
      }
    }
    if(array.length < this.state.answers.length) {
      this.setState({
        errorMessage: 'please fill out every question!'
      })
      return;
    }

    for(var j = 0; j < this.state.answers.length; j++) {
      if(this.state.answers[j] == array[j].answerCode) {
        array[j].correct = true;
      } else {
        array[j].correct = false;
      }
      await this.setState({
        completeTest: array,
        testIsComplete: true
      })
    }
    this.props.testComplete(array, this.state.completeTest);
    instance.post(`/${this.props.name}/introQuizAnswers.json`, {answers: array, completedAt: new Date()})
  }

  render() {
    let questions = null;
    if(this.state.loaded) {
      questions = this.state.content.map((item, index) => {
        return (
          <Question question={item.question} key={index} index={index} answers={item.answers || null}/>
        );
      })
    }
    let displayValue;
    if(this.props.displayQuiz) {
      displayValue = 'block'
    } else {
      displayValue = 'none'
    }

    return(
      <div className="quiz" style={{
        display: displayValue
      }}>
        <form onSubmit={(e) => this.handleFormSubmit(e)}>
        {questions}
        <p style={{color: 'red'}}>{this.state.errorMessage}</p>
        <input style={{
          cursor: 'pointer',
          padding: '20px',
          margin: '20px',
          borderRadius: '20px',
          color: 'white',
          border: 'none',
          backgroundColor: 'blue'
        }}
          type="submit" value="Submit Answers"/>
        </form>
      </div>
    )
  }
}

export default Quiz;
