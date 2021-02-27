import API from '../../API';
import { REQUEST_METHODS } from '../../config';

export default {
  state: {
    isAdmin: false,
    isLoggedIn: false,
    login: '',
    authError: null,
    users: [],
  },
  getters: {

  },
  mutations: {
    updateUsername(state, value) {
      state.login = value.toString().trim();
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
    updateUsers(state, value) {
      state.users = value;
    },
    addUser(state, value) {
      state.users.push(value);
    },
    updateUser(state, value) {
      const userIndex = state.users.findIndex((user) => user.login === value.login);
      state.users.splice(userIndex, 1, value);
    },
    deleteUser(state, value) {
      const userIndex = state.users.findIndex((user) => user.login === value.login);
      state.users.splice(userIndex, 1);
    },
  },
  actions: {
    async login({ commit }, credentials) {
      await API(REQUEST_METHODS.POST, '/Token/Create', credentials)
        .then(({ user, accessToken }) => {
          let userIsAdmin = false;
          if (user.userRole.id === 1) userIsAdmin = true;
          commit('updateUsername', user.login, { module: 'user' });
          commit('updateIsLoggedIn', true, { module: 'user' });
          commit('updateIsAdmin', userIsAdmin, { module: 'user' });
          commit('updateAuthError', null, { module: 'user' });
          localStorage.token = accessToken;
          // localStorage.setItem('Shop_Acc', accessToken);
        })
        .catch((err) => {
          if (err.status) {
            const message = err.status === 422 ? 'Invalid login or password' : err.error;
            commit('updateAuthError', message, { module: 'user' });
          }
        });
    },
    logout({ commit }) {
      commit('updateUsername', '', { module: 'user' });
      commit('updateIsLoggedIn', false, { module: 'user' });
      commit('updateIsAdmin', false, { module: 'user' });
      commit('updateAuthError', null, { module: 'user' });
      localStorage.removeItem('token');
    },
    setAsLoggedIn({ commit }, { login, isAdmin }) {
      commit('updateUsername', login, { module: 'user' });
      commit('updateIsLoggedIn', true, { module: 'user' });
      commit('updateIsAdmin', isAdmin, { module: 'user' });
      commit('updateAuthError', null, { module: 'user' });
    },
    async fetchUsers({ commit }) {
      await API(REQUEST_METHODS.GET, '/users/')
        .then(({ users }) => {
          commit('updateUsers', users, { module: 'user' });
        })
        .catch((err) => {
          console.log(err);
          // add it to products error message
        });
    },
    async createUser({ commit }, item) {
      commit('updateAuthError', null, { module: 'user' });
      await API(REQUEST_METHODS.POST, '/users/create', item)
        .then(({ createdUser }) => {
          commit('addUser', createdUser, { module: 'user' });
        })
        .catch((err) => {
          console.error(err);
          commit('updateAuthError', err.message, { module: 'user' });
        });
    },
    async updateUser({ commit }, item) {
      commit('updateAuthError', null, { module: 'user' });
      await API(REQUEST_METHODS.PATCH, `/users/${item.login}`, {
        login: item.newUsername,
        password: item.password,
      })
        .then(({ updatedUser }) => {
          commit('updateUser', updatedUser, { module: 'user' });
        })
        .catch((err) => {
          console.error(err);
          commit('updateAuthError', err.message, { module: 'user' });
        });
    },
    async deleteUser({ commit }, login) {
      commit('updateAuthError', null, { module: 'user' });
      await API(REQUEST_METHODS.DELETE, `/users/${login}`)
        .then(({ deletedUser }) => {
          commit('deleteUser', deletedUser, { module: 'user' });
        })
        .catch((err) => {
          console.error(err);
          commit('updateAuthError', err.message, { module: 'user' });
        });
    },
  },
  namespaced: true,
};
