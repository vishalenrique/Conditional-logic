import expect from 'expect'
import prepareSubmission from './prepareSubmission'

describe('prepareSubmission()', () => {
  const fieldsState = {
    apple: { value: 'red', readable: true, editable: true },
    orange: { value: 'orange', readable: true, editable: true },
    banana: { value: 'yellow', readable: true, editable: false },
    strawberry: { value: 'red', readable: true, editable: true },
    raspberry: { value: 'red', readable: true, editable: false },
    fruits: [
      {
        id: { value: 1, readable: true, editable: true },
        name: { value: 'mango', readable: true, editable: true },
      },
      {
        id: { value: 2, readable: true, editable: false },
        name: { value: 'litchi', readable: true, editable: false },
      },
    ]
  }
  const jsonPaths = {
    apple: ['appl'],
    orange: ['orng'],
    banana: ['bnna'],
    strawberry: ['brry', 'strw'],
    raspberry: ['brry', 'rspb'],
    fruits: [['frts'], {
      id: ['id'],
      name: ['nm'],
    }]
  }

  it('builds JSON from editable fields according to structure specified in JSON paths map', () => {
    const submission = prepareSubmission(jsonPaths, fieldsState)

    expect(submission).toInclude({
      appl: 'red',
      orng: 'orange',
      brry: { strw: 'red' },
      frts: [
        { id: 1, nm: 'mango' },
        {}, // empty since all fields are uneditable
      ]
    })
    expect(submission).toNotInclude({
      bnna: 'yellow',
      brry: { rspb: 'red' },
    })
  })
})
