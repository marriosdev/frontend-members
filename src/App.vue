<script setup>
import Materialize from "materialize-css";
</script>
<template>
  <div id="main-app">
    <Sidebar />
    <RouterView />
  </div>
</template>

<script>

import Sidebar from "./Components/Sidebar.vue";

export default {
  name: "App",
  data() {
    return {
      isLogged: false,
    };
  },
  components: {
    Sidebar,
  },
  methods: {
    async mounted() {
      Materialize.AutoInit();
    },
  },
};
</script>

<style global>
#main-app {
  display: flex;
  flex-direction: row;
}
</style>

