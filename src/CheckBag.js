import React, { useEffect, useState } from "react";
import CheckBagForm from "./CheckBagForm"
import "./index.css"

function CheckBag(props)
{
const [checkCorrect, setCheckCorrect] = useState(true)
const [Corrected_volume, setCorrectedVolume]=useState(props.change_vol)

useEffect(()=>{props.getVol(Corrected_volume)},[Corrected_volume])

const changeSetCheckCorrect=()=>(setCheckCorrect(false))
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

