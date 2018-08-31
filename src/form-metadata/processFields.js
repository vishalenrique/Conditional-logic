import { path, reject, filter, pipe, pick, mapObjIndexed, difference } from 'ramda'
import evaluateCondition from './evaluateCondition'
import { isConditionalValue, getAllVarPaths } from './conditionUtils'
import getReverseJsonPaths from './reverseJsonPaths'
import getField from './getField'
import getArrayMemberKey from './getArrayMemberKey'

const addFieldChangeEffects = (hash, contingentFieldName, contingentFieldPropertyName, contingentFieldPropertyConditionalLogic, fieldKeyFromJsonPath) => {
  const namesOfFieldsToTriggerChange = getAllVarPaths(contingentFieldPropertyConditionalLogic).map(fieldKeyFromJsonPath)
  namesOfFieldsToTriggerChange.filter((v) => v).forEach((nameOfFieldToTriggerChange) => {
    const changeTriggerField = hash[nameOfFieldToTriggerChange] = hash[nameOfFieldToTriggerChange] || {}
    const contingentField = changeTriggerField[contingentFieldName] = changeTriggerField[contingentFieldName] || {}
    contingentField[contingentFieldPropertyName] = contingentFieldPropertyConditionalLogic
  })
  return hash
}

const mapObjWithArrays = (fn, obj, fieldsJson) => {
  const keys = Object.keys(obj)
  const onlyArrays = k => (/\[\]/).test(k)

  const arrayKeys = keys.filter(k => Array.isArray(obj[k][0]))
  const arrays = arrayKeys.reduce((hash, arrayKey) => {
    const [jsonArrayPath, jsonArrayElementSchema] = obj[arrayKey]
    const finalKey = arrayKey
    const resultArray = path(jsonArrayPath, fieldsJson).map((arrayElement, index) => {
      return mapObjIndexed((jsonPath, arrayFieldKey) => {
        const fullArrayFieldKey = `${finalKey}[].${arrayFieldKey}`
        const pathBuilder = { jsonArrayPath, index, jsonPath }
        return fn([...jsonArrayPath, index, ...jsonPath], fullArrayFieldKey, fieldsJson, index)
      }, jsonArrayElementSchema)
    })
    hash[finalKey] = resultArray
    return hash
  }, {})

  const nonArrayKeys = difference(keys, arrayKeys)
  const nonArrays = pipe(
    pick(nonArrayKeys),
    mapObjIndexed((a, b) => fn(a, b, fieldsJson))
  )(obj)

  return { ...arrays, ...nonArrays }
}

const prettyPrintTableRow = (left, right) => left.padEnd(40, '-') + '-' + right.padStart(20, '-')

const forEachField = (json, fn, path = []) => {
  const keys = Object.keys(json)
  keys.forEach((key) => {
    const val = json[key]
    if (Array.isArray(val) || (val && val.hasOwnProperty('value'))) {
      return fn([...path, key], val)
    } else {
      return forEachField(val, fn, [...path, key])
    }
  })
}

const pathWithArrayIndex = (thePath, obj, index) => {
  if (index == null) return path(thePath, obj)

  let current = obj
  for (let i = 0; i < thePath.length; i++) {
    if (current == null) return undefined
    current = Array.isArray(current)
      ? current[index][thePath[i]]
      : current[thePath[i]]
  }
  return current
}

const processFields = (fieldsJson, jsonPaths) => {
  let fieldChangeEffects = {}
  let absentFields = []

  const reverseJsonPaths = getReverseJsonPaths(jsonPaths)
  const fieldKeyFromJsonPath = (path) => reverseJsonPaths[path]
    // || console.error(`Could not build condition for field at ${path.join('.')} without corresponding field key`) // eslint-disable-line no-console

  const fields = mapObjWithArrays((jsonPath, fieldKey, fieldsJsonParam, index) => {
    const fieldProperties = path(jsonPath, fieldsJsonParam) // { readable: ..., editable: ..., value: ... }
    if (!fieldProperties) {
      absentFields.push({ jsonPath, fieldKey })
      return {}
    }
    return mapObjIndexed((propertyValue, propertyName) => ( // e.g. (true, 'editable')
      isConditionalValue(propertyValue)
        ? evaluateCondition(propertyValue, (varValue) => {
          // build out fieldChangeEffects here so we don't have to loop through all fields twice
          fieldChangeEffects = addFieldChangeEffects(fieldChangeEffects, fieldKey, propertyName, propertyValue, fieldKeyFromJsonPath)

          const value = pathWithArrayIndex([...varValue, 'value'], fieldsJsonParam, index)
          return value
        })
        : propertyValue
      ), fieldProperties)
  }, jsonPaths, fieldsJson)

  if (absentFields.length) {
    const pretty = absentFields.map(({ fieldKey = 'undefined', jsonPath }) =>
      prettyPrintTableRow(jsonPath.join('.'), `'${fieldKey}'`)
    ).join('\n')
    // console.warn(`Could not find data for these ${absentFields.length} fields:\n${pretty}`)
  }

  let excessFields = []
  forEachField(fieldsJson, (path) => {
    if (!reverseJsonPaths[path] && !Array.isArray(fieldsJson[path])) excessFields.push(path.join('.'))
  })
  if (excessFields.length) {
    // console.warn(`No field keys given for these values in the provided JSON:\n${excessFields.join('\n')}`)
  }

  return {
    fields,
    fieldChangeEffects,
  }
}

export default processFields
