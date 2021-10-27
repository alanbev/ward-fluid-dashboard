import React, {useEffect, useState, useRef} from "react"
import StopStartFluidsButton from "./StartStopFluidsButton.js"
import BagVolume from "./BagVolume.js"
import CheckBag from "./CheckBag.js"
import AlterRate from "./AlterRate.js"
import "./index.css"



function IvBag(props)
{
const [bag_running, change_bag_running]=useState(false)
const [vol_remaining, change_vol_remaining]=useState(props.bag.volume)
const [bag_started, change_bag_started] = useState(false)
const [displaystatus,change_display_status]=useState("bag")
const [vol_from_correct, set_Vol_from_correct]=useState(props.bag.volume)
const [showCheckBag, setShowcheckBag]=useState(false)
const [showAlterRate, setShowAlterRate]=useState(false)
const [rate, setRate] = useState(props.bag.rate)
const [checkDue, setCheckDue]= useState(false)
const time_started_str=useRef()
const checkduebutton=useRef("white")
const fluid_infused=useRef(0)
const [new_fluid_left,setNewFluidLeft]=useState(props.bag.volume)

let start_time= new Date()
const check_interval=30000

useEffect(()=>{
  if(bag_running)
  {
        const check=()=>{setCheckDue(true)}
        const checkTimer=()=>{setTimeout(check, check_interval)}
       
        if(showCheckBag)
        {
          clearTimeout(checkTimer)// resets timer if check done
        } 
        checkTimer() 
          return()=>{clearTimeout(checkTimer)}
  }
  },[bag_running,showCheckBag])


useEffect(()=>{
  if (showCheckBag)
  {change_vol_remaining(vol_from_correct)}
},[vol_from_correct,showCheckBag])


useEffect(()=>{  
  start_time=new Date();
  if (bag_started)
  {
    if (start_time.getMinutes()>9)
    {
      time_started_str.current=`Bag first started at: ${start_time.getHours()}:${start_time.getMinutes()}`
    }
  else
  {
    time_started_str.current=`Bag first started at: ${start_time.getHours()}:0${start_time.getMinutes()}`
  }
}
  },[bag_started])

  
useEffect(()=>{
  if (checkDue===true)
  {
    props.check_due(true)
    checkduebutton.current="amber"
  }
  if (showCheckBag===true)
  {
      props.check_due(false)
      checkduebutton.current="white"
  }
},[checkDue,showCheckBag])


useEffect(()=>
{
  if (bag_running && (!fluid_infused.current<=1) &&(!showCheckBag))
  {
    props.is_bag_running(props.running_bags+1)
    
  }
  else if (!showCheckBag && bag_started && (!fluid_infused.current<=1))
  {
    props.is_bag_running(props.running_bags-1) 
  }
},[bag_running,vol_remaining])


useEffect(()=>{fluid_infused.current=vol_from_correct},[vol_from_correct])//corrects infused volume reset during check

useEffect(()=>{
if (fluid_infused.current<=1)
{
  start_stop_bag();
}
},[fluid_infused.current])

const show_volume=<BagVolume
  key={props.index} 
  bag_running={bag_running}
  vol_remaining={vol_remaining} 
  change_vol={vol_from_correct} 
  checkbag={showCheckBag}
  patient_bags_running={props.running_bags}
  rate={rate}
  check={setCheckDue}
  fluid_infused={fluid_infused}
  />

const start_stop_bag=()=>{
change_bag_running(bag_running ? false : true); 
change_bag_started(true)
}


const take_down_bag=()=>{
  if (window.confirm("Please perform a bag volume check before taking down a bag (Click Check Bag, correct the volume then click Check Complete).  If you have done this press OK to take down the bag. If not, click Cancel and check the bag volume now"
  ))
  {
change_display_status("hidden");
props.decrement_bags(); 
  }
}

const take_down = <StopStartFluidsButton
click_function={take_down_bag}
message_from_stopped_bag={bag_started} 
bag_running={bag_running} 
position_in_array={props.array_position} />



const changeSetShowCheckFunction=()=>{
setCheckDue(false);
if (showCheckBag)
{
  props.setFluidsToday(props.fluids_today+(new_fluid_left-fluid_infused.current))
  setNewFluidLeft(fluid_infused.current)
}
setShowcheckBag(!showCheckBag);
}


const checkbag = <CheckBag key={props.index} index={props.index}
getVol={set_Vol_from_correct}
vol={vol_from_correct}
bag_running={bag_running}
start_stop_bag={change_bag_running}
is_bag_running={props.is_bag_running}
running_bags={props.running_bags} />


const changeSetRateFunction=()=>{
setShowAlterRate(showAlterRate ? false : true)}

const alter_rate_component= <AlterRate key={props.index}
new_rate={setRate}/>


return(
  <div className={displaystatus}>
    <span>Bag Id:-  {props.bag.bag_id}</span>
    <span id="fluid"> {props.bag.fluid}  {rate}  ml/hr</span> 
    <span>Volume remaining {show_volume}ml</span>
    <span className={showCheckBag ? "hidden" : "show_button"}> <StopStartFluidsButton  click_function={start_stop_bag} message_from_bag={(bag_running ? "Bag running" : "Bag not running")} /></span>
    <span className={(bag_started ? "show_button" :"hidden")}> <button className={checkduebutton.current} onClick={changeSetShowCheckFunction} > {(showCheckBag ? "Bag Check Complete" : "Check Bag")} </button></span>
    <span> <button id="rate_button" onClick={changeSetRateFunction}> {(showAlterRate ? "Hide Change Rate":"Change Bag Rate")}</button></span>
    <span> {take_down}</span>
    <span>  {time_started_str.current} </span>
    <div className={(showAlterRate? "show" : "hidden")}>{alter_rate_component}</div>
    <div className={(showCheckBag ? "show" : "hidden")}>{checkbag}</div>
 
  </div>
) 
}

export default IvBag
 