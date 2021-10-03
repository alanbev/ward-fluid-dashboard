import React, {useEffect, useState} from "react"
import StopStartFluidsButton from "./StartStopFluidsButton.js"
import BagVolume from "./BagVolume.js"
import CheckBag from "./CheckBag.js"
import "./index.css"

function IvBag(props)

{
const [bag_running, change_bag_running]=useState(false)
const [vol_remaining, change_vol_remaining]=useState(props.bag.volume)
const [start_time, change_start_time]= useState(Date)
const [bag_started, change_bag_started] = useState(false)
const [displaystatus,change_display_status]=useState("bag")
const [vol_from_correct, set_Vol_from_correct]=useState(props.bag.volume)
const [showCheckBag, setShowcheckBag]=useState(false)


useEffect(()=>{if (showCheckBag)
  {change_vol_remaining(vol_from_correct)}
},[vol_from_correct,showCheckBag])

const show_volume=<BagVolume key={props.index} bag_running={bag_running} vol_remaining={vol_remaining} change_vol={vol_from_correct} checkbag={showCheckBag} />

const start_stop_bag=()=>{change_bag_running(bag_running ? false : true); change_bag_started(true) }

const take_down_bag=()=>{change_display_status("hidden"); props.decrement_bags()}

const take_down =  <StopStartFluidsButton click_function={take_down_bag} message_from_stopped_bag={bag_started} bag_running={bag_running} position_in_array={props.array_position} />



const changeSetShowBag=()=>{setShowcheckBag(showCheckBag ? false : true)}
const changeSetShowBagFunction=()=>{change_bag_running(false); changeSetShowBag()}
const checkbag = <CheckBag key={props.index} index={props.index} getVol={set_Vol_from_correct} vol={vol_from_correct} />


return(
  <div className={displaystatus}>
    <span>Bag Id:-  {props.bag.bag_id}</span>
    <span> {props.bag.fluid}  {props.bag.rate}  ml/hr</span> 
    <span>Volume remaining {show_volume}ml</span>
    <span>  <StopStartFluidsButton click_function={start_stop_bag} message_from_bag={(bag_running ? "Bag running" : "Bag not running")} /></span>
    <span className={(bag_started ? "show_button" :"hidden")}> <button onClick={changeSetShowBagFunction} > {(showCheckBag ? "Bag Check Complete" : "Check Bag")} </button></span>
    <span> {take_down}</span>
    <div className={(showCheckBag ? "show" : "hidden")}>{checkbag}</div>
  </div>
) 
}

export default IvBag
 