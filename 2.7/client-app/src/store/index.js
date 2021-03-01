import { createStore } from 'vuex'
import {postJson} from './../utils/http';

export default createStore({
  state: {
    token: localStorage.getItem('auth-token')
  },
  getters: {
    token(state) {
      return state.token;
    }
  },
  mutations: {
    setToken(state, value) {
      state.token = value;
      localStorage.setItem('auth-token', value);
    }
  },
  actions: {
    registerUser(context, data) {
      return postJson({
        url: '/register',
        data
      }).then(obj => {
        if (obj.token) {
            context.commit('setToken', obj.token);
        }

        return obj;
      });
    },
    login(context, data) {
      return postJson({
        url: '/login',
        data
      }).then(obj => {
        if (obj.token) {
          context.commit('setToken', obj.token);
        }

        return obj;
      });
    }
  },
  modules: {
  }
})
