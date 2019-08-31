import React from 'react';

function answer(props) {

  let answerStyle = {
    color: props.correct ? 'green' : 'red',
  };
  let containerStyle = {
    border: '1px solid black',
    borderRadius: '20px',
    marginBottom: '20px'
  }
  return (
    <div className="answer" style={containerStyle}>
      <h1>Question {props.index+1}</h1>
      <p style={{fontSize: '24px'}}>{props.correct ? '✅': '❌'}</p>
      <h4><em>{props.question}</em></h4>
      <h4 style={answerStyle}>{props.answer}</h4>
    </div>
  )
}

export default answer;
