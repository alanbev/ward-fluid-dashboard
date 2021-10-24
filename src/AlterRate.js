import React, { useState } from "react";



function AlterRate(props){

const [newRate, setNewRate]=useState()

 const submitFunction=(e)=>{
    e.preventDefault()
    props.new_rate(newRate);

 }



 return(
 
<form id = "rate_entry" onSubmit={submitFunction}>
<label htmlFor= "rate_entry_input">Enter New Rate for Bag (ml/hr) </label>
<input id= "rate_entry_input" type="number" required min="0" onChange={e=>setNewRate(e.target.value)}/>
<button id="rate_submit_button" type= "submit">Change Bag Rate</button>
</form>
 )
}






export default AlterRate