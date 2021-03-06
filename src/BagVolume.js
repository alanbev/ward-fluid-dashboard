import { useState, useEffect } from "react"

function BagVolume(props, ref)
{
  const [predicted_vol_remaining,setPredictedVolumeRemaining]=useState(props.vol_remaining)
  const [bag_running,setBagRunning]=useState(props.bag_running)
 

useEffect(()=>
  {
    setBagRunning(props.bag_running)
    const call_change_vol_remaining=()=>
      {
       setPredictedVolumeRemaining(predicted_vol_remaining-1)
        props.fluid_infused.current=predicted_vol_remaining
      }


    if (bag_running && predicted_vol_remaining >0)
      {
        const countdown=()=>{setTimeout(call_change_vol_remaining, 100000/props.rate)}
        countdown()
        
       return()=>{clearTimeout(countdown)}
      } 
  },[bag_running, predicted_vol_remaining, props.bag_running,props.vol_remaining,props.checkbag])


useEffect(()=>{
if (props.checkbag)
{setPredictedVolumeRemaining(props.change_vol)}},[props.change_vol])

 return(
 <span>{predicted_vol_remaining}</span>
    )
}


export default BagVolume