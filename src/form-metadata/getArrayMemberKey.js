const getArrayMemberKey = (memberFieldKey = '', index) => memberFieldKey.replace(/\[\]/, `[${index}]`)

export default getArrayMemberKey
