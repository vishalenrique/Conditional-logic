import { mapObjIndexed, assocPath } from 'ramda'

export const addToTree = (tree, path, value) => {
  let currentPosition = tree
  path.forEach((pathSegment, i) => {
    const lastSegment = i === path.length - 1
    currentPosition[pathSegment] = currentPosition[pathSegment] || (
      lastSegment
      ? value
      : {}
    )
    currentPosition = currentPosition[pathSegment]
  })
}

const addArrayToTree = (tree, des, array) => {
  const [path, memberSchema] = des
  let currentPosition = tree
  path.forEach((pathSegment, i) => {
    const lastSegment = i === path.length - 1
    currentPosition[pathSegment] = currentPosition[pathSegment] || (
      lastSegment
      ? array.map((member, memberIndex) =>
        Object.keys(memberSchema).reduce((obj, key) => {
          const memberPath = memberSchema[key]
          if (!member[key].editable) return obj
          const memberValue = member[key].value

          return assocPath(memberPath, memberValue, obj)
        }, {})
      ).filter((member) => Object.keys(member).length)
      : {}
    )
  })
}

const prepareSubmission = (jsonPaths, fieldsState) => {
  let tree = {}
  Object.keys(fieldsState).forEach((fieldKey) => {
    const field = fieldsState[fieldKey]
    if (!field) {
      // console.error(`No data for field ${fieldKey}`)
    } else if (field.editable) {
      addToTree(tree, jsonPaths[fieldKey], field.value)
    } else if (Array.isArray(field)) {
      tree = assocPath(jsonPaths[fieldKey][0], fieldsState[fieldKey].map((member) =>
        prepareSubmission(jsonPaths[fieldKey][1], member)
      ), tree)
    }
  })
  return tree
}

export default prepareSubmission
