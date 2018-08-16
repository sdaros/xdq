export const state = () => ({
  loggedInUserDataRole: ''
})

export const getters = {
  loggedInUserDataRole (state) {
    return state.loggedInUserDataRole
  }
}

export const mutations = {
  setLoggedInUserDataRole (state, role) {
    state.loggedInUserDataRole = role
  }
}
