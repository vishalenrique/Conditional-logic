import expect from 'expect'
import { path } from 'ramda'
import testConditions from './testConditions'
import reverseJsonPaths from './reverseJsonPaths'
import processFields from './processFields'
import { evaluateCondition, callbackEvaluateCondition } from './index'

const TEST_JSON = {
  person: {
    name: {
      first_name: { value: 'Chris', readable: true, editable: true },
      last_name: { value: 'Lee', readable: true, editable: true },
    },
    occupation: { value: 'Codemonkey', readable: true, editable: false }
  },
  city: { value: 'Dallas', readable: true, editable: true },
  country: { value: '  ', readable: true, editable: true },
  count: { value: 5, readable: true, editable: true },
  phone: { value: [1234567890, 9876543210], readable: true, editable: true },
  frts: [
    {
      id: { value: 0, readable: true, editable: true },
      nm: { value: 'apple', readable: true, editable: true },
    },
    {
      id: { value: 7, readable: true, editable: true },
      nm: { value: 'banana', readable: true, editable: true },
    }
  ]
}

const JSON_PATHS = {
  firstName: ['person', 'name', 'first_name'],
  lastName: ['person', 'name', 'last_name'],
  occupation: ['person', 'occupation'],
  city: ['city'],
  country: ['country'],
  count: ['count'],
  phone: ['phone'],
  'fruits': [['frts'], {
    name: ['nm'],
  }]
}

const { fields } = processFields(TEST_JSON, JSON_PATHS)

describe('evaluateCondition()', () => {
  it('evaluates a true equality condition', () => {
    const condition = [
      '==',
      { type: 'var', value: ['city'] },
      { type: 'string', value: 'Dallas' },
    ]

    expect(evaluateCondition(condition, fields, JSON_PATHS)).toEqual(true)
  })

  it('evaluates a false equality condition', () => {
    const condition = [
      '==',
      { type: 'var', value: ['person', 'name', 'first_name'] },
      { type: 'string', value: 'Bhris' },
     ]

    expect(evaluateCondition(condition, fields, JSON_PATHS)).toEqual(false)
  })

  Object.keys(testConditions).forEach((conditionName) => {
    Object.keys(testConditions[conditionName]).forEach((trueOrFalse) => {
      it(`evaluates a ${trueOrFalse} '${conditionName}' condition`, () => {
        const condition = evaluateCondition(testConditions[conditionName][trueOrFalse], fields, JSON_PATHS)
        expect(condition).toEqual(trueOrFalse === 'true')
      })
    })
  })


  it('works with array field', () => {
    const trueCondition = ['==',
      { type: 'var', value: ['frts', 'nm'] },
      { type: 'string', value: 'apple' }
    ]
    const falseCondition = ['!=',
      { type: 'var', value: ['frts', 'nm'] },
      { type: 'string', value: 'banana' }
    ]

    expect(evaluateCondition(falseCondition, fields, JSON_PATHS, 1)).toBe(false)
    expect(evaluateCondition(trueCondition, fields, JSON_PATHS, 0)).toBe(true)
  })
})

describe('callbackEvaluateCondition()', () => {
  it('evaluates complex comparisons with object values nested at various levels', () => {
    const condition = ['and',
      ['==', { 'type': 'var', 'value': ['country'] }, { 'type': 'string', 'value': 'deu' }],
      ['==', { 'type': 'var', 'value': ['lot', 'lot_type', 'lot_type_group_desc'] }, { 'type': 'string', 'value': 'Homeowners' }],
    ]
    const json = {
      country: { value: 'deu' },
      lot: {
        lot_type: { lot_type_group_desc: { value: 'Homeowners', editable: true, readable: true } },
      },
    }
    const evaluate = (varValue) => path([...varValue, 'value'], json)
    expect(callbackEvaluateCondition(condition, evaluate)).toEqual(true)
  })
})
