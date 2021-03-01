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
      if (value) {
        state.token = value;
        localStorage.setItem('auth-token', value);
      } else {
        state.token = null;
        localStorage.removeItem('auth-token');
      }
      
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
    getFeed({commit}, feed) {
      return getJson({
        url: `/feeds/${feed._id}`
      }).then(data => {
        if (data.err) {
          // TODO: do something
          return data;
        }

        commit('setArticles', data.items);

        return data;
      });
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
