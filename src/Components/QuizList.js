import React from 'react';


const QuizList = (props) => {

  const listItems = props.quizzes.map(item => {
    console.log('mounted quizzlist');
    return (
      <div key={item.id}>
        <h4>{item.id}</h4>
        <p>{item.description}</p>
      </div>
    )
  })

  return (
    <div className="quizList">
      {listItems}
    </div>
  )
}

export default QuizList;
