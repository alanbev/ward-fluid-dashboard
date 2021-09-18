import React, { useState } from 'react';
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
  const list_of_patients=props.data.map((data_item, index)=><Patient key={index} patient_data={data_item} />)
  return (list_of_patients)
}


function Patient(props)
{
//initialise state
const [on_fluids,setOnFluids]=useState(props.patient_data.on_iv_fluids);
const [iv_status,setIvStatus]=useState(props.patient_data.iv_status);
const [show_bags,setShowBags]=useState(false)
const [bags_prescribed,setBagsPrescribed]= useState(props.patient_data.bags.length > 0)

const change_fluid_status=()=>setOnFluids(on_fluids ? false : true)

let bagsClass=(show_bags ? "showbag" : "hidden")//calls CSS class according to show_bags state
//setBagsPrescribed=()=>{(props.patient_data.bags.length >0 ? true : false }

const list_of_bags=props.patient_data.bags.map((eachbag, index)=><IvBag key={index}bag={eachbag} />);
  return(
  
 <div className="patient" id={props.patient_data.hosp_number} >

  <span id="patient-name_message">{props.patient_data.patient_name}</span>
  <span id="on_fluid_message">{(on_fluids ? <StopFluidsButton stop_click_function={change_fluid_status}/>  :  <CommenceFluidsButton start_click_function={change_fluid_status} / >)} </span>
  <span id="numb_bags_message">{`${props.patient_data.bags.length} bags prescribed`}</span>
  <button onClick={()=>setShowBags(show_bags ? false : true)}> Show/Hide Bags </button> 

  <div>
  <div className={bagsClass}>{list_of_bags}</div>
  </div>

  </div>
  )
}

function IvBag(props)
{
return(
  <div className="bag">Bag Id:-  {props.bag.bag_id}</div>
)

}

function CommenceFluidsButton(props)
{
return(
  <span>
  <span> Not on IV Fluids</span>
 <button id="start_ivfluid_message" onClick={props.start_click_function}> Commence on IV Fluids </button> 
 </span>
)
}
function StopFluidsButton(props)
{
return(
  <span>
  <span> On IV Fluids</span>
 <button id="start_ivfluid_message" onClick={props.stop_click_function}> Discontinue IV Fluids </button> 
 </span>
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
reportWebVitals();
