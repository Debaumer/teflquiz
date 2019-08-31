import React, {Component} from 'react';
import quiz from '../Assets/Questions.js';
import Answer from '../Components/Answer';
import instance from '../Utility/auxiliary';

class Answers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      userResponse: []
    }
  }

  componentDidMount() {

  }

  componentDidUpdate() {

  }

  render() {
    let answers = null;
    if(this.props.displayAnswers) {
      window.scrollTo(0,0)
      answers = this.props.answers.map((item, index) => {
        return (
          <Answer question={quiz[index].question} key={index} index={index} correct={item.correct} answer={item.answer}/>
        )
      })
    }
    return(
      <div className="answersPage">
        {answers}
      </div>
    )
  }
}

export default Answers;
