import React, { useState } from "react";
import styles from "./GeneratedQuestions.module.css";

const GeneratedQuestions = ({ questions, onSubmit }) => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(answers);
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h3>Please answer the following questions:</h3>
      {questions.map((question, index) => (
        <div key={index} className={styles.questionContainer}>
          <label>{question}</label>
          <input
            type="text"
            value={answers[index]}
            onChange={(e) => handleChange(index, e.target.value)}
          />
        </div>
      ))}
      <button type="submit" className={styles.submitButton}>
        Submit Answers
      </button>
    </form>
  );
};

export default GeneratedQuestions;
