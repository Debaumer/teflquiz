import React from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './Containers/Register';
import Quiz from './Containers/Quiz';
import Answers from './Containers/Answers';

function App() {
  return (
    <div className="App">
      <Register/>
      <Quiz/>
      <Answers/>
    </div>
  );
}

export default App;
