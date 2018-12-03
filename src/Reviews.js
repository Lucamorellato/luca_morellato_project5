import React, { Component } from "react";
import "./App.css";
import firebase from "./firebase";
import { EventEmitter } from "events";

const dbRef = firebase.database().ref();

class Reviews extends Component {
   constructor() {
      super();
      this.state = {
         likes: 0,
         search: ""
      }
   }

   //function to update likes
   addLike = (event) => {
      event.preventDefault();
      //on click grabbing each obj individual firebase ID (by assigning the firebase key as each buttons KEY= ) and setting as variable 
      let buttonKey = firebase.database().ref(event.target.id)
      
      //creating variable that grabs obj.likes value and + 1 wrapping it in NUMBER to return it as a number instead of the string that is returning
      let buttonValue = Number(event.target.dataset.likes) + 1

      //using .update firebase method to send the buttonvalue variable to the specific obj pressed
      buttonKey.update({
         likes: buttonValue
      })
   }
   renderSortedReviews = () => {
      //create function that takes parameter and does sorting and mapping and returns the mark up

      //the toggles will actually change the state is passed into this function, 
   }
   //setting search state for search bar
   updateSearch = (e) => {
      this.setState({search: e.target.value.substr(0,15)})
   }

   render(){

      //creating var for user search
      let filteredReviews = this.props.allReviews
      //filter through array and only display reviews that indexOf location match the search bar. lowercase everything
      filteredReviews = filteredReviews.filter((review) => {
         return review[1].location.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      });
      
      return (
         <>
            <h2>Results</h2>
               <div className="filters">
                  <label className="filterLabel" htmlFor="restroom">
                     <input className="switch" type="checkbox" name="restroom"/>
                     <span className="filterCover">Restroom</span>
                  </label>
                  <label className="filterLabel" htmlFor="food">
                     <input className="switch" type="checkbox" name="food"/>
                     <span className="filterCover">Food</span>
                  </label>
                  <label className="filterLabel" htmlFor="water">
                     <input className="switch" type="checkbox" name="water"/>
                     <span className="filterCover">Water</span>
                  </label>
               </div>
            <input className="searchbar" 
            placeholder="Search" type="text"
               value={this.state.search}
               onChange={this.updateSearch.bind(this)} />
            <div className="reviewColumn">
               {
               //sorting through array to put objects with higher 'like' value above other objects + then mapping it
               filteredReviews.sort((a, b) => a[1].likes <= b[1].likes).map((review) => {
               return (
                     <div className="review" key={review[0]}>
                        <div className="reviewHeader">
                           <h3>{review[1].name}</h3>
                           <span className="likeSpan">
                              <img className="heart" src={require('./assets/Heart.png')} />
                              <button
                                 id={review[0]}
                                 data-likes={review[1].likes}
                                 onClick={this.addLike}
                              value={review[1].likes}>likes: {review[1].likes}
                              </button>
                           </span>
                           
                        </div>
                        <div className="reviewSubHeader">
                           <h4>{review[1].location}</h4>
                           <div className="iconGallery">
                              {review[1].restroom ? <img className="icon" src={require('./assets/toiletgrey.png')} /> : <img className="icon" src={require('./assets/toiletorange.png')} />}
                              {review[1].food ? <img className="icon" src={require('./assets/foodgrey.png')} /> : <img className="icon" src={require('./assets/foodorange.png')} />}
                              {review[1].water ? <img className="icon" src={require('./assets/watergrey.png')} /> : <img className="icon" src={require('./assets/waterorange.png')} />}
                           </div>
                        </div>
                        <p>{review[1].summary}</p> 

                     </div>
                  )
               })}
            </div>
         </>
      )
   }
}


export default Reviews