import { createStore } from 'vuex'
import {postJson} from './../utils/http';

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
    registerUser(context, data) {
      return postJson({
        url: '/register',
        data
      });
    },
    login(context, data) {
      return postJson({
        url: '/login',
        data
      });
    }
  },
  modules: {
  }
})
