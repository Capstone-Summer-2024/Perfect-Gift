import React, { useState } from "react";
import styles from "./GeneratedQuestions.module.css";

const GeneratedQuestions = ({ giftId, questions, onSubmit }) => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data to be sent
    const data = JSON.stringify({ answers });

    fetch(`http://localhost:5001/api/gifts/${giftId}/answers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Generated Gift Items:", data.items); // Log the gift items to the console
        onSubmit(data.items); // Call the onSubmit prop to handle the answers
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
