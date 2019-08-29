import React, {Component} from 'react';
import Question from '../Components/Question';
import quiz from '../Assets/Questions';

class Quiz extends Component {
  state = {
    currentPage: null,
    quiz: null
  };

  async componentDidMount() {
    await this.setState({
      quiz: quiz
    })
  }

  render() {
    console.log(this.state.quiz);
    return(
      <div className="quiz">
        <Question question1='is this it?'/>
        <button>Next</button>
      </div>
    )
  }
}

export default Quiz;
