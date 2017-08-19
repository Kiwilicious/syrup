module.exports = (state = {
  matchNotification: false
}, action) => {
  switch (action.type) {
    case 'SET_MATCH':
      state = Object.assign({}, state, {
        matchNotification: action.payload
      })

      return state
    default:
      return state
  }
}