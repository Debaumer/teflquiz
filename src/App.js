import React, {Component} from 'react';
import './App.css';
import Quiz from './Containers/Quiz';
import Answers from './Containers/Answers';
import Auth from './Containers/Auth';
import instance from './Utility/auxiliary';
import quiz from './Assets/Quizzes/introQuiz';
import QuizList from './Components/QuizList';
import Spinner from './Shared/UI/Spinner'
import Nav from './Components/Nav';

import Homework from './Components/Homework';
import Exercises from './Components/Exercises';
import Reading from './Components/Reading';
import About from './Components/About';


import {BrowserRouter,Switch, Route, Redirect} from 'react-router-dom';


class App extends Component {
  state = {
    firstname: '',
    idToken: '',
    localId: '',
    isAuthenticated: false,
    nameEntered: false,
    hideRegister: false,
    displayAnswers: false,
    displayQuiz: false,
    loading: false,
    errorMessage: '',
    showNavBar: true,

  }

  componentDidMount() {
    window.scrollTo(0,0);
    this.checkAuthState();
  }

  startLoading() {
    this.setState({
      loading: true
    })
  }

  stopLoading() {
    this.setState({
      loading: false
    })
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

  checkAuthTimeout(expirationTime) {
    setTimeout(() => {
      console.log('session has expired');
      this.logoutHandler();
    }, expirationTime * 1000)
  }

  checkAuthState() {
    const token = localStorage.getItem('token');
    const localId = localStorage.getItem('localId');
    if(!token || !localId) {
      console.log(token, localId);
      this.logoutHandler();
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if(expirationDate < new Date()) {
        console.log(expirationDate, 'is less than', new Date());
        this.logoutHandler();
      } else {
        console.log(expirationDate);
        this.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000);
        this.setState({
          isAuthenticated: true,
          idToken: token,
          localId: localId
        })
      }
    }
  }

  handleAuthSubmit(token, localId, expiresIn) {
    if(!token || !localId) {
      throw new Error('No token(s) to submit!')
    }
    const expirationDate = new Date(new Date().getTime() +  expiresIn * 1000);
    this.setState({
      localId: localId,
      token: token,
      isAuthenticated: true
    })
    this.checkAuthTimeout(expiresIn);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('localId', localId);
    this.stopLoading();
  }

  logoutHandler(e) {
    if(e) {
      e.preventDefault();
    }
    console.log('logged out');
    this.setState({
      firstname: null,
      idToken: null,
      localId: null,
      expirationTime: null,
      isAuthenticated: false
    })
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('localId');
    this.stopLoading();
  }

  toggleNavBar() {
    this.setState(prevState => {
      return {showNavBar: !prevState.showNavBar}
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    if(e.target[0].value.length === 0) {
      this.setState({
        errorMessage: 'Please enter a name'
      })
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
        <Nav
          toggleNavBar={() => this.toggleNavBar()}
          showNavBar={this.state.showNavBar}
          onLogout={e => this.logoutHandler(e)}
          validAuth={this.state.isAuthenticated}
        />
        <Switch>
          <div id="component">
            <Route exact path="/auth"
              render={() => <Auth
                loadingStart={() => this.startLoading()}
                doneLoading={() => this.stopLoading()}
                onAuth={(token, localId, expiresIn) => this.handleAuthSubmit(token, localId, expiresIn)}
                validAuth={this.state.isAuthenticated}
              />
            }/>
            <Route exact path="/homework" render={() => <Homework/>}/>
            <Route exact path="/exercises" render={() => <Exercises/>}/>
            <Route exact path="/reading" render={() => <Reading/>}/>
            <Route exact path="/about" render={() => <About/>}/>
            <Route exact path="/library" render={() => <QuizList/> }/>
            <Route exact path="/quiz/:quizId" render={() =>
              ( <div>
                  <Quiz
                    testComplete={this.state.testComplete}
                    displayQuiz={this.state.displayQuiz}
                    name={this.state.name}/>
                  <Answers
                    displayAnswers={this.state.displayAnswers}
                    answers={this.state.answers}
                    quiz={quiz}/>
                  </div>)
              }/>
          </div>
        </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
