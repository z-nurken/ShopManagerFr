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
    },
    deleteProduct(state, id) {
      // eslint-disable-next-line
      const productIndex = state.products.findIndex((product) => product._id === id);
      state.products.splice(productIndex, 1);
    },
    createdProduct(state, value) {
      state.products.push(value);
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      await API(REQUEST_METHODS.GET, '/product/GetAll')
        .then((data) => {
          commit('updateProducts', data, { module: 'product' });
          commit('updateTotalProducts', data.length, { module: 'product' });
        })
        .catch((err) => {
          console.log(err);
          // add it to products error message
        });
    },
    async updateProduct({ commit }, { id, item }) {
      const payloadProduct = {
        ...item,
        price: item.price.toString(),
        // eslint-disable-next-line
        shops: item.shops.map((shop) => shop.id),
      };
      // eslint-disable-next-line
      item.price = item.price.toString();
      await API(REQUEST_METHODS.PATCH, `/products/${id}`, payloadProduct)
        .then(({ updatedProduct }) => {
          commit('updateProduct', updatedProduct, { module: 'product' });
        })
        .catch(console.log);
    },
    async createProduct({ commit }, item) {
      const payloadProduct = {
        ...item,
        // name: item.name,
        price: item.price.toString(),
        // image: item.image,
        // eslint-disable-next-line
        ProductShopsId: item.shops.map((shop) => shop.id),
      };
      // eslint-disable-next-line
      item.price = item.price.toString();
      await API(REQUEST_METHODS.POST, '/Product/Create', payloadProduct)
        .then((data) => {
          commit('createdProduct', data, { module: 'product' });
        })
        .catch(console.log);
    },
    async deleteProduct({ commit }, item) {
      // eslint-disable-next-line
      item.price = item.price.toString();
      // eslint-disable-next-line
      await API(REQUEST_METHODS.DELETE, `/products/${item._id}`, item)
        .then(({ deletedProductId }) => {
          commit('deleteProduct', deletedProductId, { module: 'product' });
        })
        .catch(console.log);
    },
    async updateQuantities(_, items) {
      console.log(items);
      // eslint-disable-next-line
      await API(REQUEST_METHODS.PATCH, `/products/quantities`, items)
        .then(console.log)
        .catch(console.error);
    },
  },
  namespaced: true,
};
