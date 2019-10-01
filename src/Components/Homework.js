import React from 'react';
import Quiz from '../Containers/Quiz';
import QuizList from './QuizList';
import instance from '../Utility/auxiliary';
import quiz from '../Assets/Quizzes/introQuiz';

const Homework = props => {
console.log(quiz);
  const quizzes = [quiz]
  // function contentLoader() {
  //   console.log('contentLoader');
  //   instance.get('/BING')
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }
  //
  // contentLoader()

  return (
    <div className="homework">
      <h1>Homework</h1>
      <QuizList quizzes={quizzes}/>
    </div>
  )
}

export default Homework;
