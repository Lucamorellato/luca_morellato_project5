import React, { Component } from 'react';


class Form extends Component {
   constructor() {
      super();
      //setting state of form as an object to send to the App.js state
      this.state = {
         //USE THIS CAUSE SITE CANT LOAD WITHOUT SOMETHING IN DATABASE? IS NOT WORKIG LOL
         // postKey: "",
         provinceState: "",
         country: "",
         summary: "",
         restroom: false,
         water: false,
         food: false
      }
   }

   //submit handler 
   handleSubmit = (e) => {
      e.preventDefault();
      //DOES NOT WORK
      // const newReview = {
      //    provinceState: this.state.provinceState,
      //    country: this.state.country,
      //    summary: this.state.summary
      // }
      // console.log(newReview)

      this.props.pushFormToFirebase(
         this.state.provinceState,
         this.state.country,
         this.state.summary,
         this.state.restroom,
         this.state.water,
         this.state.food,
      );

      //clearing state after submit
   
      this.setState({
         provinceState: "",
         country: "",
         summary: "",  
         restroom: false,
         water: false,
         food: false 
      });
   };

   handleChange = e => {
      this.setState({
         [e.target.id]: e.target.value
      });
   };

   onFormChange = (e) => {
    // In my example all form values are stored in a state property 'model'
    let restroom = this.state.restroom;

      if (e.target.type == 'checkbox') {

      if (restroom[e.target.name] === false) {
         restroom[e.target.name] = true;
      } else if (restroom[e.target.name] === true) {
         restroom[e.target.name] = false;
      } else {
         // if the property has not be defined yet it should be true
         restroom[e.target.name] = true;
      }
      } else {
         restroom[e.target.name] = e.target.value;
      }

      // Update the state
      this.setState({
         restroom: restroom
      });
      console.log(this.state.restroom)
   }

   

   render() {
      return (
         <div>
            <h2>You got a Review for us?</h2>
            <form className="reviewForm" action="" 
            onSubmit={this.handleSubmit}>
               <label htmlFor="provinceState">Province/State</label>
               <input 
               value={this.state.provinceState}
               onChange={this.handleChange}
               type="text" 
               id="provinceState" />

               <label htmlFor="country">Country</label>
               <input 
               value={this.state.country}
               onChange={this.handleChange}
               type="text" 
               id="country" />

               <label htmlFor="summary">Enter Review</label>
               <textarea
               value={this.state.summary}
               onChange={this.handleChange} 
               id="summary" cols="50" rows="8"></textarea>

               <div className="toggleSection">
                  <div className="toggle">
                     <p>Restroon:</p>
                     <label htmlFor="restroom"></label>
                     <input type="checkbox" name="false" id="toggleRestroom" value={this.restroom}
                     onChange={this.onFormChange} />
                     
                  </div>

                  <div className="toggle">
                     <p>Water:</p>
                     <label htmlFor="yesWater">Yes</label>
                     <input type="radio" name="water" id="yesWater" value={this.water} />
                     <label htmlFor="noWater">No</label>
                     <input type="radio" name="water" id="noWater" value={this.water}/>
                  </div>

                  <div className="toggle">
                     <p>Food:</p>
                     <label htmlFor="yesFood">Yes</label>
                     <input type="radio" name="food" id="yesFood" value={this.water} />
                     <label htmlFor="noFood">No</label>
                     <input type="radio" name="food" id="noFood" value={this.water} />
                  </div>

               </div>
   
               <input type="submit" value="submit"/>
            </form>
         </div>
           
      
      )
   }
}

export default Form;