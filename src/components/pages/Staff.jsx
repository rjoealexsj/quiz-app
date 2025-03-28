import React, { useState } from 'react';
import './StaffPage.css';

const Staff = () => {
  const [questionType, setQuestionType] = useState('');
  const [numQuestions, setNumQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState('');

  // Handle form submission to save the questions
  const handleSubmitQuestions = () => {
    const newQuiz = {
      type: questionType,
      questions: questions,
    };

    // Get existing quizzes from localStorage or initialize as an empty array
    const storedQuizzes = JSON.parse(localStorage.getItem('quizzes')) || [];

    // Add the new quiz to the existing quizzes
    storedQuizzes.push(newQuiz);

    // Save the updated quizzes array back to localStorage
    localStorage.setItem('quizzes', JSON.stringify(storedQuizzes));

    setMessage('Quiz created successfully!');
    setQuestions([]);
    setNumQuestions(0);
    setQuestionType('');
  };

  // Handle adding or updating question data
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value,
    };
    setQuestions(updatedQuestions);
  };

  // Handle adding choices for each MCQ question
  const handleChoicesChange = (index, choiceIndex, value) => {
    const updatedQuestions = [...questions];
    const updatedChoices = [...updatedQuestions[index].choices];
    updatedChoices[choiceIndex] = value;
    updatedQuestions[index].choices = updatedChoices;
    setQuestions(updatedQuestions);
  };

  // Handle adding MCQ choices dynamically
  const handleAddChoice = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].choices.push(''); // Add an empty string for a new choice
    setQuestions(updatedQuestions);
  };

  const handleRemoveChoice = (index, choiceIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].choices.splice(choiceIndex, 1);
    setQuestions(updatedQuestions);
  };

  return (
    <div className="staff-container">
      <h2>Create a Quiz</h2>
      <select onChange={(e) => setQuestionType(e.target.value)} value={questionType}>
        <option value="">Select Question Type</option>
        <option value="MCQ">MCQ</option>
        <option value="True or False">True or False</option>
        <option value="Fill in the blanks">Fill in the blanks</option>
      </select>

      <div>
        <label>Number of Questions: </label>
        <input
          type="number"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
        />
      </div>

      <div className="quiz-container">
        {[...Array(Number(numQuestions))].map((_, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Question ${index + 1}`}
              value={questions[index]?.question || ''}
              onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
            />
            <input
              type="text"
              placeholder="Answer"
              value={questions[index]?.answer || ''}
              onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
            />
            
            {/* Handling choices for MCQ */}
            <div className="choices-container">
              <h4>Choices</h4>
              {questions[index]?.choices?.map((choice, choiceIndex) => (
                <div key={choiceIndex} className="choice-input">
                  <input
                    type="text"
                    placeholder={`Choice ${choiceIndex + 1}`}
                    value={choice}
                    onChange={(e) => handleChoicesChange(index, choiceIndex, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveChoice(index, choiceIndex)}
                    className="remove-choice-btn"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddChoice(index)} // Ensure correct `index` is passed here
                className="add-choice-btn"
              >
                Add Choice
              </button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleSubmitQuestions}>Submit Quiz</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Staff;
