import React, {Component} from 'react';
import Question from '../Components/Question';
import quiz from '../Assets/Questions';
import instance from '../Utility/auxiliary';

class Quiz extends Component {
  state = {
    currentPage: null,
    content: null,
    completeTest: [],
    answers: []
  };

  async componentDidMount() {

    await this.setState({
      content: quiz,
      loaded: true
    });

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
        var item = new Object({answer, correct: null, answerCode});
        array.push(item);
      }
    }

    if(array.length < this.state.answers.length) {
      this.setState({
        errorMessage: 'please fill out every answer!'
      })
      return;
    }

    console.log(array);
    for(var j = 0; j < this.state.answers.length; j++) {
      console.log(this.state.answers[j] == array[j].answerCode);
      if(this.state.answers[j] == array[j].answerCode) {
        console.log('correct!');
        array[j].correct = true;
      } else {
        console.log('false');
        array[j].correct = false;
      }
      console.log(array);
      this.setState({
        completeTest: array
      })
      // if(array[j] === undefined) {
      //   console.log('answer is', this.state.answers[j]);
      // }
      // else if (this.state.answers[j] === array[j].answerCode) {
      //   console.log(this.state.answers[j], array[j].answerCode);
      //   console.log('correct!');
      // } else {
      //   //do nothing
      // }
    }

    instance.post(`/${this.props.name}/introQuizAnswers.json`, {answers: array})
    // var formData = new FormData(e.target);
  }

  render() {
    let questions = null;
    if(this.state.loaded) {
      questions = this.state.content.map((item, index) => {
        return (
          <Question question={item.question} key={index} index={index} answers={item.answers}/>
        );
      })
    }

    return(
      <div className="quiz" style={{
        visibility: this.props.display,
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
