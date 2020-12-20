import API from '../../API';
import { REQUEST_METHODS } from '../../config';

export default {
  state: {
    isAdmin: false,
    isLoggedIn: false,
    username: '',
    authError: null,
  },
  getters: {

  },
  mutations: {
    updateUserName(state, value) {
      state.username = value.toString().trim();
    },
    updateIsAdmin(state, value) {
      state.isAdmin = value;
    },
    updateIsLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
    updateAuthError(state, value) {
      state.authError = value;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      await API(REQUEST_METHODS.POST, '/auth/login', credentials)
        .then(({ username, token, isAdmin }) => {
          commit('updateUserName', username, { module: 'user' });
          commit('updateIsLoggedIn', true, { module: 'user' });
          commit('updateIsAdmin', isAdmin, { module: 'user' });
          commit('updateAuthError', null, { module: 'user' });
          localStorage.token = token;
        })
        .catch((err) => {
          if (err.errorCode) {
            const message = err.errorCode === 422 ? 'Invalid username or password' : err.message;
            commit('updateAuthError', message, { module: 'user' });
          }
        });
    },
    logout({ commit }) {
      commit('updateUserName', '', { module: 'user' });
      commit('updateIsLoggedIn', false, { module: 'user' });
      commit('updateIsAdmin', false, { module: 'user' });
      commit('updateAuthError', null, { module: 'user' });
      localStorage.removeItem('token');
    },
    setAsLoggedIn({ commit }, { username, isAdmin }) {
      commit('updateUserName', username, { module: 'user' });
      commit('updateIsLoggedIn', true, { module: 'user' });
      commit('updateIsAdmin', isAdmin, { module: 'user' });
      commit('updateAuthError', null, { module: 'user' });
    },
  },
  namespaced: true,
};
