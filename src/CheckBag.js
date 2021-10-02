import React, { useState } from "react";
import CheckBagForm from "./CheckBagForm"
import "./index.css"

function CheckBag(props)
{
const [checkCorrect, setCheckCorrect] = useState(true)
const [Corrected_volume, SetCorrectedVolume]=useState(0)

const changeSetCheckCorrect=()=>(setCheckCorrect(false))
console.log(checkCorrect)
const checkbagform=<CheckBagForm/>


return(
<div>
<span> Confirm Bag Volume Correct</span>
 <button id="check_is_corrct" onClick ={props.bagcorrect}>Yes </button> 
 <button id="check_not_correct" onClick={changeSetCheckCorrect}> No </button>
<div className={(checkCorrect ? "hidden" :"show")}>{checkbagform}</div>
</div>
) 
    
}

export default CheckBag

