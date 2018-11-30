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
         // restroom: false,
         // water: false,
         // vendingMachine: false
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
         // this.state.restroom,
         // this.state.water,
         // this.state.vendingMachine,
      );

      //clearing state after submit
      //DOES NOT WORK
      this.setState({
         provinceState: "",
         country: "",
         summary: "",  
         // restroom: false,
         // water: false,
         // vendingMachine: false, 
      });
   };

   handleChange = e => {
      this.setState({
         [e.target.id]: e.target.value
      });
      // console.log(this.state)
   };

   render() {
      return (
         <div>
            <h2>You got a Review for us?</h2>
            <form action="" 
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

               <input type="submit" value="submit"/>
            </form>
         </div>
           
      
      )
   }
}

export default Form;