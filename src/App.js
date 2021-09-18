
import './App.css';
import patients from "./patients.js"

function App() {
  let patient_list=patients
  return (
    <PatientList  data={patient_list} />
    
  );
}  



function PatientList(props)
{
return(
<Patient data= {props[1]} />
)
};


function Patient(props)
{
  return(
  <div>{props.patient_name}</div>
  )

}





export default App;