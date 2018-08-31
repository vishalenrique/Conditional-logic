const cache = new WeakMap()

// as paths are arrays of string, keys are automatically coerced to comma-joined strings
const reverseJsonPaths = (FIELD_KEYS_TO_PATHS) => {
  const keys = Object.keys(FIELD_KEYS_TO_PATHS)
  const result = keys.reduce((obj, fieldKey) => {
    const fieldInfo = FIELD_KEYS_TO_PATHS[fieldKey]
    if (Array.isArray(fieldInfo[0])) {
      const memberSchema = fieldInfo[1]
      Object.keys(memberSchema).forEach((memberFieldKey) => {
        const memberPath = memberSchema[memberFieldKey]
        const fullKey = [...fieldInfo[0], ...memberPath]
        obj[fullKey] = `${fieldKey}[].${memberFieldKey}`
      })
    } else {
      obj[fieldInfo] = fieldKey
    }
    return obj
  }, {})
  return result
}

const reverseJsonPathsCached = (jsonPaths) => (
  cache.get(jsonPaths)
  || cache.set(jsonPaths, reverseJsonPaths(jsonPaths)).get(jsonPaths)
)

export default reverseJsonPathsCached
