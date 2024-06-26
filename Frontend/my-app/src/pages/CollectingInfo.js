import React, { useState } from "react";
import styles from "./CollectingInfo.module.css";
import { useNavigate } from "react-router-dom";

// Icons
import MaleSymbol from "../assets/MaleSymbol.png";
import FemaleSymbol from "../assets/FemaleSymbol.png";
import OtherGenderSymbol from "../assets/OtherGenderSymbol.png";
import CoworkerIcon from "../assets/CoworkerIcon.png";
import FamilyIcon from "../assets/FamilyIcon.png";
import FriendsIcon from "../assets/FriendsIcon.png";
import YourselfIcon from "../assets/YourselfIcon.png";
import SOIcon from "../assets/SOIcon.png";
import BirthdayIcon from "../assets/BirthdayIcon.png";
import GraduationIcon from "../assets/GraduationIcon.png";
import ValentineIcon from "../assets/ValentineIcon.png";
import BecauseIcon from "../assets/BecauseIcon.png";
import ChristmasIcon from "../assets/ChristmasIcon.png";
import OtherOcIcon from "../assets/OtherOcIcon.png";

function CollectingInfo() {
  const [state, setState] = useState({
    gender: "",
    age: 50,
    relation: "",
    occasion: "",
    interests: [],
    budget: ""
  });

  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setState(prevState => ({ ...prevState, [field]: value }));
  };

  const handleInterestChange = (interest) => {
    const currentInterests = state.interests;
    const index = currentInterests.indexOf(interest);
    if (index > -1) {
      currentInterests.splice(index, 1);
    } else {
      currentInterests.push(interest);
    }
    setState(prevState => ({ ...prevState, interests: [...currentInterests] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state)
      });
      const result = await response.json();
      if (response.ok) {
        navigate('/confirmation', { state: { recommendations: result.recommendations } });
      } else {
        console.error("Failed to submit:", result.error);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  

  return (
    <div className={styles.collectingInfo}>
      <p style={{ fontWeight: "bold", fontSize: "50px", marginBottom: "-20px" }}>
        Welcome to Perfect Gift!
      </p>
      <p style={{ fontWeight: "bold", fontStyle: "italic", fontSize: "x-large", marginBottom: "100px" }}>
        Here we can help you choose the perfect gift for your significant others, friends, and family!
      </p>

      <form onSubmit={handleSubmit}>
        <ChooseGender gender={state.gender} setGender={(gender) => handleInputChange('gender', gender)} />
        <ChooseAge age={state.age} setAge={(age) => handleInputChange('age', age)} />
        <ChooseRelation relation={state.relation} setRelation={(relation) => handleInputChange('relation', relation)} />
        <ChooseOccasion occasion={state.occasion} setOccasion={(occasion) => handleInputChange('occasion', occasion)} />
        <ChooseInterests interests={state.interests} handleInterestChange={handleInterestChange} />
        <ChooseBudget budget={state.budget} setBudget={(budget) => handleInputChange('budget', budget)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function ChooseGender({ gender, setGender }) {
  return (
    <div>
      <p className={styles.largeText}>What does this person identify as?</p>
      <div className={styles.genderSelect}>
        <button type="button" // Prevent default submit action
          className={gender === "Male" ? styles.selected : ""}
          onClick={() => setGender("Male")}>
          <img src={MaleSymbol} alt="Male Gender" />
          <br /> Male
        </button>
        <button type="button" 
          className={gender === "Female" ? styles.selected : ""}
          onClick={() => setGender("Female")}>
          <img src={FemaleSymbol} alt="Female Gender" />
          <br /> Female
        </button>
        <button type="button" 
          className={gender === "Other" ? styles.selected : ""}
          onClick={() => setGender("Other")}>
          <img src={OtherGenderSymbol} alt="Other Gender" />
          <br /> Other
        </button>
      </div>
    </div>
  );
}

function ChooseAge({ age, setAge }) {
  return (
    <div>
      <p className={styles.largeText}>
        What age is the person you're giving this to?
      </p>
      <input
        className={styles.ageSelect}
        type="range"
        min="1"
        max="100"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <p>{age}</p>
    </div>
  );
}

function ChooseRelation({ relation, setRelation }) {
  return (
    <div>
      <p className={styles.largeText}>How is this person related to you?</p>
      <div className={styles.relationSelect}>
        <button type="button"
          className={relation === "Coworker" ? styles.selected : ""}
          onClick={() => setRelation("Coworker")}
        >
          <img src={CoworkerIcon} alt="Coworker Button" />
          <br />
          Coworker
        </button>
        <button type="button"
          className={relation === "Family" ? styles.selected : ""}
          onClick={() => setRelation("Family")}
        >
          <img src={FamilyIcon} alt="Family Button" />
          <br />
          Family
        </button>
        <button type="button"
          className={relation === "Friends" ? styles.selected : ""}
          onClick={() => setRelation("Friends")}
        >
          <img src={FriendsIcon} alt="Friends Button" />
          <br />
          Friends
        </button>
        <button type="button"
          className={relation === "Yourself" ? styles.selected : ""}
          onClick={() => setRelation("Yourself")}
        >
          <img src={YourselfIcon} alt="Yourself Button" />
          <br />
          Yourself
        </button>
        <button type="button"
          className={relation === "Significant Other" ? styles.selected : ""}
          onClick={() => setRelation("Significant Other")}
        >
          <img src={SOIcon} alt="Significant Other Button" />
          <br />
          Significant Other
        </button>
      </div>
    </div>
  );
}

function ChooseOccasion({ occasion, setOccasion }) {
  return (
    <div>
      <p className={styles.largeText}>
        For what occasion are you giving this gift?
      </p>
      <div className={styles.occasionSelect}>
        <button type="button"
          className={occasion === "Birthday" ? styles.selected : ""}
          onClick={() => setOccasion("Birthday")}
        >
          <img src={BirthdayIcon} alt="Birthday Button" />
          <br />
          Birthday
        </button>
        <button type="button"
          className={occasion === "Graduation" ? styles.selected : ""}
          onClick={() => setOccasion("Graduation")}
        >
          <img src={GraduationIcon} alt="Graduation Button" />
          <br />
          Graduation
        </button>
        <button type="button"
          className={occasion === "Valentine" ? styles.selected : ""}
          onClick={() => setOccasion("Valentine")}
        >
          <img src={ValentineIcon} alt="Valentine Button" />
          <br />
          Valentine
        </button>
        <button type="button"
          className={occasion === "Because I Want to" ? styles.selected : ""}
          onClick={() => setOccasion("Because I Want to")}
        >
          <img src={BecauseIcon} alt="Because I Want to" />
          <br />
          Because I Want to
        </button>
        <button type="button"
          className={occasion === "Christmas" ? styles.selected : ""}
          onClick={() => setOccasion("Christmas")}
        >
          <img src={ChristmasIcon} alt="Christmas Button" />
          <br />
          Christmas
        </button>
        <button type="button"
          className={occasion === "Other Occasion" ? styles.selected : ""}
          onClick={() => setOccasion("Other Occasion")}
        >
          <img src={OtherOcIcon} alt="Other Occasion Button" />
          <br />
          Other Occasion
        </button>
      </div>
    </div>
  );
}

function ChooseInterests({ interests, handleInterestChange }) {
  const interestOptions = ["Books", "Technology", "Sports", "Cooking"]; // add more stuff here as we advance
  return (
    <div>
      <p className={styles.largeText}>Select Interests:</p>
      {interestOptions.map(interest => (
        <button type="button" key={interest} className={interests.includes(interest) ? styles.selected : ""} onClick={() => handleInterestChange(interest)}>
          {interest}
        </button>
      ))}
    </div>
  );
}

function ChooseBudget({ budget, setBudget }) {
  return (
    <div>
      <p className={styles.largeText}>What's your budget?</p>
      <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Enter budget in USD" />
    </div>
  );
}

export default CollectingInfo;
