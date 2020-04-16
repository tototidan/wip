<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      style="z-index: 1000000"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>
      <div >
        <router-link class="text--white" to="/status">
          <span class="ml-3 white--text">Status</span>
        </router-link>
        <router-link class="text--white" to="/map">
          <span class="ml-3 white--text">Map</span>
        </router-link>
        <router-link class="text--white" to="/dashboard">
          <span class="ml-3 white--text">Dashboard</span>
        </router-link>
      </div>

    </v-app-bar>
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
});
</script>
