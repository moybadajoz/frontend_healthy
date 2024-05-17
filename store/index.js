// export const state = () => ({
//   user: null,
//   token: null
// })

// export const mutations = {
//   setUser (state, user) {
//     state.user = user
//   },
//   setToken (state, token) {
//     state.token = token
//   }
// }

// export const getters = {
//   getUser: state => state.user
// }
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store_test({
  state: {
    user: null,
    token: null
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setToken (state, token) {
      state.token = token
    }
  },
  getters: {
    getUser: state => state.user
  },
  plugins: [createPersistedState()]
})
