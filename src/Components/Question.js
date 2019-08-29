import React from 'react';

function question(props) {

return (
  <div className="question" id={props.questionId}>
    <p>{props.question}</p>
    <input type="radio" name={props.answer1}/> is this it? <br/>
  </div>
)

}
export default question;
