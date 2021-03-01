import { createStore } from 'vuex'
import {postJson, getJson, deleteJson} from './../utils/http';

export default createStore({
  state: {
    token: localStorage.getItem('auth-token'),
    feeds: [],
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
    },
    setFeeds(state, feeds) {
      state.feeds = feeds;
    }
  },
  actions: {
    addFeed({commit}, data) {
      return postJson({
        url: '/feeds',
        data
      }).then(data => {
        if (data.feeds) {
          commit('setFeeds', data.feeds);
        }

        return data;
      });
    },
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
    removeFeed({commit}, feed) {
      return deleteJson({
        url: `/feeds/${feed._id}`
      }).then(data => {
        if (data.feeds) {
          commit('setFeeds', data.feeds);
        }

        return data;
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
    }, 
    getFeeds({commit}) {
      return getJson({
        url: '/feeds'
      }).then(data => {
        if (data.feeds) {
          commit('setFeeds', data.feeds);
        }

        return data;
      });
    } 
  },
  modules: {
  }
})
