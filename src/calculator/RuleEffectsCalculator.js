// @flow

//getprocessedfields x
//object assign x.fields to state
//change field cf{name: value}
//check of cf.name exists in x.fieldChangeEffects if(x.fieldChangeEffects[cf.name])
//if not quit
//if yes
//convert x.fieldChangeEffects to array of type FieldChangeEffectRuleType
//loop through FieldChangeEffectRuleTypeArray
//write a function to calculate

import { pathOr } from 'ramda'

import Queue from './Queue'

type FieldChangeObjectType = {
  name: string,
  path: Array<string>,
  value: any,
  editable: boolean,
  readable: boolean,
  required: boolean,
  otherProps: { prop: any }
}

type FieldChangeEffectRuleType = {
  name: string,
  path: Array<string>,
  value: (newValue: any, state: {}) => any,
  editable: (newValue: any, state: {}) => boolean,
  readable: (newValue: any, state: {}) => boolean,
  required: (newValue: any, state: {}) => boolean,
  otherProps: (
    newValue: any,
    state: {}
  ) => {
    prop: any
  }
}

const containsField = (fieldChanges: Array<FieldChangeObjectType>, fieldToFind: string): boolean =>
  (fieldChanges.filter(({ name }) => name === fieldToFind) || []).length > 0

/**
 * 
 * COMPLEX FUNCTION. CONSIDER CAUTION WHILE MODIFYING.
 * 
 * This is a helper function that will used in queue iterations. This function hosts the
 * infinite loop breaking logic. When ever it calculates changes a certain field, it checks
 * inside the rules if changing that rule, will there be other fields that will have to be calcualted
 * and add them into the queue so they will be processed in next iterations.
 * 
 * @param { fieldName: Array<FieldChangeEffectRuleType> } FIELD_CHANGE_EFFECT_RULES 
 * @param queue 
 * @param {Array<FieldChangeObjectType>} fieldChanges
 * @param {string} changedFieldName
 * @param {any} newValue
 * @param state
 * 
 * @author Revanth Kumar
 */
const calculateSingleFieldChanges = (
  FIELD_CHANGE_EFFECT_RULES: { fieldName: Array<FieldChangeEffectRuleType> },
  queue,
  fieldChanges: Array<FieldChangeObjectType>
) => (changedFieldName: string, newValue: any, state: {}): Array<FieldChangeObjectType> => {
  const fieldsConfig: Array<FieldChangeEffectRuleType> = FIELD_CHANGE_EFFECT_RULES[changedFieldName]
  if (fieldsConfig) {
    return fieldsConfig
      .map(({ name, path, value, editable, readable, required, otherProps }): FieldChangeObjectType => {
        if (containsField(fieldChanges, name)) {
          /**
           * This mean the field change has already been calculated.
           * Looks like an infinite loop. Dont execute this field change.
           */
          console.warn(
            `Infinite loop found. ${changedFieldName} is about to change ${name} which has been changed due to other field. Not executing this field change effect to avoid inifinite loop.`
          )
          return null
        } else {
          const changes = {
            name: name,
            path: path,
            value: value(newValue, state),
            editable: editable(newValue, state),
            readable: readable(newValue, state),
            required: required(newValue, state),
            otherProps: otherProps ? otherProps(newValue, state) : {}
          }
          if (FIELD_CHANGE_EFFECT_RULES[name]) {
            /**
             * This means, due to this field change, some other fields
             * need to change. Hence add it into the queue.
            */
            queue.push({ name, newValue: changes.value })
          }
          return changes
        }
      })
      .filter(fieldConfig => fieldConfig)
  }
  return []
}

/**
 * 
 * COMPLEX FUNCTION. CONSIDER CAUTION WHILE MODIFYING.
 * 
 * This function calculates all field change effects if @param {string} name is changed to @param {any} value.
 * It calculates all field changes even if they are n-level deep using a queue iteratively.
 * Rules are provided as a parameter. @param {Array<FieldChangeEffectRuleType>} FIELD_CHANGE_EFFECT_RULES.
 * The function also gets @param state which is the global state at that point of time.
 * @param {Array<string>} path will be used to fetch the field from the global state. 
 * It has logic built into it to avoid the execution of certain field change effects if an infinite loop has been detected.
 * 
 * @author Revanth Kumar
 */
const calculateFieldChanges = (FIELD_CHANGE_EFFECT_RULES: {
  fieldName: Array<FieldChangeEffectRuleType>
}) => (state: {}) => (name: string, fieldPath: Array<string>, value: any): Array<FieldChangeObjectType> => {
  /**
    queue at all times contains field changes that need to be
    calcualted.
    Type of objects the queue will always contain:
    {
      name: string,
      newValue: any
    }
  */
  const queue = new Queue()
  /**
   * This is the first change that will be calculated in the queue.
   */
  queue.push({ name, newValue: value })
  const fieldChanges = [
    {
      name,
      path: fieldPath,
      value,
      editable: pathOr(false, [...fieldPath, 'editable'], state),
      readable: pathOr(false, [...fieldPath, 'readable'], state),
      required: pathOr(false, [...fieldPath, 'required'], state),
      otherProps: pathOr({}, [...fieldPath, 'otherProps'], state)
    }
  ]
  const singleFieldChangesCalculator = calculateSingleFieldChanges(FIELD_CHANGE_EFFECT_RULES, queue, fieldChanges)
  /**
   * Iterate over the queue till all the calculations are done.
   * At first it will only contain the field changes that are inteded for the
   * field that has been changed on the UI. Once the iteration progresses we might
   * change some field that has change effects for other fields. For instance A might
   * have change effect for B and B might have for C. Once we calculate for A using
   * calculateSingleFieldChanges(A) we will know that B depends on A from FIELD_CHANGE_EFFECTS[A]
   * and add it into queue. Same for C.
   */
  while (queue.hasKeys()) {
    const field = queue.pop()
    fieldChanges.push(...singleFieldChangesCalculator(field.name, field.newValue, state))
  }
  return fieldChanges
}

export default calculateFieldChanges