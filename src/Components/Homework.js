import React from 'react';
import Quiz from '../Containers/Quiz';
import QuizList from './QuizList';
import instance from '../Utility/auxiliary';
import HwItem from './HwItem';
import quiz from '../Assets/Quizzes/introQuiz';
import testQuiz from '../Assets/Quizzes/testQuiz';

const Homework = props => {
  const quizzes = [quiz]
  const homeworkItems = quizzes.map((item, index) => {
    return null;
  });

  return (
    <div className="homework" key={Math.random()}>
      <h1>Homework</h1>
      <HwItem title={'introQuiz'} type={'quiz'} content={testQuiz} />
    </div>
  )
}

export default Homework;
