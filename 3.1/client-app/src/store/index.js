import { createStore } from 'vuex'
import {postJson} from './../utils/http';

export default createStore({
  state: {
    token: localStorage.getItem('auth-token'),
    feeds: [{
      name: 'First Feed',
      url: ''
    },{
      name: 'Second Feed',
      url: ''
    }]
  },
  getters: {
    token(state) {
      return state.token;
    },
    feeds(state) {
      return state.feeds;
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
    },
    getFeed(context, url) {
      
    }
  },
  modules: {
  }
})
