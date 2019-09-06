import React from 'react';

function question(props) {

const questionStyle = {
  border: '1px black solid',
  borderRadius: '20px',
  margin: '20px',
  padding: '20px',
  display: 'flex',
  flexFlow: 'nowrap column',
  alignItems: 'flex-start'
}

const radioStyle = {
  padding: '5px'
}

const itemsList = {
  display: 'flex',
  flexFlow: 'nowrap column',
  alignItems: 'flex-start',
  paddingLeft: '20px'
}

const radioButtonStyle = {
  cursor: 'pointer',
  top: '0',
  left: '0',
  height: '30px',
  width: '30px',
  borderRadius: '50%',
  backgroundColor: '#eee',
  opacity: '1',
}

const textareaStyle = {
  font: 'sans-serif',
  borderRadius: '20px',
  border: '3px black solid',
}

let answers = props.answers.map((item, index) => {
  return (
    <div style={radioStyle} key={item}> <input index={index} style={radioButtonStyle} name={props.question} type="radio" value={item}/> {item}</div>
  )
})

if(!answers) {
  answers = <textarea style={textareaStyle} className="answer"></textarea>;
}

return (
  <div style={questionStyle} className="question" id={props.questionId}>
    <div style={itemsList}>
      <h1>Question {props.index+1}</h1>
      <h4>{props.question}</h4>
      {answers}
    </div>
  </div>
)

}

export default question;
