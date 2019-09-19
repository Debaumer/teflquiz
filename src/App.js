import React, {Component} from 'react';
import './App.css';
import Register from './Containers/Register';
import Quiz from './Containers/Quiz';
import Answers from './Containers/Answers';
import Auth from './Containers/Auth';
import instance from './Utility/auxiliary';
import quiz from './Assets/Questions';
import {Link, BrowserRouter} from 'react-router-dom';


class App extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.testComplete = this.testComplete.bind(this);
  }
  state = {
    nameEntered: false,
    name: '',
    displayQuiz: false,
    errorMessage: '',
    hideRegister: false,
    displayAnswers: false
  }

  componentDidMount() {
    window.scrollTo(0,0);
  }

  testComplete(array, answers, complete) {
    console.log(arguments);
    this.setState({
      answers: array,
      correctAnswerList: answers,
      displayAnswers: true,
      displayQuiz: false
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    if(e.target[0].value.length === 0) {
      this.setState({
        errorMessage: 'Please enter a name'
      })
      return;
    }
    const name = e.target[0].value;
    instance.post(`/${name}.json`,{firstname: name, beganAt: new Date()})
    .then(res => {
      console.log('response', res);
      this.setState({
        hideRegister: true,
        displayQuiz: true,
        name: name
      })
    })
    .catch(error => {
      console.log(error);
      this.setState({
        errorMessage: 'there is an error'
      })
    })
  }

  render() {
    return (
      <div className="App">
      <BrowserRouter>

      </BrowserRouter>
        <Auth />
        <Register hide={this.state.hideRegister} error={this.state.errorMessage} submit={(e) => this.handleSubmit(e)} />
        <Quiz testComplete={this.testComplete} displayQuiz={this.state.displayQuiz} name={this.state.name} />
        <Answers displayAnswers={this.state.displayAnswers} answers={this.state.answers} quiz={quiz} />
      </div>
    );
  }
}

export default App;
