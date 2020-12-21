import API from '../../API';
import { REQUEST_METHODS } from '../../config';

export default {
  state: {
    products: [],
    totalProducts: 0,
  },
  mutations: {
    updateProducts(state, value) {
      state.products = value;
    },
    updateTotalProducts(state, value) {
      state.totalProducts = value;
    },
    updateProduct(state, value) {
      // eslint-disable-next-line
      const productIndex = state.products.findIndex((product) => product._id === value._id);
      state.products.splice(productIndex, 1, value);
      // state.products[productIndex] = value;
    },
    createProduct(state, value) {
      state.products.push(value);
    },
    deleteProduct(state, id) {
      // eslint-disable-next-line
      const productIndex = state.products.findIndex((product) => product._id === id);
      state.products.splice(productIndex, 1);
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      await API(REQUEST_METHODS.GET, '/products/')
        .then(({ products, totalProducts }) => {
          commit('updateProducts', products, { module: 'product' });
          commit('updateTotalProducts', totalProducts, { module: 'product' });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async updateProduct({ commit }, { id, item }) {
      // eslint-disable-next-line
      item.price = item.price.toString();
      await API(REQUEST_METHODS.PATCH, `/products/${id}`, item) // тут используется другие кавычки `` для `${}`
        .then(({ updatedProduct }) => {
          commit('updateProduct', updatedProduct, { module: 'product' });
        })
        .catch(console.log);
    },
    async createProduct({ commit }, item) {
      // eslint-disable-next-line
      item.price = item.price.toString();
      await API(REQUEST_METHODS.POST, '/products/create', item) // тут используем обычные кавычки потому что нету template string (${})
        .then(({ createdProduct }) => {
          commit('createProduct', createdProduct, { module: 'product' });
        })
        .catch(console.log);
    },
    async deleteProduct({ commit }, item) {
      // eslint-disable-next-line
      item.price = item.price.toString();
      // eslint-disable-next-line
      await API(REQUEST_METHODS.DELETE, `/products/${item._id}`, item) // тут используем обычные кавычки потому что нету template string (${})
        .then(({ deletedProductId }) => {
          commit('deleteProduct', deletedProductId, { module: 'product' });
        })
        .catch(console.log);
    },
  },
  namespaced: true,
};
