import NavBar from "./NavBar.js";
import "./CollectingInfo.css";
import React from 'react';

//Gender Symbols
import MaleSymbol from "./assets/MaleSymbol.png";
import FemaleSymbol from "./assets/FemaleSymbol.png";
import OtherGenderSymbol from "./assets/OtherGenderSymbol.png";

//Relation Icons
import CoworkerIcon from "./assets/CoworkerIcon.png";
import FamilyIcon from "./assets/FamilyIcon.png";
import FriendsIcon from "./assets/FriendsIcon.png";
import YourselfIcon from "./assets/YourselfIcon.png";
import SOIcon from "./assets/SOIcon.png";

//Gift Occasion Icons
import BirthdayIcon from "./assets/BirthdayIcon.png";
import GraduationIcon from "./assets/GraduationIcon.png";
import ValentineIcon from "./assets/ValentineIcon.png";
import BecauseIcon from "./assets/BecauseIcon.png";
import ChristmasIcon from "./assets/ChristmasIcon.png";
import OtherOcIcon from "./assets/OtherOcIcon.png";

function CollectingInfo() {
  return (
    <div className="CollectingInfo">      
      <NavBar />

      <p style={{fontWeight: 'bold', fontSize: '50px', marginBottom: "-20px"}}>
        Welcome to Perfect Gift!
      </p>
      <p style={{fontWeight: 'bold', fontStyle: 'italic', fontSize: 'x-large', marginBottom: "100px"}}>
        Here we can help you choose the perfect gift for your significant others, friends, and family!
      </p>

      <ChooseGender />
      <ChooseAge />
      <ChooseRelation />
      <ChooseOccasion />
    </div>
  )
}

function ChooseGender(){
  return(
    <div>
      <p style={{fontSize: 'xx-large'}}>What does this person identify as?</p>

        <b class="GenderSelect">
          <button style={{marginRight: "25px"}}>
            <img src={MaleSymbol} alt="Male Gender" width= "80px" height="150px" />
            <br></br>Male
          </button>
          <button style={{marginRight: "25px"}}>
            <img src={FemaleSymbol} alt="Female Gender" width= "80px" height="150px" />
            <br></br>Female
          </button>
          <button>
            <img src={OtherGenderSymbol} alt="Other Gender" width= "80px" height="150px" />
            <br></br>Other
          </button>
        </b>
    </div>
  )
}

function ChooseAge(){
  return(
    <div>
      <p style={{fontSize: 'xx-large', paddingTop: '60px'}}>What age is the person you're giving this to?</p>
      <input className="AgeSelect" type="range" min="1" max="100" value="50"/>
    </div>
  )
}

function ChooseRelation(){
  return(
    <div>
      <p style={{fontSize: 'xx-large', paddingTop: '60px'}}>How is this person related to you?</p>
      
      <b className="RelationSelect">
        <button style={{marginRight: "25px"}}>
          <img src={CoworkerIcon} alt="Coworker Button" width= "130px" height="150px" />
          <br></br>Coworker
        </button>
        <button style={{marginRight: "25px"}}>
          <img src={FamilyIcon} alt="Family Button" width= "130px" height="150px" />
          <br></br>Family
        </button>
        <button style={{marginRight: "25px"}}>
          <img src={FriendsIcon} alt="Friends Button" width= "130px" height="150px" />
          <br></br>Friends
        </button>
        <button style={{marginRight: "25px"}}>
          <img src={YourselfIcon} alt="Yourself Button" width= "130px" height="150px" />
          <br></br>Yourself
        </button>
        <button>
          <img src={SOIcon} alt="Significant Other Button" width= "130px" height="150px" />
          <br></br>Significant Other
        </button>
      </b>
    </div>
  )
}

function ChooseOccasion(){
  return(
    <div>
      <p style={{fontSize: 'xx-large', paddingTop: '60px'}}>For what occasion are you giving this gift?</p>
      
      <b className="OccasionSelect">
        <button style={{marginRight: "25px"}}>
          <img src={BirthdayIcon} alt="Birthday Button" width= "130px" height="150px" />
          <br></br>Birthday
        </button>
        <button style={{marginRight: "25px"}}>
          <img src={GraduationIcon} alt="Graduation Button" width= "130px" height="150px" />
          <br></br>Graduation
        </button>
        <button style={{marginRight: "25px"}}>
          <img src={ValentineIcon} alt="Valentine Button" width= "130px" height="150px" />
          <br></br>Valentine
        </button>
        <button style={{marginRight: "25px"}}>
          <img src={BecauseIcon} alt="Because I Want to" width= "130px" height="150px" />
          <br></br>Because I Want to
        </button>
        <button style={{marginRight: "25px"}}>
          <img src={ChristmasIcon} alt="Christmas Button" width= "130px" height="150px" />
          <br></br>Christmas
        </button>
        <button>
          <img src={OtherOcIcon} alt="Other Occasion Button" width= "130px" height="150px" />
          <br></br>Other Occasion
        </button>
      </b>
    </div>
  )
}

export default CollectingInfo;