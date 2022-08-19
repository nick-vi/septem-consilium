export const normalizeData = (data, mongoDb = false) => {
  const normalizedData = {}
  if (data && mongoDb) {
    data.map((datum) => {
      const { _id: id, ...props } = datum
      return (normalizedData[id] = { id, ...props })
    })
  } else if (data) {
    data.map((datum) => {
      const { id, ...props } = datum
      return (normalizedData[id] = { id, ...props })
    })
  }
  return normalizedData
}
