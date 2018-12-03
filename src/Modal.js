import React from "react";
import Popup from "reactjs-popup";

//component LOAD IN
import Form from "./Form";

export default (props) => (
   <Popup trigger={<button> Trigger</button>} position="right center">
      <div>
         <Form/>
      </div>
   </Popup>
);
