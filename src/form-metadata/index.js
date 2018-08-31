import callbackEvaluateCondition from './evaluateCondition'
import reverseJsonPaths from './reverseJsonPaths'
import getField from './getField'
import getArrayMemberKey from './getArrayMemberKey'

export const evaluateCondition = (condition, fields, jsonPaths, memberIndex) => { 
  // console.log(condition, fields, jsonPaths, memberIndex);

  return callbackEvaluateCondition(condition, (varValue) => {
  
  const key = memberIndex == null
    ? reverseJsonPaths(jsonPaths)[varValue]
    : getArrayMemberKey(
      reverseJsonPaths(jsonPaths)[varValue],
      memberIndex
    )

  if (!key) return

  return (getField(fields, key) || {}).value
})
};

// export callbackEvaluateCondition from './evaluateCondition'
// export reverseJsonPaths from './reverseJsonPaths'
// export processFields from './processFields'
// export prepareSubmission from './prepareSubmission'
