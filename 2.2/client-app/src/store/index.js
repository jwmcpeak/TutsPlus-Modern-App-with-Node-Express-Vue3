import { createStore } from 'vuex'

export default createStore({
  state: {
  },
  getters: {
    isAuthenticated(state) {
      let token = localStorage.getItem('auth-token');

      return token !== null;
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
