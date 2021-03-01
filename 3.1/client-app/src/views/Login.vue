<template>
  <div class="col-4 offset-4 mt-3">
      <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" class="form-control" 
            id="email" placeholder="name@example.com" v-model="email">
      </div>
      <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" 
            v-model="password">
      </div>
      <div class="mb-3">
          <button class="btn btn-primary" @click.prevent="onSubmit">Login</button>
      </div>


      <div class="text-center">
          Need an account? <router-link to="/register">Register now!</router-link>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {ref} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
export default {
  name: 'Login',
  setup() {
    let email = ref('');
    let password = ref('');
    let store = useStore();
    let router = useRouter();

    function onSubmit() {
      store.dispatch('login', {
        email: email.value,
        password: password.value
      }).then(res => {
        if (res.err) {
          alert(res.err);
          return;
        }

        router.push('/feeds');

      });
    }

    return {
      email,
      password,
      onSubmit
    }

  }
}
</script>
