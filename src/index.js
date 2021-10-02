import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import patients from "./mock_patients.js"
import Patient from "./patient.js"

function App() {
  let patient_list=patients

  return (
    <>
    <Ward />
    <PatientList  data={patient_list} />
    </>
  );
}  

function Ward()
{
return(
<div id="ward">Ward 26</div>
)

}
function PatientList(props)
{
  
  const list_of_patients=props.data.map((data_item, index)=><Patient key={index} patient_data={data_item} patient_in_array={index} />)
  return (list_of_patients)

}



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()