<script setup>
import Materialize from "materialize-css";
</script>

<template>
  <!-- <Topbar /> -->
  <div id="main-app">
    <Sidebar />
      <RouterView />
  </div>
</template>

<script>
import Sidebar from "./Components/Sidebar.vue";
// import Topbar from "./Components/Topbar.vue";

export default {
  name: "App",
  components: {
    Sidebar,
    // Topbar,
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

