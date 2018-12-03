import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import swal from 'sweetalert';


class Form extends Component {
   constructor() {
      super();
      //setting state of form as an object to send to the App.js state
      this.state = {
         //USE THIS CAUSE SITE CANT LOAD WITHOUT SOMETHING IN DATABASE? IS NOT WORKIG LOL
         // postKey: "",
         name: "",
         location: "",
         summary: "",
         restroom: false,
         food: false,
         water: false
      };
      this.onCheckChange = this.onCheckChange.bind(this);
   }

   //submit handler 
   handleSubmit = (e) => {
      e.preventDefault()
      //pushes result of form-state to firebase
      this.props.pushFormToFirebase(
         this.state.name,
         this.state.location,
         this.state.summary,
         this.state.restroom,
         this.state.food,
         this.state.water,
      );
      //sweet alert to confirm user submit
      swal("Review Submitted");
      // clearing state after submit
      this.setState({
         name: "",
         location: "",
         summary: "",  
         restroom: false,
         food: false, 
         water: false
      });

   };

   //clearing state to clear form when user selects Cancel
   clearForm = (e) => {
      this.setState({
         name: "",
         location: "",
         summary: "",
         restroom: false,
         food: false,
         water: false
      });
   }

   handleChange = (e) => {
      this.setState({
         [e.target.id]: e.target.value
      });
   };

   //function that listens for change to the checkboxes
   onCheckChange = (e) => {
      //creates variable of which one is selected
      const target = e.target;
      //creates var depending on the type of input, if checkbox its value is the state
      const value = target.type === "checkbox" ? target.checked : target.value;
      //variable of target name so I can alter which state is selected
      const name = target.name;
      //set state of whichever is selected to the value directly linked to the checkbox
      this.setState({
         [name]: value
      });
   
      //this takes current state, and returns the opposite THIS WORKS I JUST DO NOT UNDERSTAND HOW TO MAKE IT GLOBAL
      // const value = target.checked;
      // this.setState(function (currentState) {
      //    return {
      //       restroom: currentState.restroom
      //    };});
   }

   render() {
      return (
            <Popup trigger={<a className="button"> Add a Review </a>} modal>
               {close => (
                  // <div className="modal">
                     <div className="content">
                        <form className="reviewForm" action=""
                        onSubmit={(e) => {
                        this.handleSubmit(e)
                        setTimeout(function () { close(); }, 500)}}>
                        <label className="inputLabel" htmlFor="name">Name <span className="labelSpan">ex: Rest Area i-35 NB at Dows</span></label>
                        <input
                           required
                           value={this.state.name}
                           onChange={this.handleChange}
                           type="text"
                           id="name" />

                        <label className="inputLabel" htmlFor="location">Location <span className="labelSpan">ex: City, Province/State</span></label>
                        <input
                           required
                           value={this.state.location}
                           onChange={this.handleChange}
                           type="text"
                           id="location" />

                        <label className="inputLabel" htmlFor="summary">How Was it? <span className="labelSpan">200 word limit</span></label>
                        <textarea
                           maxLength="425"
                           value={this.state.summary}
                           onChange={this.handleChange}
                           id="summary" cols="50" rows="6" >
                        </textarea>


                        <div className="toggleSection">

                         
                        <label className="toggleLabel" htmlFor="restroom">
                                 <input className="switch" type="checkbox" name="restroom"
                                 onChange={this.onCheckChange}
                                 checked={this.state.restroom} />
                                 <span className="cover">Restroom</span>
                           </label>
                           
                              <label className="toggleLabel" htmlFor="food">
                                 <input className="switch" type="checkbox" name="food"
                                 onChange={this.onCheckChange}
                                 checked={this.state.food} />
                                 <span className="cover">Food</span>
                              </label>



                              <label className="toggleLabel" htmlFor="food">
                                 <input className="switch" type="checkbox" name="water"
                                 onChange={this.onCheckChange}
                                 checked={this.state.water} />
                                 <span className="cover">Water</span>
                              </label>

                        </div>
                        <div className="formButtons">
                           <input className="cancel" type="Reset" defaultValue="Clear" 
                           onClick={this.clearForm}/>
                           <input className="submit" type="submit" 
                           value="Submit Review"/>
                        </div>
                     </form>
                  </div>
               // </div>
            )}
            </Popup>         
      )
   }
}

export default Form;


// onClick = {() => {
//    setTimeout(function () { close(); }, 500)
// }}/>