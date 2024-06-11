import React, { useState } from 'react';
import NavBar from "./NavBar.js";
import "./CollectingInfo.css";

// Gender Symbols
import MaleSymbol from "./assets/MaleSymbol.png";
import FemaleSymbol from "./assets/FemaleSymbol.png";
import OtherGenderSymbol from "./assets/OtherGenderSymbol.png";

// Relation Icons
import CoworkerIcon from "./assets/CoworkerIcon.png";
import FamilyIcon from "./assets/FamilyIcon.png";
import FriendsIcon from "./assets/FriendsIcon.png";
import YourselfIcon from "./assets/YourselfIcon.png";
import SOIcon from "./assets/SOIcon.png";

// Gift Occasion Icons
import BirthdayIcon from "./assets/BirthdayIcon.png";
import GraduationIcon from "./assets/GraduationIcon.png";
import ValentineIcon from "./assets/ValentineIcon.png";
import BecauseIcon from "./assets/BecauseIcon.png";
import ChristmasIcon from "./assets/ChristmasIcon.png";
import OtherOcIcon from "./assets/OtherOcIcon.png";

function CollectingInfo() {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState(50);
  const [relation, setRelation] = useState('');
  const [occasion, setOccasion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { gender, age, relation, occasion };

    try {
      const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
  return (
    <div className="CollectingInfo">
      <NavBar />
      <p style={{ fontWeight: 'bold', fontSize: '50px', marginBottom: "-20px" }}>
        Welcome to Perfect Gift!
      </p>
      <p style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: 'x-large', marginBottom: "100px" }}>
        Here we can help you choose the perfect gift for your significant others, friends, and family!
      </p>

      <form onSubmit={handleSubmit}>
        <ChooseGender gender={gender} setGender={setGender} />
        <ChooseAge age={age} setAge={setAge} />
        <ChooseRelation relation={relation} setRelation={setRelation} />
        <ChooseOccasion occasion={occasion} setOccasion={setOccasion} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function ChooseGender({ gender, setGender }) {
  return (
    <div>
      <p style={{ fontSize: 'xx-large' }}>What does this person identify as?</p>
      <div className="GenderSelect">
        <button
          className={gender === 'Male' ? 'selected' : ''}
          style={{ marginRight: "25px" }}
          onClick={() => setGender('Male')}
        >
          <img src={MaleSymbol} alt="Male Gender" width="80px" height="150px" />
          <br />Male
        </button>
        <button
          className={gender === 'Female' ? 'selected' : ''}
          style={{ marginRight: "25px" }}
          onClick={() => setGender('Female')}
        >
          <img src={FemaleSymbol} alt="Female Gender" width="80px" height="150px" />
          <br />Female
        </button>
        <button
          className={gender === 'Other' ? 'selected' : ''}
          onClick={() => setGender('Other')}
        >
          <img src={OtherGenderSymbol} alt="Other Gender" width="80px" height="150px" />
          <br />Other
        </button>
      </div>
    </div>
  );
}

function ChooseAge({ age, setAge }) {
  return (
    <div>
      <p style={{ fontSize: 'xx-large', paddingTop: '60px' }}>What age is the person you're giving this to?</p>
      <input
        className="AgeSelect"
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
      <p style={{ fontSize: 'xx-large', paddingTop: '60px' }}>How is this person related to you?</p>
      <div className="RelationSelect">
        <button
          className={relation === 'Coworker' ? 'selected' : ''}
          style={{ marginRight: "25px" }}
          onClick={() => setRelation('Coworker')}
        >
          <img src={CoworkerIcon} alt="Coworker Button" width="130px" height="150px" />
          <br />Coworker
        </button>
        <button
          className={relation === 'Family' ? 'selected' : ''}
          style={{ marginRight: "25px" }}
          onClick={() => setRelation('Family')}
        >
          <img src={FamilyIcon} alt="Family Button" width="130px" height="150px" />
          <br />Family
        </button>
        <button
          className={relation === 'Friends' ? 'selected' : ''}
          style={{ marginRight: "25px" }}
          onClick={() => setRelation('Friends')}
        >
          <img src={FriendsIcon} alt="Friends Button" width="130px" height="150px" />
          <br />Friends
        </button>
        <button
          className={relation === 'Yourself' ? 'selected' : ''}
          style={{ marginRight: "25px" }}
          onClick={() => setRelation('Yourself')}
        >
          <img src={YourselfIcon} alt="Yourself Button" width="130px" height="150px" />
          <br />Yourself
        </button>
        <button
          className={relation === 'Significant Other' ? 'selected' : ''}
          onClick={() => setRelation('Significant Other')}
        >
          <img src={SOIcon} alt="Significant Other Button" width="130px" height="150px" />
          <br />Significant Other
        </button>
      </div>
    </div>
  );
}

function ChooseOccasion({ occasion, setOccasion }) {
  return (
    <div>
      <p style={{ fontSize: 'xx-large', paddingTop: '60px' }}>For what occasion are you giving this gift?</p>
      <div className="OccasionSelect">
        <button
          className={occasion === 'Birthday' ? 'selected' : ''}
          style={{ marginRight: "25px" }}
          onClick={() => setOccasion('Birthday')}
        >
          <img src={BirthdayIcon} alt="Birthday Button" width="130px" height="150px" />
          <br />Birthday
        </button>
        <button
          className={occasion === 'Graduation' ? 'selected' : ''}
          style={{ marginRight: "25px" }}
          onClick={() => setOccasion('Graduation')}
        >
          <img src={GraduationIcon} alt="Graduation Button" width="130px" height="150px" />
          <br />Graduation
        </button>
        <button
          className={occasion === 'Valentine' ? 'selected' : ''}
          style={{ marginRight: "25px" }}
          onClick={() => setOccasion('Valentine')}
        >
          <img src={ValentineIcon} alt="Valentine Button" width="130px" height="150px" />
          <br />Valentine
        </button>
        <button
          className={occasion === 'Because I Want to' ? 'selected' : ''}
          style={{ marginRight: "25px" }}
          onClick={() => setOccasion('Because I Want to')}
        >
          <img src={BecauseIcon} alt="Because I Want to" width="130px" height="150px" />
          <br />Because I Want to
        </button>
        <button
          className={occasion === 'Christmas' ? 'selected' : ''}
          style={{ marginRight: "25px" }}
          onClick={() => setOccasion('Christmas')}
        >
          <img src={ChristmasIcon} alt="Christmas Button" width="130px" height="150px" />
          <br />Christmas
        </button>
        <button
          className={occasion === 'Other Occasion' ? 'selected' : ''}
          onClick={() => setOccasion('Other Occasion')}
        >
          <img src={OtherOcIcon} alt="Other Occasion Button" width="130px" height="150px" />
          <br />Other Occasion
        </button>
      </div>
    </div>
  );
}

export default CollectingInfo;