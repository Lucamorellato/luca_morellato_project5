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
                  <label className="filterLabel" htmlFor="">
                     <input className="switch" type="checkbox" name=""/>
                     <span className="filterCover">Restroom</span>
                  </label>
                  <label className="filterLabel" htmlFor="">
                     <input className="switch" type="checkbox" name=""/>
                     <span className="filterCover">Food</span>
                  </label>
                  <label className="filterLabel" htmlFor="">
                     <input className="switch" type="checkbox" name=""/>
                     <span className="filterCover">Water</span>
                  </label>
               </div>
            <label className="visuallyhidden" id="searc" htmlFor="searchbar">Search Reviews Here</label>
            <input className="searchbar" id="search"
            placeholder="Search" type="text"
               value={this.state.search}
               onChange={this.updateSearch.bind(this)} />
            <div className="reviewColumn">
               {
               //sorting through array to put objects with higher 'like' value above other objects + then mapping it: sort needs to receive a value other than 0 to do anything, so if true, return 1, if false -1
                  filteredReviews.sort((a, b) => a[1].likes <= b[1].likes ? 1 : -1).map((review) => {
               return (
                     <div className="review" key={review[0]}>
                        <div className="reviewHeader">
                           <h3>{review[1].name}</h3>
                           <span className="likeSpan">
                              <img aria-hidden alt="heart icon" className="heart" src={require('./assets/Heart.png')} />
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
                              
                              {review[1].restroom ? <img className="icon" alt="this location has a restroom" src={require('./assets/toiletorangee.png')}/> : <img className="icon" alt="this location does not have a restroom" src={require('./assets/toilet.png')}/>}

                           {review[1].food ? <img className="icon" alt="this location has food" src={require('./assets/foodorange.png')} /> : <img className="icon" alt="this location does not have food" src={require('./assets/foodgrey.png')}/>}

                           {review[1].water ? <img className="icon" alt="this location has water" src={require('./assets/waterorange.png')} /> : <img className="icon" alt="this location does not have water" src={require('./assets/watergrey.png')}/>}
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