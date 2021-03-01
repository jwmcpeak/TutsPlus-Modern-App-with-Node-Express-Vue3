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
    }],
    articles: []
  },
  getters: {
    token(state) {
      return state.token;
    },
    feeds(state) {
      return state.feeds;
    },
    articles(state) {
      return state.articles;
    }
  },
  mutations: {
    setToken(state, value) {
      state.token = value;
      localStorage.setItem('auth-token', value);
    },
    setArticles(state, value) {
      state.articles = value;
    }
  },
  actions: {
    registerUser({commit}, data) {
      return postJson({
        url: '/register',
        data
      }).then(obj => {
        if (obj.token) {
            commit('setToken', obj.token);
        }

        return obj;
      });
    },
    login({commit}, data) {
      return postJson({
        url: '/login',
        data
      }).then(obj => {
        if (obj.token) {
          commit('setToken', obj.token);
        }

        return obj;
      });
    },
    getFeed({commit}, url) {
      commit('setArticles', [{
        title: 'Article 1',
        description: 'Content for article 1'
      },{
        title: 'Article 2',
        description: 'Content for article 2'
      },{
        title: 'Article 3',
        description: 'Content for article 3'
      }])
    }
  },
  modules: {
  }
})
