export default {
  state: {
    hangfire: null,
  },
  getters: {
    HANGFIRE: (state) => state.hangfire,
  },
  mutations: {
    SET_HANGFIRE: (state, payload) => {
      state.hangfire = payload;
    },
  },
  actions: {
    // HANGFIRE: (commit, payload) => {
    //     return new Promise((resolve, reject) => {
    //         axios
    //             .get(`/hangfire` + '?access_token=' + localStorage.getItem('PHC_accT'), payload)
    //             .then(({
    //                 data,

    //                 status
    //             }) => {

    //                 if (status === 200) {

    //                     resolve(data);
    //                 }
    //             })
    //             .catch(error => {
    //                 reject(error);
    //             })

    //     });

    // },
  },
};
