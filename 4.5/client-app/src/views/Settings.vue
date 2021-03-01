<template>
    <div class="col-6 offset-3 mt-3">
        <h4>Settings</h4>

        <div class="mb-5">
            <div class="mb-3">
              <label 
                for="feed-name" 
                class="form-label"
              >Feed Name</label>
              <input 
                type="text" 
                class="form-control" 
                id="feed-name" 
                v-model="feedName"
                required
               />
            </div>
            <div class="mb-3">
              <label 
                for="feed-url" 
                class="form-label"
              >Feed URL</label>
              <input 
                type="text" 
                class="form-control" 
                id="feed-url" 
                v-model="feedUrl"
                required
               />
            </div>
            <div class="mb-3">
              <button 
                class="btn btn-primary"
                @click.prevent="addFeed()">Add Feed</button>
            </div>
        </div>

        <table class="table table-hover">
            <thead>
                <th>Name</th>
                <th>URL</th>
                <th></th>
            </thead>
            <tbody>
                <tr 
                    class="align-middle"
                    v-for="feed in $store.getters.feeds"
                    :key="feed"
                >
                    <td>{{feed.name}}</td>
                    <td>{{feed.url}}</td>
                    <td class="text-end">
                        <button 
                            class="btn btn-danger btn-sm"
                            @click.prevent="removeFeed(feed)"
                        >Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import {ref} from 'vue';
import {useStore} from 'vuex';

export default {
    setup() {
        let store = useStore();
        let feedName = ref('');
        let feedUrl = ref('');

        function addFeed() {
            store.dispatch('addFeed', {
                name: feedName.value,
                url: feedUrl.value
            }).then(data => {
                if (data.err) {
                    alert(data.err);
                    return;
                }

                feedName.value = '';
                feedUrl.value = '';
            });
        }


        function removeFeed(feed) {
            store.dispatch('removeFeed', feed);
        }

        store.dispatch('getFeeds');

        return {
            removeFeed,
            addFeed,
            feedName,
            feedUrl
        };
    }
}
</script>