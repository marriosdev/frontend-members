<template>
  <div class="container">
    <h1>HELLO WORLD</h1>

    <div class="container">
        <Button @click="generateMonthlyPayment" :text="'Gerar Fatura Mensal'" :icon="''" />
    </div>
  </div>
  
</template>

<script>
import Button from '../Components/Button.vue';
import api from "../api.js";
import { createToast } from "mosha-vue-toastify";

export default {
  name: "Home",
  components: {
    Button,
  },
  methods: {
    async generateMonthlyPayment() {
      api
        .post("/monthlypayment/generate")
        .then((response) => {
          if(response.status !== 200) {
            throw Error();
          }
          createToast(response.data.message, {
            type: "success",
            showIcon: "true",
          });
          
        })
        .catch((error) => {
          createToast("Ocorreu um erro ao gerar as faturas.", {
            type: "danger",
            showIcon: "true",
          });
        })
    },
  },
};
</script>

<style scoped>
.box-button {
  text-align: center;
}
</style>