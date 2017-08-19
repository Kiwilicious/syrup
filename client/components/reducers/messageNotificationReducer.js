module.exports = (state = {
  messageNotification: false
}, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      state = Object.assign({}, state, {
        messageNotification: action.payload
      })

      return state
    default:
      return state
  }
}