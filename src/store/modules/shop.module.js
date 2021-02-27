import API from '../../API';
import { REQUEST_METHODS } from '../../config';

export default {
  state: {
    error: null,
    shops: [],
  },
  getters: { },
  mutations: {
    updateShops(state, value) {
      state.shops = value;
      // const shopIndex = state.shops.findIndex((shop) => shop.id === value.id);
      // state.shops.splice(shopIndex, 1);
      // state.shops.push(value);
    },
    updateError(state, value) {
      state.error = value;
    },
    addShop(state, value) {
      state.shops.push(value);
    },
    updateUser(state, value) {
      // eslint-disable-next-line
      const shopIndex = state.shops.findIndex((shop) => shop._id === value._id);
      state.shops.splice(shopIndex, 1, value);
    },
    deleteShop(state, id) {
      // eslint-disable-next-line
      const shopIndex = state.shops.findIndex((shop) => shop.id === id);
      state.shops.splice(shopIndex, 1);
    },
  },
  actions: {
    async fetchShops({ commit }) {
      await API(REQUEST_METHODS.GET, '/Shop/GetAll')
        .then((data) => {
          commit('updateShops', data, { module: 'shop' });
        })
        .catch((err) => {
          commit('updateError', err.message, { module: 'shop' });
        });
    },
    async createShop({ commit }, item) {
      commit('updateError', null, { module: 'shop' });
      await API(REQUEST_METHODS.POST, '/Shop/Create', item)
        .then((data) => {
          commit('addShop', data, { module: 'shop' });
        })
        .catch((err) => {
          console.error(err);
          commit('updateError', err.message, { module: 'shop' });
        });
    },
    async updateShop({ commit }, item) {
      commit('updateError', null, { module: 'shop' });
      // eslint-disable-next-line
      await API(REQUEST_METHODS.PUT, `/Shop/Update`, {
        id: item.id,
        name: item.name.toString(),
      })
        .then((data) => {
          console.log('data', data);
          commit('updateShops', data, { module: 'shop' });
        })
        .catch((err) => {
          console.error(err);
          commit('updateError', err.message, { module: 'shop' });
        });
    },
    async deleteShop({ commit }, id) {
      commit('updateError', null, { module: 'shop' });
      await API(REQUEST_METHODS.DELETE, `/Shop/DeleteById?id=${id}`)
        .then((data) => {
          commit('deleteShop', data, { module: 'shop' });
        })
        .catch((err) => {
          console.error(err);
          commit('updateError', err.message, { module: 'shop' });
        });
    },
  },
  namespaced: true,
};
