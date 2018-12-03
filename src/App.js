import React, { Component } from "react";
import "./App.css";
import firebase from "./firebase";
import Popup from "reactjs-popup";

//COMPONENTS IMPORTED HERE
import Form from "./Form";
import Reviews from "./Reviews"


// reference to the root of the database
const dbRef = firebase.database().ref();

class App extends Component {
  constructor() {
    super();
    this.state = {
    //  reviewKey: null,
     allReviews: []
    }
  }

  componentDidMount() {
    console.log("MOUNT TEST LOL")
    //attach event listener to firebase
    dbRef.on("value", (snapshot) => {
      //turning database into variable
      const database = snapshot.val()
      //turn database into an array
      //when database is empty site errors out
      const databaseArray = Object.entries(database)
      this.setState({
        allReviews: databaseArray
      })
    })
  }


  //creating a function that will accept parameters of the review. it also pushes the info to firebase and resets the input fiel
  pushFormToFirebase = (
    name,
    location,
    summary,
    restroom,
    food,
    water
    ) => {
      //pushing to firebase
    dbRef.push({
      likes: 0,
      name: name,
      location: location,
      summary: summary,
      restroom: restroom,
      food: food,
      water: water
    });
  };

  render() {
    return (
      <>
          <header id="header">
            <h1>Rest Stop Reviews</h1>
            <div className="headerLinks">
              <Form pushFormToFirebase={this.pushFormToFirebase} />
              <a href="#reviews">View Reviews</a>
            </div>
          </header>
          <section id="reviews" className="reviewSection wrapper">
            <Reviews allReviews={this.state.allReviews}/>
          </section>
      </>
    );
  }
}

export default App;




//pageLoad

//render form also render all currently posted reviews in a twitter-esque display
//declare state as empty strings and default boolean values
//link radio keys and form to current state values
//user completes form and checks radio keys and update the state
//send updated state to firebase saving them
//STRETCH ---- On submit present a draft of the post for user confirmation to verify no spelling mistakes ----
//on submit make sure all options are checked if not issue alert
//on submit clear form if completed properly

//pull info back down from firebase and present on home screen