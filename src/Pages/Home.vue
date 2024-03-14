<template>
  <div class="container">
    <h1>HELLO WORLD</h1>
  </div>
  
</template>

<script>
import Button from '@/Components/Button.vue';
import api from "../api.js";
import { createToast } from "mosha-vue-toastify";

export default {
  name: "Home",
  components: {
    Button,
  },
  methods: {
    
  },
};
</script>

<style scoped>
.box-button {
  text-align: center;
}
</style>