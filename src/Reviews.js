import React, { Component } from "react";
import "./App.css";
import firebase from "./firebase";
import { EventEmitter } from "events";

const dbRef = firebase.database().ref();

class Reviews extends Component {
   constructor() {
      super();
      this.state = {
         likes: 0
      }
   }

   //function to update likes
   addLike = (event) => {
      event.preventDefault();

      //on click grabbing each obj individual firebase ID (by assigning the firebase key as each buttons KEY= ) and setting as variable 
      const buttonKey = firebase.database().ref(event.target.id)
      
      //creating variable that grabs obj.likes value and + 1 wrapping it in NUMBER to return it as a number instead of the string that is returning
      let buttonValue = Number(event.target.dataset.likes) + 1


      //using .update firebase method to send the buttonvalue variable to the specific obj pressed
      buttonKey.update({
         likes: buttonValue
      })
   }
   renderSortedReviews(sortby){
      //create function that takes parameter and does sorting and mapping and returns the mark up

      //the toggles will actually change the state is passed into this function, r
   }
   render(){
      return (
         <div>
            {

               //sorting through array to put objects with higher 'like' value above other objects + then mapping it
               this.props.allReviews.sort((a, b) => parseFloat(a[1].likes) <= parseFloat(b[1].likes)).map((review) => {
               return (
                  <div className="review" key={review[0]}>
                     <h4>{review[1].provinceState}</h4>
                     <h4>{review[1].country}</h4>
                     <p>{review[1].summary}</p>

                     {review[1].water && <p>hi</p>}

                     <button
                     id={review[0]}
                     data-likes={review[1].likes}
                     onClick={this.addLike}
                     value={review[1].likes}>likes: {review[1].likes}</button>
                  </div>
               )
            })}
         </div>
      )
   }
}


export default Reviews