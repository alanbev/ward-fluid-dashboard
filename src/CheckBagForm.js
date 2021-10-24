import React, {useEffect, useState} from "react"
import "./index.css"


function CheckBagForm(props)
{
const[volumeEntered ,setVolumeEntered]=useState()

const submitFunction=(e)=>{e.preventDefault()
    if (volumeEntered===undefined)
        {props.getVol(props.vol)}
    else
        {props.getVol(volumeEntered)}
    setVolumeEntered("")
    
   
}

return(

     <form onSubmit={submitFunction}>
    <label htmlFor= "new_volume"> Enter Correct volume </label>
    <input type= "number" id="new_volume" required value={volumeEntered} onChange={e=>setVolumeEntered(e.target.value)}  />
    <button type="submit">Confirm Volume</button> 
    <span> Bag set to stopped for volume change - re-start after check complete</span>
    </form>  
)
}
export default CheckBagForm