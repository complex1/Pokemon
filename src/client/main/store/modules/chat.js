import socket from '@/api/socket';
export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {
    setUpChatSocket(state, socket) {
      socket.on('message', (message) => {
        console.log('message', message);
        // state.messages.push(message);
      });
    }
  },
  actions: {
    initChatSocket({ commit }) {
      commit('setUpChatSocket', socket);
    }
  }
}