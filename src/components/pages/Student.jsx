// Student.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentPage.css';

const Student = () => {
  const [studentName, setStudentName] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [showSorryFace, setShowSorryFace] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser && loggedInUser.username === 'student1') {
      setStudentName(loggedInUser.name);
    } else {
      navigate('/'); // Redirect if not logged in as student
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  const handleTakeQuiz = () => {
    // Fetch quizzes from localStorage
    const storedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    
    // Check if there are quizzes created by the staff
    if (storedQuizzes.length > 0) {
      const selectedQuiz = storedQuizzes[0]; // Select the first quiz for simplicity (you can modify this to let the student choose)
      setCurrentQuiz(selectedQuiz);
      setShowQuiz(true);
      setShowSorryFace(false);
    } else {
      setShowSorryFace(true);
    }
  };

  const handleDeclineQuiz = () => {
    setShowQuiz(false);
    setShowSorryFace(true);
  };

  return (
    <div className="student-page-container">
      <h2>Welcome, {studentName}</h2>

      <div className="quiz-option">
        <button onClick={handleTakeQuiz} className="take-quiz-btn">
          Take the Quiz
        </button>
        <button onClick={handleDeclineQuiz} className="decline-quiz-btn">
          No, Thanks
        </button>
      </div>

      {showQuiz && currentQuiz && (
        <div className="quiz-container">
          <h3>{currentQuiz.type} Quiz</h3>
          <ul>
            {currentQuiz.questions.map((question, index) => (
              <li key={index}>
                <p>{question.question}</p>
                {question.choices && question.choices.map((choice, idx) => (
                  <div key={idx}>
                    <input type="radio" id={`q${index}c${idx}`} name={`q${index}`} />
                    <label htmlFor={`q${index}c${idx}`}>{choice}</label>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      )}

      {showSorryFace && <p className="sorry-message">Sorry, maybe next time! 😞</p>}

      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
  );
};

export default Student;
