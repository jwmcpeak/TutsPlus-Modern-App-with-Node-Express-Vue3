<template>
  <div class="col-3">
    <div class="panel">
      <h4>Feeds</h4>
      <div class="list-group">
        <a 
          v-for="feed in $store.getters.feeds" 
          href="#" 
          class="list-group-item list-group-item-action"
          :key="feed"
          @click.prevent="feedOnClick(feed.url)"
        >
          {{feed.name}}
        </a>
      </div>
    </div>
  </div>
  <div class="col-3">
    <div class="panel">
      <h4>Articles</h4>
      <div class="list-group">
        <a 
          v-for="article in $store.getters.articles" 
          href="#" 
          class="list-group-item list-group-item-action"
          :key="article"
          @click.prevent="articleOnClick(article)"
        >
          {{article.title}}
        </a>
      </div>
    </div>
  </div>
  <div class="col-6">
    <div class="panel">
      <h4>{{articleTitle}}</h4>
      <div v-html="articleDescription"></div>
    </div>
  </div>
</template>
<script>
import {ref} from 'vue';
import {useStore} from 'vuex';

export default {
  setup() {
    let store = useStore();
    let articleTitle = ref('');
    let articleDescription = ref('');


    function feedOnClick(url) {
      store.dispatch('getFeed', url);
    }

    function articleOnClick(article) {
      articleTitle.value = article.title;
      articleDescription.value = article.description;
    }

    store.dispatch('getFeeds');

    return {
      feedOnClick,
      articleOnClick,
      articleTitle,
      articleDescription
    };
  }
}
</script>

<style scoped>
.panel {
  height: calc(100vh - 56px);
  overflow: auto;
}
</style>