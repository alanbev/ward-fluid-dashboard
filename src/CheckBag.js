import React, { useEffect, useState } from "react";
import CheckBagForm from "./CheckBagForm"
import "./index.css"

function CheckBag(props)
{
const [checkCorrect, setCheckCorrect] = useState(true)
const [Corrected_volume, setCorrectedVolume]=useState(props.change_vol)

useEffect(()=>{props.getVol(Corrected_volume)},[Corrected_volume])

const changeSetCheckCorrect=()=>{
    setCheckCorrect(false); 
    console.log(props.bag_running)
    if(props.bag_running)
        {
        props.is_bag_running(props.running_bags-1) //decrements running bags since this is blocked in IV Bag during bag check to preent refresh error
        }
    props.start_stop_bag(false)//stopsbag to prevent error during update
}
useEffect(()=>{setCheckCorrect(true)},[Corrected_volume])


const checkbagform=<CheckBagForm key={props.index} getVol={setCorrectedVolume} vol={Corrected_volume}/>

const confirm_correct=()=>{setCheckCorrect(true)}

return(
<div>
<span> Confirm Bag Volume Correct</span>
 <button id="check_is_corrct" onClick ={confirm_correct}>Yes </button> 
 <button id="check_not_correct" onClick={changeSetCheckCorrect}> No </button>
<div className={(checkCorrect ? "hidden" :"show")}>{checkbagform}</div>
</div>
) 
    
}

export default CheckBag

