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
     allReviews: []
    }
  }

  //adding firebaseDatabase to STATE here
  componentDidMount() {
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
          <footer>
          <p>© <a target="_blank" href="http://www.lucamorellato.com/">Luca Morellato</a> 2018</p>
          </footer>
      </>
    );
  }
}

export default App;
