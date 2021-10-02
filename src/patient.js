
import React, { useState,} from 'react';
import IvBag from "./IvBag.js"
import StopStartFluidsButton from './StartStopFluidsButton.js';

function Patient(props)
{
//initialise state
const [on_fluids,setOnFluids]=useState(props.patient_data.on_iv_fluids);
const [show_bags,setShowBags]=useState(false)
const [bags_prescribed,setBagsPrescribed]= useState(props.patient_data.bags.length)

const decrement_bags=()=>{setBagsPrescribed(bags_prescribed-1)}
const change_fluid_status=()=>{(setOnFluids(on_fluids ? false : true))}
let on_fluids_message= (on_fluids?"On IV fluids" :"Not on IV fluids")

const list_of_bags=props.patient_data.bags.map((eachbag, index)=><IvBag showstatus={props.showstatus} patient_data={props.patient_data}  key={index}  bag={eachbag} on_fluids={on_fluids} decrement_bags={decrement_bags}/>)


return(
  
 <div className="patient" id={props.patient_data.hosp_number} >
   <span id="bed_number"> {`Bed ${props.patient_data.bed}`}</span>
  <span id="patient_name_message">{props.patient_data.patient_name}</span>
  <span id= "hosp_number"> {props.patient_data.hosp_number}</span>
  <span id="on_fluid_message"> <StopStartFluidsButton click_function={change_fluid_status} message_from_patient={on_fluids_message} / > </span>
  <span id="numb_bags_message">{`${bags_prescribed} bags prescribed`}</span>
  <button onClick={()=>{setShowBags(show_bags ? false : true)}}> Show/Hide Bags </button> 

  <div>
  <div className={(show_bags ? "show" : "hidden")}> {list_of_bags} </div>
  </div>

  </div>
  )
}

 export default Patient