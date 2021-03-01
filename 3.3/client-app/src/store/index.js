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
    addFeed(state, feedName, feedUrl) {
      state.feeds.push({
        name: feedName,
        url: feedUrl
      })
    },
    removeFeed(state, feed) {
      state.feeds.splice(state.feeds.indexOf(feed), 1);
    },
    setToken(state, value) {
      state.token = value;
      localStorage.setItem('auth-token', value);
    },
    setArticles(state, value) {
      state.articles = value;
    }
  },
  actions: {
    addFeed({commit}, feedName, feedUrl) {
      commit('addFeed', feedName, feedUrl);
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
      commit('removeFeed', feed);
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
