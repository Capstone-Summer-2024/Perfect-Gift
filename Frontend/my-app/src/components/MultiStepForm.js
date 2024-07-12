import React, { useState } from "react";
import styles from "./MultiStepForm.module.css";
import GeneratedQuestions from "./GeneratedQuestions";
import GiftSuggestions from "./GiftSuggestions";
import UserSelectionButton from "./UserSelectionButton"; // Import the new component
import PopupWarning from "./PopupWarning"; // Import the new component

// Importing the icons
import maleIcon from "../assets/man.png";
import femaleIcon from "../assets/women.png";
import otherIcon from "../assets/non-binary.png";
import coworkerIcon from "../assets/coworker.png";
import friendIcon from "../assets/friend.png";
import familyIcon from "../assets/family.png";
import significantOtherIcon from "../assets/significantother.png";
import birthdayIcon from "../assets/happy-birthday.png";
import christmasIcon from "../assets/christmas.png";
import valentinesIcon from "../assets/valentines.png";
import graduationIcon from "../assets/graduation.png";
import justBecauseIcon from "../assets/justbecause.png";
import weddingIcon from "../assets/wedding.png";

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
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);
  const [giftId, setGiftId] = useState(null); // Add giftId state
  const [suggestedItems, setSuggestedItems] = useState([]); // State for suggested items
  const [showPopup, setShowPopup] = useState(false); // State for showing the popup

  const nextStep = () => {
    if (
      (step === 1 && !formData.gender) ||
      (step === 2 && formData.age === 0) ||
      (step === 3 && !formData.relation) ||
      (step === 4 && !formData.occasion)
    ) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000); // Hide the popup after 3 seconds
      return;
    }
    setStep(step + 1);
  };

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

  const handleQuestionSubmit = (items) => {
    // Handle the items submitted by the user
    setSuggestedItems(items);
    setShowQuestions(false); // Hide the QuestionForm after submission
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
        setQuestions(data.suggestion);
        setGiftId(data.gift._id); // Store the giftId
        setShowQuestions(true); // Show the questions form
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const progress = (step / 5) * 100;

  return (
    <div className={styles.pageContainer}>
      <PopupWarning message="Please make a selection" show={showPopup} />
      {!showQuestions && suggestedItems.length === 0 ? (
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
              <div className={styles.selectionButtonContainer}>
                <UserSelectionButton
                  selection="Male"
                  selectedValue={formData.gender}
                  handleSelection={handleGenderSelection}
                  label="Male"
                  iconSrc={maleIcon}
                />
                <UserSelectionButton
                  selection="Female"
                  selectedValue={formData.gender}
                  handleSelection={handleGenderSelection}
                  label="Female"
                  iconSrc={femaleIcon}
                />
                <UserSelectionButton
                  selection="Other"
                  selectedValue={formData.gender}
                  handleSelection={handleGenderSelection}
                  label="Other"
                  iconSrc={otherIcon}
                />
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
              <div className={styles.selectionButtonContainer}>
                <UserSelectionButton
                  selection="Coworker"
                  selectedValue={formData.relation}
                  handleSelection={handleRelationSelection}
                  label="Coworker"
                  iconSrc={coworkerIcon}
                />
                <UserSelectionButton
                  selection="Friend"
                  selectedValue={formData.relation}
                  handleSelection={handleRelationSelection}
                  label="Friend"
                  iconSrc={friendIcon}
                />
                <UserSelectionButton
                  selection="Family"
                  selectedValue={formData.relation}
                  handleSelection={handleRelationSelection}
                  label="Family"
                  iconSrc={familyIcon}
                />
                <UserSelectionButton
                  selection="Significant Other"
                  selectedValue={formData.relation}
                  handleSelection={handleRelationSelection}
                  label="Significant Other"
                  iconSrc={significantOtherIcon}
                />
              </div>
              <div className={styles.buttonContainer}>
                <button onClick={prevStep}>Back</button>
                <button onClick={nextStep}>Next</button>
              </div>
            </div>
          )}
          {step === 4 && (
            <div>
              <div className={styles.selectionButtonContainer}>
                <UserSelectionButton
                  selection="Birthday"
                  selectedValue={formData.occasion}
                  handleSelection={handleOccasionSelection}
                  label="Birthday"
                  iconSrc={birthdayIcon}
                />
                <UserSelectionButton
                  selection="Christmas"
                  selectedValue={formData.occasion}
                  handleSelection={handleOccasionSelection}
                  label="Christmas"
                  iconSrc={christmasIcon}
                />
                <UserSelectionButton
                  selection="Valentines"
                  selectedValue={formData.occasion}
                  handleSelection={handleOccasionSelection}
                  label="Valentines"
                  iconSrc={valentinesIcon}
                />
                <UserSelectionButton
                  selection="Graduation"
                  selectedValue={formData.occasion}
                  handleSelection={handleOccasionSelection}
                  label="Graduation"
                  iconSrc={graduationIcon}
                />
                <UserSelectionButton
                  selection="Wedding"
                  selectedValue={formData.occasion}
                  handleSelection={handleOccasionSelection}
                  label="Wedding"
                  iconSrc={weddingIcon}
                />
                <UserSelectionButton
                  selection="Just Because"
                  selectedValue={formData.occasion}
                  handleSelection={handleOccasionSelection}
                  label="Just Because"
                  iconSrc={justBecauseIcon}
                />
              </div>
              <div className={styles.buttonContainer}>
                <button onClick={prevStep}>Back</button>
                <button onClick={nextStep}>Next</button>
              </div>
            </div>
          )}
          {step === 5 && (
            <div className={styles.labelContainer}>
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
      ) : (
        <div>
          {showQuestions && (
            <GeneratedQuestions
              questions={questions}
              giftId={giftId}
              onSubmit={handleQuestionSubmit}
            />
          )}
          {suggestedItems.length > 0 && (
            <GiftSuggestions items={suggestedItems} />
          )}
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
