import React, {Component} from 'react';
import './App.css';
import Register from './Containers/Register';
import Quiz from './Containers/Quiz';
import Answers from './Containers/Answers';
import instance from './Utility/auxiliary';


class App extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    nameEntered: false,
    name: '',
    displayQuiz: 'hidden',
    errorMessage: '',
    hideRegister: false
  }

  componentDidMount() {
    window.scrollTo(0,0);
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
    instance.post(`/${name}.json`,{firstname: name})
    .then(res => {
      console.log(res);
      this.setState({
        hideRegister: true,
        displayQuiz: 'visible',
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
        <Register hide={this.state.hideRegister} error={this.state.errorMessage} submit={(e) => this.handleSubmit(e)}/>
        <Quiz display={this.state.displayQuiz} name={this.state.name}/>
        <Answers display={this.state.displayAnswers}/>
      </div>
    );
  }
}

export default App;
