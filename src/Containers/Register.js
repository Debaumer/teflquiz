import React, {Component} from 'react';
import instance from '../Utility/auxiliary';
import axios from 'axios';

class Register extends Component {
  state = {}

  handleSubmit(event) {
    event.preventDefault();
    console.log(event.target[0].value);
    instance.post(`/${event.target[0].value}.json`,{firstname: event.target[0].value})
    .then(res => console.log(res))
    .catch(error => console.log(error))
  }

  postQuestion() {
    instance.post('/steve/quiz.json', {
      question1: {
        correct: false,
        answerId: 1,
        answer: 'pass'
      }
    })
    .then(res => console.log(res))
    .catch(error => console.log(error))
  }

  render() {

    return (
      <div>
        <form onSubmit={this.handleSubmit} className="register">
          <label htmlFor="firstname">Please Enter your first name</label>
          <input name="firstname" type='text' placeholder='first name'/>
          <input type="submit" value="start quiz"/>
        </form>
        <button onClick={this.postQuestion}>TEST</button>
      </div>
    );
  }
}

export default Register;
