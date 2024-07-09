import React, { useState } from "react";
import styles from "./MultiStepForm.module.css";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gender: "",
    relation: "",
    age: 0, // Default age
    occasion: "",
    interests: "",
    budget: 0,
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleGenderSelection = (gender) => {
    setFormData({ ...formData, gender });
  };

  const handleRelationSelection = (relation) => {
    setFormData({ ...formData, relation });
  };

  const handleOccasionSelection = (occasion) => {
    setFormData({ ...formData, occasion });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAgeChange = (e) => {
    setFormData({ ...formData, age: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data to be sent
    const data = JSON.stringify(formData);

    fetch("http://localhost:5001/api/gifts/", {
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
        console.log("Success:", data);
        window.location.reload(); // Refresh the page after form submission
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const progress = (step / 5) * 100;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <h3>Step {step}</h3>
        <div className={styles.progressBarContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        {step === 1 && (
          <div>
            <div className={styles.genderButtonContainer}>
              <button
                className={`${styles.genderButton} ${
                  formData.gender === "Male" ? styles.selected : ""
                }`}
                onClick={() => handleGenderSelection("Male")}
              >
                <span className={styles.genderIcon}>♂️</span> Male
              </button>
              <button
                className={`${styles.genderButton} ${
                  formData.gender === "Female" ? styles.selected : ""
                }`}
                onClick={() => handleGenderSelection("Female")}
              >
                <span className={styles.genderIcon}>♀️</span> Female
              </button>
              <button
                className={`${styles.genderButton} ${
                  formData.gender === "Other" ? styles.selected : ""
                }`}
                onClick={() => handleGenderSelection("Other")}
              >
                <span className={styles.genderIcon}>⚧</span> Other
              </button>
            </div>

            <div className={styles.buttonContainer}>
              <div></div>
              <button onClick={nextStep}>Next</button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <div className={styles.sliderContainer}>
              <label>Age: {formData.age}</label>
              <input
                type="range"
                name="age"
                min="1"
                max="100"
                value={formData.age}
                onChange={handleAgeChange}
                className={styles.rangeInput}
              />
              <div className={styles.ageDisplay}>{formData.age}</div>
            </div>
            <div className={styles.buttonContainer}>
              <button onClick={prevStep}>Back</button>
              <button onClick={nextStep}>Next</button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <div className={styles.genderButtonContainer}>
              <button
                className={`${styles.genderButton} ${
                  formData.relation === "Coworker" ? styles.selected : ""
                }`}
                onClick={() => handleRelationSelection("Coworker")}
              >
                <span className={styles.genderIcon}>♂️</span> Coworker
              </button>
              <button
                className={`${styles.genderButton} ${
                  formData.relation === "Friend" ? styles.selected : ""
                }`}
                onClick={() => handleRelationSelection("Friend")}
              >
                <span className={styles.genderIcon}>♀️</span> Friend
              </button>
              <button
                className={`${styles.genderButton} ${
                  formData.relation === "Family" ? styles.selected : ""
                }`}
                onClick={() => handleRelationSelection("Family")}
              >
                <span className={styles.genderIcon}>⚧</span> Family
              </button>
              <button
                className={`${styles.genderButton} ${
                  formData.relation === "Significant Other"
                    ? styles.selected
                    : ""
                }`}
                onClick={() => handleRelationSelection("Significant Other")}
              >
                <span className={styles.genderIcon}>⚧</span> Significant Other
              </button>
            </div>
            <div className={styles.buttonContainer}>
              <button onClick={prevStep}>Back</button>
              <button onClick={nextStep}>Next</button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div>
            <div className={styles.genderButtonContainer}>
              <button
                className={`${styles.genderButton} ${
                  formData.occasion === "Birthday" ? styles.selected : ""
                }`}
                onClick={() => handleOccasionSelection("Birthday")}
              >
                <span className={styles.genderIcon}>♂️</span> Birthday
              </button>
              <button
                className={`${styles.genderButton} ${
                  formData.occasion === "Christmas" ? styles.selected : ""
                }`}
                onClick={() => handleOccasionSelection("Christmas")}
              >
                <span className={styles.genderIcon}>♀️</span> Christmas
              </button>
              <button
                className={`${styles.genderButton} ${
                  formData.occasion === "Valentines" ? styles.selected : ""
                }`}
                onClick={() => handleOccasionSelection("Valentines")}
              >
                <span className={styles.genderIcon}>⚧</span> Valentines
              </button>
              <button
                className={`${styles.genderButton} ${
                  formData.occasion === "Graduation" ? styles.selected : ""
                }`}
                onClick={() => handleOccasionSelection("Graduation")}
              >
                <span className={styles.genderIcon}>⚧</span> Graduation
              </button>
              <button
                className={`${styles.genderButton} ${
                  formData.occasion === "Just Beacuse" ? styles.selected : ""
                }`}
                onClick={() => handleOccasionSelection("Just Beacuse")}
              >
                <span className={styles.genderIcon}>⚧</span> Just Because
              </button>
            </div>
            <div className={styles.buttonContainer}>
              <button onClick={prevStep}>Back</button>
              <button onClick={nextStep}>Next</button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <label>
              Type any interest known or just type I don't know
              <input
                type="text"
                name="interests"
                value={formData.interests || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Type in your Budget for the gift
              <input
                type="number"
                name="budget"
                value={formData.budget || ""}
                onChange={handleChange}
              />
            </label>
            <div className={styles.buttonContainer}>
              <button onClick={prevStep}>Back</button>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
