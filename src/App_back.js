import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { FIELDS1 } from "./data.js";

import processFields from "./form-metadata/processFields";
import {evaluateCondition} from "./form-metadata/index";


import lotDetailsMapper from "./mapper";
import calculateFieldChanges from "./calculator/EffectsCalculator";
const processedFields = processFields(FIELDS1.data, lotDetailsMapper);
const fieldChangeEffects = processedFields.fieldChangeEffects;
console.log(processedFields, fieldChangeEffects);

const isFunction = input => typeof input === "function";
 
const renderIf = predicate => elemOrThunk =>
  predicate ? (isFunction(elemOrThunk) ? elemOrThunk() : elemOrThunk) : null;

  const mapObject = (obj, callback) => {
    const keys = Object.keys(obj)
    const newObj = {}
  
    for (const key of keys) {
      // eslint-disable-line no-restricted-syntax
      newObj[key] = callback(obj[key], key)
    }
  
    return newObj
  }
  //getprocessedfields x
//object assign x.fields to state
//change field cf{name: value}
//check if cf.name exists in x.fieldChangeEffects if(x.fieldChangeEffects[cf.name])
//if not quit
//if yes
//convert x.fieldChangeEffects to array of type FieldChangeEffectRuleType
//loop through FieldChangeEffectRuleTypeArray
//write a function to calculate



let fieldChangeEffectsObject = {};
Object.keys(fieldChangeEffects).forEach(i => {
  Object.keys(fieldChangeEffects[i]).forEach(j => {
    if (!fieldChangeEffectsObject[i]) {
      fieldChangeEffectsObject[i] = [];
    }
    fieldChangeEffectsObject[i].push({ [j]: fieldChangeEffects[i][j] });
  });
});


console.log(
  calculateFieldChanges(fieldChangeEffectsObject)(FIELDS1.data)(
    "readyForPickup",
    ["ready_for_pickup"],
    "pick_up_on"
  )
);
function fieldChangeEffectsCalculator(state, fieldChangeEffects, changedField){
  let newState = {...state};
  let changedKey = Object.keys(changedField)[0];
  let changedValue = changedField[changedKey];

  if(!fieldChangeEffects[changedKey]){
    return newState;
  }

  let fieldChangeEffectsObject = {};
  Object.keys(fieldChangeEffects).forEach(i => {
    Object.keys(fieldChangeEffects[i]).forEach(j => {
      if (!fieldChangeEffectsObject[i]) {
        fieldChangeEffectsObject[i] = [];
      }
      fieldChangeEffectsObject[i].push({ [j]: fieldChangeEffects[i][j] });
    });
  });
  console.log(fieldChangeEffectsObject);
  return singleFieldChangeEffectsCalculator(state, fieldChangeEffectsObject, changedKey)
}

function singleFieldChangeEffectsCalculator(state, fieldChangeEffectsObject, changedKey){
  let newState = {...state};
  console.log("Begin>>>",newState, changedKey);
  fieldChangeEffectsObject[changedKey].forEach((i) => {
    let key = Object.keys(i)[0]
    console.log(i, key);

    newState = {...newState, [key]:{...newState[key],...mapObject(i[key], (condition, l) => {
      if(key === "pickUpOn"){
        console.log(condition, l, newState);
      }
      return evaluateCondition(
        condition,
        newState,
        lotDetailsMapper
      );
    })}}
    console.log(newState[key], key);
    if(!newState[key].readable){
      newState[key].value = null;
    }
    console.log("End>>>",newState);

    if(fieldChangeEffectsObject[key]){
      newState = singleFieldChangeEffectsCalculator(newState, fieldChangeEffectsObject, key)
    }
  })
  return newState;
}

class App extends Component {
  state = {
    fields: processFields(FIELDS1.data, lotDetailsMapper).fields,
    fieldChangeEffects: processFields(FIELDS1.data, lotDetailsMapper).fieldChangeEffects,
    displayFields: [
      "hasKeys",
      "pickUpOn",
      "readyForPickup",
      "removedPersonalBelongings",
      "vehicleIsBlocked"
    ]
  };
  handleFieldChange = (event, i) => {
    const state = {
      ...this.state.fields,
      ...{ [i]: { ...this.state.fields[i], ...{ value: event.target.value } } }
    };
console.log("test1");
   let newState = fieldChangeEffectsCalculator(state, this.state.fieldChangeEffects, {[i]: event.target.value})
   console.log("test2");

   this.setState({ fields: newState });
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
            return (
              renderIf(this.state.fields[i].readable)(
              <div>
                {i}{" "}
                <input
                  value={this.state.fields[i].value}
                  onChange={event => this.handleFieldChange(event, i)}
                />
              </div>
              )
            );
          })}
        </p>
      </div>
    );
  }
}

export default App;
