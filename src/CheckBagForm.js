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
    setVolumeEntered(undefined)
   
}

return(

     <form onSubmit={submitFunction}>
    <label htmlFor= "new_volume"> Enter Correct volume </label>
    <input type= "number" id="new_voume" required  onChange={e=>setVolumeEntered(e.target.value)}  />
    <button type="submit">Confirm Volume</button> 
    </form>  
)
}
export default CheckBagForm