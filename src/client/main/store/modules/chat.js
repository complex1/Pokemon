import socket from '@/api/socket';
import api from '@/api/chatApi';
export default {
  namespaced: true,
  state: {
    chats: {},
    openChatEmail: '',
    openChatName: '',
    openChatIsOnline: false,
  },
  getters: {
    chats(state) {
      return state.chats;
    },
    openChatEmail(state) {
      return state.openChatEmail;
    },
    openChatName (state) {
      return state.openChatName
    },
    openChatIsOnline (state) {
      return state.openChatIsOnline
    },
    getChatWithEmail(state) {
      return state.chats[state.openChatEmail] || {isOnline: state.openChatIsOnline, msg: [], name: state.openChatName};
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
    },
    setOpenChat(state, user) {
      state.openChatEmail = user.email
      state.openChatName = user.name
      state.openChatIsOnline = user.isOnline
    },
    setUserOnline(state, payload) {
      state.openChatIsOnline = payload
    }
  },
  actions: {
    initChatSocket({ commit }) {
      commit('setUpChatSocket', socket);
    },
    isOnline({ commit, state}) {
      api.getUserIsOnline(state.openChatEmail,(res) => {
        commit('setUserOnline', res.data)
      })
    },
    getChatSummary({ commit }) {
      api.getChatSummary((response) => {
        commit('setChats', response.data);
      }, (error) => {
        console.log('error', error);
      });
    },
    getChat({ commit, state }) {
      api.getChat(state.openChatEmail, (response) => {
        commit('setChats', {
          ...state.chats,
          [state.openChatEmail]: {
            ...state.chats[state.openChatEmail],
            msg: response.data
          }
        });
      }, (error) => {
        console.log('error', error);
      });
    }
  }
}