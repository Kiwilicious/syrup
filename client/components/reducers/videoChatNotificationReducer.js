module.exports = (state = {
  videoChatNotification: false
}, action) => {
  switch (action.type) {
    case 'SET_VIDEOCHAT':
      state = Object.assign({}, state, {
        videoChatNotification: action.payload
      })

      return state
    default:
      return state
  }
}