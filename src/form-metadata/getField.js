const matchFieldArrayMemberKey = (fieldKey) => fieldKey.match(/(.*)\[(\d+)\].(.*)/) || []

const getField = (fields, fieldKey) => {
  const [, arrayKey, index, memberKey] = matchFieldArrayMemberKey(fieldKey)
  return memberKey
    ? fields[arrayKey][index][memberKey]
    : fields[fieldKey]
}

export default getField
