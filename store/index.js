import createPersistedState from 'vuex-persistedstate'

export const state = () => ({
  user: null,
  token: null
})

export const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setToken (state, token) {
    state.token = token
  }
}

export const getters = {
  getUser: state => state.user
}
export const plugins = [createPersistedState()]
