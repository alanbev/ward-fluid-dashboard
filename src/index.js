import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import patients from "./patients.js"

function App() {
  let patient_list=patients

  return (
    <PatientList  data={patient_list} />
    
  );
}  

function PatientList(props)
{
  
  const list_of_patients=props.data.map((data_item, index)=><Patient key={index} patient_data={data_item} patient_in_array={index} />)
  return (list_of_patients)

}


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

  <span id="patient-name_message">{props.patient_data.patient_name}</span>
  <span id="on_fluid_message"> <StopStartFluidsButton click_function={change_fluid_status} message_from_patient={on_fluids_message} / > </span>
  <span id="numb_bags_message">{`${bags_prescribed} bags prescribed`}</span>
  <button onClick={()=>{setShowBags(show_bags ? false : true)}}> Show/Hide Bags </button> 

  <div>
  <div className={(show_bags ? "show" : "hidden")}> {list_of_bags} </div>
  </div>

  </div>
  )
}

function IvBag(props)

{
const [bag_running, change_bag_running]=useState(false)
const [vol_remaining, change_vol_remaining]=useState(props.bag.volume)
const [start_time, change_start_time]= useState(Date)
const [bag_started, change_bag_started] = useState(false)
const [displaystatus,change_display_status]=useState("bag")
//const [array_position, change_array_position] = useState(props.index)

const show_volume=<BagVolume key={props.index} bag_running={bag_running} vol_remaining={vol_remaining} />

const start_stop_bag=()=>{change_bag_running(bag_running ? false : true); change_bag_started(true) }

const take_down_bag=()=>{change_display_status("hidden"); props.decrement_bags()}

const take_down =  <StopStartFluidsButton click_function={take_down_bag} message_from_stopped_bag={bag_started} bag_running={bag_running} position_in_array={props.array_position} />

return(
  <div className={displaystatus}>
    
    <span>Bag Id:-  {props.bag.bag_id}</span>
    <span> {props.bag.fluid}  {props.bag.rate}  ml/hr</span> 
    <span>Volume remaining {show_volume}ml</span>
    <span>  <StopStartFluidsButton click_function={start_stop_bag} message_from_bag={(bag_running ? "Bag running" : "Bag not running")} /></span>
    <span> {take_down}</span>
    
    
    </div>
) 
}




function StopStartFluidsButton(props)
{
  let message
  let button_label
  let position=props.position_in_array
  console.log(position)
  let button_class="show_button"

  console.log(!!props.message_from_bag)
if ( props.message_from_patient)
{

  button_label= (props.message_from_patient==="On IV fluids" ?  "Discontinue IV fluids" : "Commence on IV fluids" )
  message=props.message_from_patient

}

else if (props.message_from_bag)
{
  button_label= (props.message_from_bag==="Bag not running" ? "Start Bag" : "Pause Bag")
  message=props.message_from_bag
}

else
{
  button_label= (props.message_from_stopped_bag ? "Take down Bag" : "Cancel Bag")

  if( props.bag_running)
  {
   button_class="hidden" 
  }
}
return(
  <span>
  <span> {message}</span>
 <button id="start_ivfluid_message" className={button_class} onClick={()=>props.click_function(position)}> {button_label} </button> 
 </span>
)
}


function BagVolume(props)
{
  const [vol_remaining,change_vol_remaining]=useState(props.vol_remaining)
  const [bag_running,change_bag_running]=useState(props.bag_running)
  console.log("bagvolume is active")
  console.log (bag_running ? "true":"false")
  console.log({vol_remaining})

  useEffect(()=>
  {
    
    change_bag_running(props.bag_running)
    const call_change_vol_remaining=()=>
      {
        change_vol_remaining(vol_remaining-1)
      }

    if (bag_running && vol_remaining >0)
      {
        const countdown=()=>{setTimeout(call_change_vol_remaining, 1000)}
        countdown()
       return()=>{clearTimeout(countdown)}
      } 
  },[bag_running, vol_remaining, props.bag_running])


    return(
    <span>{vol_remaining}</span>
    )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()