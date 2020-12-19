import API from '../../API';
import { REQUEST_METHODS } from '../../config';

export default {
  state: {
    isAdmin: false,
    isLoggedIn: false,
    username: '',
  },
  getters: {

  },
  mutations: {
    updateUsername(state, value) {
      state.username = value.toString().trim();
    },
    updateIsAdmin(state, value) {
      state.isAdmin = value;
    },
    updateIsLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
  },
  actions: {
    login(_, credentials) {
      API(REQUEST_METHODS.POST, '/auth/login', credentials)
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
    },
  },
  namespaced: true,
};
