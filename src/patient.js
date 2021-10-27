
import React, { useEffect, useState } from 'react';
import IvBag from "./IvBag.js"
import StopStartFluidsButton from './StartStopFluidsButton.js';

function Patient(props)
{
//initialise state
const [on_fluids,setOnFluids]=useState(props.patient_data.on_iv_fluids);
const [show_bags,setShowBags]=useState(false)
const [bags_prescribed,setBagsPrescribed]= useState(props.patient_data.bags.length)
const[bags_running, setBagRunning]=useState(0)
const [display_alert, setDisplayAlert]=useState("hidden")
const [alarm_state, setAlarmState]=useState("green")
const [alert_message, setAlertMessage]=useState("")
const [bag_check_due,setBagCheckDue]= useState(false)
const [fluids_today,setFluidsToday]=useState(0)



const decrement_bags=()=>{setBagsPrescribed(bags_prescribed-1)}
const change_fluid_status=()=>{(setOnFluids(on_fluids ? false : true))}


let on_fluids_message= (on_fluids?"On IV fluids" :"Not on IV fluids")

const list_of_bags=props.patient_data.bags.map((eachbag, index)=><IvBag 
  showstatus={props.showstatus}
  patient_data={props.patient_data} 
  key={index}  
  bag={eachbag} 
  on_fluids={on_fluids} 
  decrement_bags={decrement_bags} 
  is_bag_running={setBagRunning}
  running_bags={bags_running}
  check_due={setBagCheckDue}
  fluids_today={fluids_today}
  setFluidsToday={setFluidsToday}
  />)



useEffect(()=>{
  if(on_fluids)
    {
      if (bags_prescribed===0)
      {
      setAlarmState("red")
      setDisplayAlert("show")
      setAlertMessage("On IV fluids but no bags prescribed")
      }
      else if (bags_running===0)
      {
      setAlarmState("red")
      setDisplayAlert("show")
      setAlertMessage("On IV fluids but no bags running")
      }
      else if (bag_check_due)
      {
        setAlarmState("amber")
        setDisplayAlert("show")
        setAlertMessage("Bag check due")
      }
      
    else
      {
        setDisplayAlert("hidden")
        setAlarmState("green")
        setAlertMessage("")
      }
    }
      else
      {
        setDisplayAlert("hidden")
        setAlarmState("green")
        setAlertMessage("")
      }
    
},[on_fluids,bags_prescribed,bags_running,bag_check_due])

console.log(alert_message)
console.log(`total fluid infused${fluids_today}`)
return(
  <div className={alarm_state} id={props.patient_data.hosp_number} >
  <span id="bed_number"> {`Bed ${props.patient_data.bed}`}</span>
  <span id="patient_name_message">{props.patient_data.patient_name}</span>
  <span id= "hosp_number"> {props.patient_data.hosp_number}</span>
  <span id="on_fluid_message"> <StopStartFluidsButton click_function={change_fluid_status} message_from_patient={on_fluids_message} / > </span>
  <span id="numb_bags_message">{`${bags_prescribed} bags prescribed`}</span>
  <button onClick={()=>{setShowBags(show_bags ? false : true)}}> Show/Hide Bags </button> 
  <span> {bags_running} bag(s) running. </span>
  <span id="checked_volume">Total checked volume: {fluids_today} ml</span>
  <div id="alertmessage" className={display_alert}>{alert_message}</div>
  <div className={(show_bags ? "show" : "hidden")}> {list_of_bags} </div>
  </div>

  
  )
}

 export default Patient