import socket from '@/api/socket';
import api from '@/api/chatApi';
export default {
  namespaced: true,
  state: {
    chats: [],
  },
  getters: {
    chats(state) {
      return state.chats;
    }
  },
  mutations: {
    setChats(state, chats) {
      state.chats = chats;
    },
    setUpChatSocket(state, socket) {
      socket.on('message', (message) => {
        console.log('message', message);
      });
    }
  },
  actions: {
    initChatSocket({ commit }) {
      commit('setUpChatSocket', socket);
    },
    getChatSummary({ commit }) {
      api.getChatSummary((response) => {
        commit('setChats', response.data);
      }, (error) => {
        console.log('error', error);
      });
    }
  }
}