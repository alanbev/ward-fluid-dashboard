import React, {useState} from "react"
import "./index.css"


function CheckBagForm(props)
{
const[volumeEntered ,setVolumeEntered]=useState(0)


return(

     <form>
    <label for= "new_volume"> Enter Correct volume </label>
    <input type= "number" id="new_voume" required default={props.predictedVolume}/>
    <button >Confirm Volume</button> 
    </form>  
)
}
export default CheckBagForm