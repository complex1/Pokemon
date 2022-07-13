import { createStore } from 'vuex'
import user from './modules/user'
import chat from './modules/chat'
import swagger from './modules/swagger'

export default createStore({
  state: {
    showLoader: false
  },
  mutations: {
    OPEN_LOADER (state, value) {
      state.showLoader = value
    }
  },
  actions: {
  },
  modules: {
    user,
    chat,
    swagger
  }
})
