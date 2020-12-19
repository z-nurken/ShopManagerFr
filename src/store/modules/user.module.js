import API from '../../API';
import { REQUEST_METHODS } from '../../config';

const toggleLogin = ({
  username, isLoggedIn, isAdmin, commit, token,
}) => {
  commit('updateUserName', username, { module: 'user' });
  commit('updateIsLoggedIn', isLoggedIn, { module: 'user' });
  commit('updateIsAdmin', isAdmin, { module: 'user' });
  if (!isLoggedIn) {
    localStorage.removeItem('token');
    return;
  }
  localStorage.token = token;
};

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
    login({ commit }, credentials) {
      API(REQUEST_METHODS.POST, '/auth/login', credentials)
        .then(({ username, token, isAdmin }) => toggleLogin({
          username, isAdmin, isLoggedIn: true, commit, token,
        }))
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
      localStorage.removeItem('token');
    },
    setAsLoggedIn({ commit }, { username, isAdmin }) {
      commit('updateUserName', username, { module: 'user' });
      commit('updateIsLoggedIn', true, { module: 'user' });
      commit('updateIsAdmin', isAdmin, { module: 'user' });
    },
  },
  namespaced: true,
};
