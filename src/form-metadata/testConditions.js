import expect from 'expect'
import { path } from 'ramda'

const variable = (value) => ({ type: 'var', value: [value] })
const string = (value) => ({ type: 'string', value })
const number = (value) => ({ type: 'number', value })
const regex = (value) => ({ type: 'regex', value })

const testConditions = {
  equals: {
    true: ['==', variable('city'), string('Dallas')],
    false: ['==', variable('city'), string('')],
  },
  'not equals': {
    true: ['!=', variable('city'), string('EFGH')],
    false: ['!=', variable('city'), string('Dallas')],
  },
  'less than': {
    true: ['<', variable('count'), number(10)],
    false: ['<', variable('count'), number(1)],
  },
  'less than or equal to': {
    true: ['<=', variable('count'), number(5)],
    false: ['<=', variable('count'), number(4)],
  },
  'greater than': {
    true: ['>', variable('count'), number(1)],
    false: ['>', variable('count'), number(5)],
  },
  'greater than or equal to': {
    true: ['>=', variable('count'), number(5)],
    false: ['>=', variable('count'), number(10)],
  },
  presence: {
    true: ['present', variable('city'), {}],
    false: ['present', variable('country'), {}],
  },
  'non-string presence': {
    true: ['present', variable('count'), {}],
    false: ['present', variable('asdfasdfasdf'), {}]
  },
  blankness: {
    true: ['blank', variable('country'), {}],
    false: ['blank', variable('city'), {}],
  },
  in: {
    true: ['in', number(1234567890), variable('phone')],
    false: ['in', number(9234567890), variable('phone')],
  },
  'not-in': {
    true: ['nin', number(5678901234), variable('phone')],
    false: ['nin', number(9876543210), variable('phone')],
  },
  regex: {
    true: ['regex', variable('city'), regex(/Dal/)],
    false: ['regex', variable('city'), regex(/dal/)],
  },
}
testConditions.or = {
  true: ['or', testConditions['less than'].false, testConditions.presence.true],
  false: ['or', testConditions['less than'].false, testConditions.presence.false],
}
testConditions.and = {
  true: ['and', testConditions.equals.true, testConditions.or.true],
  false: ['and', testConditions.equals.true, testConditions.or.false],
}

export default testConditions
