import expect from 'expect'
import processFields from './processFields'

describe('processFields()', () => {
  it('returns a flat tree of field data', () => {
    const fieldsJson = {
      appl: { value: 'red', readable: true, editable: true },
      orng: { value: 'orange', readable: true, editable: true },
      bnna: { value: 'yellow', readable: true, editable: true },
      brry: {
        strw: { value: 'red', readable: true, editable: true },
        rspb: { value: 'red', readable: true, editable: true },
      },
      bskt: {
        frts: [
          {
            id: { value: 1, readable: true, editable: true},
            nm: { value: 'apple', readable: true, editable: true},
          },
          {
            id: { value: 2, readable: true, editable: true},
            nm: { value: 'banana', readable: true, editable: true},
          },
          {
            id: { value: 3, readable: true, editable: true},
            nm: { value: 'orange', readable: true, editable: true},
          },
        ]
      },
      absentInMapperSimple: { value: null, readable: true, editable: true },
      absentInMapper: {
        absentInMapperNested: { value: null, readable: true, editable: true },
        absentInMapperArray: [{ value: null, readable: true, editable: true }],
      },
    }
    const jsonPaths = {
      apple: ['appl'],
      orange: ['orng'],
      banana: ['bnna'],
      strawbery: ['brry', 'strw'],
      raspberry: ['brry', 'rspb'],
      'fruits': [['bskt', 'frts'], {
        id: ['id'],
        name: ['nm'],
      }],
    }

    // const warn = expect.spyOn(console, 'warn')

    // expect(processFields(fieldsJson, jsonPaths).fields).toEqual({
    //   apple: fieldsJson.appl,
    //   orange: fieldsJson.orng,
    //   banana: fieldsJson.bnna,
    //   strawbery: fieldsJson.brry.strw,
    //   raspberry: fieldsJson.brry.rspb,
    //   fruits: fieldsJson.bskt.frts.map(f => ({
    //     id: f.id,
    //     name: f.nm,
    //   }))
    // })
    // expect(warn.calls[0].arguments[0]).toInclude('absentInMapperSimple')
    // expect(warn.calls[0].arguments[0]).toInclude('absentInMapper.absentInMapperNested')
    // expect(warn.calls[0].arguments[0]).toInclude('absentInMapper.absentInMapperArray')
    // also for array member fields?

    expect.restoreSpies()
  })

  it('evaluates all conditions present in field data', () => {
    const onlyIfYouLikeIceCream = [
      '==',
      { type: 'var', value: ['do_you_like_ice_cream'] },
      { type: 'string', value: 'yes' },
    ]
    const onlyIfNameIsVanilla = [
      '==',
      { type: 'var', value: ['flavors', 'nm'] },
      { type: 'string', value: 'vanilla' }
    ]
    const fieldsJson = {
      do_you_like_ice_cream: { value: 'yes', readable: true, editable: false },
      favorite_ice_cream_flavor: { value: null, readable: true, editable: onlyIfYouLikeIceCream },
      flavors: [
        {
          id: { value: 2, readable: true, editable: true },
          nm: { value: 'chocolate', readable: true, editable: onlyIfYouLikeIceCream },
        },
        {
          id: { value: 8, readable: true, editable: onlyIfNameIsVanilla },
          nm: { value: 'vanilla', readable: true, editable: true, }
        }
      ],
    }
    const jsonPaths = {
      likesIceCream: ['do_you_like_ice_cream'],
      favoriteFlavor: ['favorite_ice_cream_flavor'],
      'flavors': [['flavors'], {
        id: ['id'],
        name: ['nm'],
      }],
    }

    const processedFields = processFields(fieldsJson, jsonPaths).fields

    expect(processedFields).toInclude({
      favoriteFlavor: { value: null, readable: true, editable: true },
      flavors: [{
        id: { value: 2, readable: true, editable: true},
        name: { value: 'chocolate', readable: true, editable: true },
      },
      {
        id: { value: 8, readable: true, editable: true },
        name: { value: 'vanilla', readable: true, editable: true },
      }],
    })
  })

  it('returns tree of fieldChangeEffects with conditions organized by their dependencies', () => {
    const ifYouLikeIceCream = (likeIt) => [
      likeIt ? '==' : '!=',
      { type: 'var', value: ['do_you_like_ice_cream'] },
      { type: 'string', value: 'yes' },
    ]
    const fieldsJson = {
      do_you_like_ice_cream: { value: 'yes', readable: true, editable: false },
      favorite_ice_cream_flavor: { value: null, readable: true, editable: ifYouLikeIceCream(true) },
      why_dnt_u_like_ice_crm: { value: null, readable: ifYouLikeIceCream(false), editable: ifYouLikeIceCream(false) },
      flavors: [
        {
          id: { value: 2, readable: true, editable: true},
          nm: { value: 'chocolate', readable: true, editable: ifYouLikeIceCream(true)},
        },
      ],
    }
    const jsonPaths = {
      likesIceCream: ['do_you_like_ice_cream'],
      favoriteFlavor: ['favorite_ice_cream_flavor'],
      whyNot: ['why_dnt_u_like_ice_crm'],
      'flavors': [['flavors'], {
        id: ['id'],
        name: ['nm'],
      }],
    }

    expect(processFields(fieldsJson, jsonPaths).fieldChangeEffects).toEqual({
      // when this field changes
      likesIceCream: {
        // these fields change in return
        favoriteFlavor: {
          // the property that changes is matched to the condition
          editable: ifYouLikeIceCream(true)
        },
        whyNot: {
          // multiple properties may be affected
          readable: ifYouLikeIceCream(false),
          editable: ifYouLikeIceCream(false),
        },
        'flavors[].name': {
          editable: ifYouLikeIceCream(true),
        }
      }
    })
  })
})
