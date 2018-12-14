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
         search: "",
         restroom: true,
         food: true,
         water: true,
         filterValues: []
      }
   }

   componentDidUpdate(){
      this.reviewFilterFunction()
      this.reviewFilterByButton()
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

   //function that toggles state depending on which filter buttons user has selected
   handleFilterToggle = (e) => {
      //creates variable of which one is selected
      const target = e.target;
      //creates var depending on the type of input, if checkbox its value is the state
      const value = target.type === "checkbox" ? target.checked : target.value;
       //variable of target name so I can alter which state is selected
      const name = target.name;
      //set state of whichever is selected to the value directly linked to the checkbox
      let toggleArray = Array.from(this.state.filterValues)
      //check to see if item is in array using index of, if it slice/splice it out
      
      
      //if name is not present in array made from filterValues state, push it in. if not remove it.
      if (toggleArray.indexOf(name) === -1) {
         toggleArray.push(name)
      } else {
         let indexName = toggleArray.indexOf(name);
         toggleArray.splice(indexName, 1)
      }
      //set it to state as filterValues
      this.setState({
         [name]: value,
         filterValues: toggleArray
      }, () => {
         this.reviewFilterToolMapThing()
      })
   }
   
   reviewFilterToolMapThing = () => {
      let selectedReviews = []
      let toggleArray2 = Array.from(this.state.filterValues)
      let allReviews = this.props.allReviews
      
      toggleArray2.map((word)=> {

        let selectedReviews = allReviews.filter((review) => {
            return review[1][word] === true
            // if(review[1][word] === true){
            //    selectedReviews.push(review)
            // } else {
            //    console.log('no')
            // }
         })
         allReviews = selectedReviews
      })

      // console.log(toggleArray2)
      console.log(allReviews)
      return allReviews
   }
   

   //then with this array map array into filter 
   //You will need to filter through the first condition, and then use THAT SAME NEW ARRAY to filter through the next conditions set it up outside



   reviewFilterFunction = () =>{
   //creating var for user search
      let array = this.props.allReviews
      //filter through array and only display reviews that indexOf location match the search bar. lowercase everything
      array = array.filter((review) => {
         return review[1].location.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      });
      return array
   }


   reviewFilterByButton = () => {
      let buttonArray = this.reviewFilterFunction()
      
      buttonArray = buttonArray.filter((review) => {
         return (review[1].food === this.state.toggleFood) && (review[1].water === this.state.toggleWater) && (review[1].restroom === this.state.toggleRestroom)
      })
      console.log(buttonArray)
      return buttonArray
   }


 
      // if (this.state.toggleFood === true) {
      //   const array = array.filter((review) => {
      //    return review[1].food === true
      // })
   
   //listen for click of one of three filter buttons
   //on click change state and only render reviews whose respective node match that state?
   //so basically, default is render ALL, each click limits the render?

   //how do you handle multiple being selected? How do you make default displaying all of them?
   

   render(){
      // console.log(this.state.filteredReviews, "STATE TEST IN RENDER")
      let filteredReviews = this.reviewFilterFunction()
      filteredReviews = this.reviewFilterToolMapThing()
      // filteredReviews = this.reviewFilterByButton()

      return (
         <>
            <h2>Results</h2>
               <div className="filters">
                  <label className="filterLabel" htmlFor="">
                     <input className="switch" type="checkbox" name="restroom"
                     onChange={this.handleFilterToggle}
                     checked={this.state.toggleRestroom}/>
                     <span className="filterCover">Restroom</span>
                  </label>
                  <label className="filterLabel" htmlFor="">
                     <input className="switch" type="checkbox" name="food"
                     onChange={this.handleFilterToggle}
                     checked={this.state.toggleFood}/>
                     <span className="filterCover">Food</span>
                  </label>
                  <label className="filterLabel" htmlFor="">
                     <input className="switch" type="checkbox" name="water"
                     onChange={this.handleFilterToggle}
                     checked={this.state.toggleWater}/>
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