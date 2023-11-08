<script setup>
import Materialize from "materialize-css";
</script>
<template>
  <div id="main-app">
      <Sidebar />
      <div class="pages">
        <RouterView />
      </div>
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
  background: #ececec;
}
.indicator {
  background-color: #005ca7c0 !important;
}

.tabs .tab a:focus, .tabs .tab a:focus.active {
  background-color: rgba(246, 178, 182, 0) !important;
  outline: none;
}

* {
  font-weight: 600;
}
.pages{
  border-radius: 15px;
  background: white;
  width: 100%;
  margin-right: 10px;
  margin-top: 10px;
}
.modal {
  border-radius: 15px !important; 
}

*{
  scroll-behavior: smooth;
}

.mosha__toast {
  border-radius: 5px !important;
}

.success {
  background-color: #00b106 !important;
}

.danger {
  background-color: #ca0000 !important;
}

.warning {
  background-color: rgb(255, 208, 0) !important;
}
</style>

