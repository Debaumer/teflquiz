import React from 'react';
import {Link} from 'react-router-dom';


const QuizList = (props) => {
  let listContent = null;
  if(props.quizzes) {
    console.log(props.quizzes);
    listContent = props.quizzes.map(item => {
      return (
        <div key={item.id}>
          <Link to={{
            pathname:`/homework/quiz/${item.name}`,
            state: {
              fromHomeworkPage: true,
              content: item.content
            }
          }}>The first quiz to test your skills</Link>
          <p>{item.description}</p>
        </div>
      )
    })
  }

  return (
    <div className="quizList">
      {listContent}
    </div>
  )
}

export default QuizList;
