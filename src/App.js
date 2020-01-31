import React, { useReducer } from 'react';
import './App.css';
// components
import Progress from './Components/Progress';
import Question from './Components/Question';
import Answers from './Components/Answers';

import {
  SET_ANSWERS,
  SET_CURRENT_QUESTION,
  SET_CURRENT_ANSWER,
  SET_ERROR,
  SET_SHOW_RESULTS,
  RESET_QUIZ
} from './reducers/types';

const quizReducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_ANSWER:
      return {
        ...state,
        // might switch to action.currentAnswer
        currentAnswer: action.currentAnswer
      };
    case SET_CURRENT_QUESTION:
      return {
        ...state,
        // might switch to action.currentAnswer
        currentQuestion: action.currentQuestion
      };
    case SET_ERROR:
      return {
        ...state,
        // might switch to action.currentAnswer
        error: action.error
      };
    case SET_SHOW_RESULTS:
      return {
        ...state,
        // might switch to action.currentAnswer
        showResults: action.showResults
      };
    case SET_ANSWERS:
      return {
        ...state,
        // might switch to action.currentAnswer
        setAnswers: action.setAnswers
      };
    case RESET_QUIZ:
      return {
        ...state,
        // might switch to action.currentAnswer
        answers: [],
        currentQuestion: 0,
        currentAnswer: '',
        showResults: false,
        error: ''
      };
    default:
      return state;
  }
};

function App() {
  const initialState = {
    currentQuestion: 0,
    currentAnswer: '',
    answers: [],
    showResults: false,
    error: ''
  };

  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { currentQuestion, currentAnswer, answers, showResults, error } = state;

  const questions = [
    {
      id: 1,
      question: 'Which statement about Hooks is not true?',
      answer_a:
        'Hooks are 100% backwards-compatible and can be used side by side with classes',
      answer_b: 'Hooks are still in beta and not available yet',
      answer_c:
        "Hooks are completely opt-in, there's no need to rewrite existing code",
      answer_d: 'All of the above',
      correct_answer: 'b'
    },
    {
      id: 2,
      question: 'Which one is not a Hook?',
      answer_a: 'useState()',
      answer_b: 'useConst()',
      answer_c: 'useReducer()',
      answer_d: 'All of the above',
      correct_answer: 'b'
    },
    {
      id: 3,
      question: 'What Hook should be used for data fetching?',
      answer_a: 'useDataFetching()',
      answer_b: 'useApi()',
      answer_c: 'useEffect()',
      answer_d: 'useRequest()',
      correct_answer: 'c'
    }
  ];

  const question = questions[currentQuestion];

  const renderError = () => {
    if (!error) {
      return;
    }
    return <div className='error'>{error}</div>;
  };

  const renderResultMark = (question, answer) => {
    if (question.correct_answer === answer.answer) {
      return <span className='correct'>Correct</span>;
    }
    return <span className='failed'>Failed</span>;
  };

  const renderResultsData = () => {
    return answers.map(answer => {
      const question = questions.find(
        question => question.id === answer.questionID
      );
      return (
        <div key={question.id}>
          {question.question} - {renderResultMark(question, answer)}
        </div>
      );
    });
  };

  const restart = () => {
    dispatch({ type: RESET_QUIZ });
  };

  const next = () => {
    const answer = { questionID: question.id, answer: currentAnswer };
    if (!currentAnswer) {
      dispatch({ type: SET_ERROR, error: 'Please select an option' });
      return;
    }
    answers.push(answer);
    dispatch({ type: SET_ANSWERS, answers });

    dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: '' });

    if (currentQuestion + 1 < questions.length) {
      dispatch({
        type: SET_CURRENT_QUESTION,
        currentQuestion: currentQuestion + 1
      });

      return;
    }

    dispatch({ type: SET_SHOW_RESULTS, showResults: 'true' });
  };

  if (showResults) {
    return (
      <div className='container results'>
        <h2>Results</h2>
        <ul>{renderResultsData()}</ul>
        <button className='btn btn-primary' onClick={restart}>
          Restart
        </button>
      </div>
    );
  } else {
    return (
      <div className='container'>
        <Progress total={questions.length} current={currentQuestion + 1} />
        <Question question={question.question} />
        {renderError()}
        <Answers
          question={question}
          currentAnswer={currentAnswer}
          dispatch={dispatch}
        />
        <button className='btn btn-primary' onClick={next}>
          Confirm and continue
        </button>
      </div>
    );
  }
}
export default App;
