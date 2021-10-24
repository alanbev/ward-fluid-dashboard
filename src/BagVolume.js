import { useState, useEffect } from "react"

function BagVolume(props)
{
  const [predicted_vol_remaining, change_predicted_vol_remaining]=useState(props.vol_remaining)
  const [bag_running,change_bag_running]=useState(props.bag_running)
 

useEffect(()=>
  {
    change_bag_running(props.bag_running)
    const call_change_vol_remaining=()=>
      {
        change_predicted_vol_remaining(predicted_vol_remaining-1)
      }

    if (predicted_vol_remaining===0)
      {
        props.detect_empty_bag(props.patient_bags_running-1)
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
{change_predicted_vol_remaining(props.change_vol)}},[props.change_vol])

 return(
 <span>{predicted_vol_remaining}</span>
    )
}


export default BagVolume