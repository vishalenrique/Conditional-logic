import { memoize } from 'ramda'
import { isConditionalValue, isValidOperand, getOperands } from './conditionUtils'

const isNotProvided = (val) => (val == null || val._isAbsent)

const OPERATIONS = {
  '==': (a, b) => a === b,
  '!=': (a, b) => a !== b,
  '<': (a, b) => a < b,
  '<=': (a, b) => a <= b,
  '>': (a, b) => a > b,
  '>=': (a, b) => a >= b,
  and: (a, b) => Boolean(a && b),
  or: (a, b) => Boolean(a || b),
  present: (a) => Boolean((isNotProvided(a) ? '' : String(a)).trim()),
  blank: (a) => !Boolean((isNotProvided(a) ? '' : String(a)).trim()),
  in: (item, array) => array.includes(item),
  nin: (item, array) => !array.includes(item),
  regex: (a, b) => b.test(a),
}

const getOperation = (operator) => {
  const validOperation = OPERATIONS[operator]
  if (validOperation) {
    return validOperation
  }

  throw new Error(`Invalid operator '${operator}'`)
}

const warnOfAbsentValue = (path, fieldProperty) => {
  const joinedPath = [].concat(path).join('.')

  // console.error(`Cannot access "${fieldProperty}" of absent field queried with '${joinedPath}'`) // eslint-disable-line no-console
}
const absentValue = memoize((path) => ({
  get value() { warnOfAbsentValue(path, 'value') },
  get editable() { warnOfAbsentValue(path, 'editable') },
  get readable() { warnOfAbsentValue(path, 'readable') },
  get required() { warnOfAbsentValue(path, 'required') },
  _isAbsent: true,
}))

const evaluateCondition = ([operator, ...operands], evaluateVar) =>
  getOperation(operator)(...getOperands(operator, operands).map((operand) => {
    if (isConditionalValue(operand)) {
      return evaluateCondition(operand, evaluateVar)
    }

    if (isValidOperand(operand)) {
      if (operand.type === 'var') {
        const evaluatedVar = evaluateVar(operand.value)
        return evaluateVar == null ? absentValue(operand.value) : evaluatedVar
      } else {
        return operand && typeof operand === 'object' ? operand.value : operand
      }
    }

    throw new Error('Invalid format: ' + JSON.stringify(operand))
  }))

export default evaluateCondition
