import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { FIELDS1 } from "./data.js";

import processFields from "./form-metadata/processFields";
import { evaluateCondition } from "./form-metadata/index";

import lotDetailsMapper from "./mapper";
import calculateFieldChanges from "./calculator/EffectsCalculator";
const processedFields = processFields(FIELDS1.data, lotDetailsMapper);
const fieldChangeEffects = processedFields.fieldChangeEffects;
//console.log(processedFields, fieldChangeEffects);

const isFunction = input => typeof input === "function";

const renderIf = predicate => elemOrThunk =>
  predicate ? (isFunction(elemOrThunk) ? elemOrThunk() : elemOrThunk) : null;

function evaluateChangeEffects(fieldState,fieldChangeEffects,objectWithNewValue){
  
  let newFieldState = {...fieldState};
  let changedObjectKey = Object.keys(objectWithNewValue)[0];//readyForPickUp
  let changedValue = objectWithNewValue[changedObjectKey];//""

  let effectedObjects = fieldChangeEffects[changedObjectKey];//pickUpOn{}

  if(effectedObjects){
          Object.keys(effectedObjects).forEach((effectedKey)=>{

            let effectedCurrentObject = effectedObjects[effectedKey];//{readable:{},editable:{},required:{}}
          
            let readable = "readable"
          
            let booleanResult = evaluateCondition(effectedCurrentObject[readable],fieldState,lotDetailsMapper);

            newFieldState = {...newFieldState,
              ...{[effectedKey]:{...newFieldState[effectedKey],...{readable:booleanResult},...{value:null}}}}

          });
        }

  return newFieldState;

  // let effectedKey = Object.keys(effectedObjects)[0];//pickUpOn
  // let effectedCurrentObject = effectedObjects[effectedKey];//{readable:{},editable:{},required:{}}

  // let readable = "readable"

  // let booleanResult = evaluateCondition(effectedCurrentObject[readable],fieldState,lotDetailsMapper);

  //   newFieldState = {...newFieldState,
  //  ...{[effectedKey]:{...newFieldState[effectedKey],...{readable:booleanResult}}}}
  //  return newFieldState;

}
class App extends Component {
  state = {
    fields: processFields(FIELDS1.data, lotDetailsMapper).fields,
    fieldChangeEffects: processFields(FIELDS1.data, lotDetailsMapper)
      .fieldChangeEffects,
    displayFields: [
      "hasKeys",
      "removedPersonalBelongings",
      "vehicleIsBlocked",
      "readyForPickup",
      "pickUpOn"
    ]
  };

  handleFieldChange = (event, i) => {
    const fieldState = {
      ...this.state.fields,
      ...{[i]:{...this.state.fields[i],...{value:event.target.value}}}};

    console.log("handleChange", fieldState);
   const newState = evaluateChangeEffects(fieldState,
    this.state.fieldChangeEffects,
    {[i]:event.target.value});

    this.setState({fields:newState});
  };


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.state.displayFields.map(i => {
            {
               console.log(i, "FIELD -> ", this.state.fields[i]);
            console.log(i,"FIELD_EFFECT -> ",this.state.fieldChangeEffects[i]); 
            }
            return renderIf(this.state.fields[i].readable)(
              <div>
                {i}
                {" -> "}
                <input
                  value={this.state.fields[i].value}
                  onChange={event => this.handleFieldChange(event, i)}
                />
              </div>
            );
          })}
        </p>
        {console.log(
          "********************************************************************************"
        )}
      </div>
    );
  }
}

export default App;
