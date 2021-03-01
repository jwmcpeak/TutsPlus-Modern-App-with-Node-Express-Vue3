<template>
  <div class="col-3">
    <div class="panel">
      <h4>Feeds</h4>
      <div class="list-group">
        <a v-for="feed in $store.getters.feeds" href="#" class="list-group-item list-group-item-action">
          {{feed.name}}
        </a>
      </div>
    </div>
  </div>
  <div class="col-3">
    <div class="panel">
      <h4>Items</h4>
    </div>
  </div>
  <div class="col-6">
    <div class="panel">
      <h4>Content</h4>
    </div>
  </div>
</template>

<style scoped>
.panel {
  height: calc(100vh - 56px);
  overflow: auto;
}
</style>