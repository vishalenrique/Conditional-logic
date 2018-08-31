const UNARY_OPERATIONS = ['present', 'blank']
export const getOperands = (operator, operands) => UNARY_OPERATIONS.includes(operator)
  ?  operands.slice(0, operands.length - 1)
  : operands

export const isValidOperand = (el) =>
  typeof el === 'boolean'
  || (typeof el === 'object' && 'type' in el && 'value' in el)
  || isConditionalValue(el)

const isConditionalArray = ([first, ...rest]) => typeof first === 'string' && getOperands(first, rest).every(isValidOperand)
export function isConditionalValue(val) {
  return Array.isArray(val) && isConditionalArray(val)
}

const isVar = (val) => val && typeof val === 'object' && val.type === 'var'

export const getAllVarPaths = (conditionalLogic) => conditionalLogic.reduce((vars, val) => {
  if (Array.isArray(val)) {
    return vars.concat(getAllVarPaths(val))
  } else {
    return vars.concat(isVar(val) ? [val.value] : [])
  }
}
, [])
