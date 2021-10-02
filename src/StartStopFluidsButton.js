import React from "react"

function StopStartFluidsButton(props)
{
  let message
  let button_label
  let position=props.position_in_array
  let button_class="show_button"

if ( props.message_from_patient)
{

  button_label= (props.message_from_patient==="On IV fluids" ?  "Discontinue IV fluids" : "Commence on IV fluids" )
  message=props.message_from_patient

}

else if (props.message_from_bag)
{
  button_label= (props.message_from_bag==="Bag not running" ? "Start Bag" : "Pause Bag")
  message=props.message_from_bag
}

else
{
  button_label= (props.message_from_stopped_bag ? "Take down Bag" : "Cancel Bag")

  if( props.bag_running)
  {
   button_class="hidden" 
  }
}
return(
  <span>
  <span> {message}</span>
 <button id="start_ivfluid_message" className={button_class} onClick={()=>props.click_function(position)}> {button_label} </button> 
 </span>
)
}
export default StopStartFluidsButton