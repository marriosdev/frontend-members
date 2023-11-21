<script setup>
import Materialize from "materialize-css";
</script>
<template>
  <Header />
  <div id="main-app">
    <Sidebar />
    <div class="pages">
      <RouterView />
    </div>
  </div>
</template>

<script>
import Sidebar from "./Components/Sidebar.vue";
import Header from "./Components/Header.vue";

export default {
  name: "App",
  data() {
    return {
      isLogged: false,
    };
  },
  components: {
    Sidebar,
    Header,
  },
  methods: {
    async mounted() {
      Materialize.AutoInit();
    },
  },
};
</script>

<style global>
/* Root */
:root {
  --main-color: #081125;
  --main-color-button: #3c6fd3;
}

#box-app {
  width: 100%;
}

#main-app {
  display: flex;
  flex-direction: row;
}
.indicator {
  background-color: #005ca7c0 !important;
}

.tabs .tab a:focus,
.tabs .tab a:focus.active {
  background-color: rgba(246, 178, 182, 0) !important;
  outline: none;
}

* {
}

.pages {
  background: rgb(255, 255, 255);
  width: 100%;
  height: 90%;
}

.modal {
  border-radius: 15px !important;
}

* {
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

*::-webkit-scrollbar {
  width: 5px;
}

*::-webkit-scrollbar-track {
  background: rgb(255, 255, 255);
}

*::-webkit-scrollbar-thumb {
  background-color: rgb(100, 100, 100);
  border-radius: 20px;
}

.bolinha {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
}

.status-payment {
  align-items: center;
  padding: 5px;
  display: flex;
  justify-content: space-evenly;
  border-radius: 15px;
  font-size: 9pt;
  width: 100px;
}

option {
  font-size: 9pt !important;
  color: black !important;
}

.dropdown-content li {
  color: black !important;
}

</style>

