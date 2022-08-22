export const endpointUrl = 'https://septem-consilium.herokuapp.com/'
// export const endpointUrl = 'http://localhost:3030/'

export const ItemTypes = {
  TODO: 'todo'
}

export const weekColumnsClassNames = [
  'column__sun',
  'column__mon',
  'column__tue',
  'column__wed',
  'column__thu',
  'column__fri',
  'column__sat'
]

export const draftsColumnsClassNames = [
  'column__drafts-0',
  'column__drafts-1',
  'column__drafts-2'
]

export const inputValidation = {
  _name: {
    min: 1,
    max: 28
  },
  _password: {
    min: 8,
    max: 28
  },
  _email: {
    min: 8,
    max: 55
  }
}
