<template>
  <div class="container">
    <h1>HELLO WORLD</h1>

    <div class="container">
        <Button @click="generateMonthlyPayment" :text="'Gerar Fatura Mensal'" :icon="''" />
    </div>
  </div>
  
  <Alert message="sdasd"/>
</template>

<script>
import Alert from '../Components/Alert.vue';
import Button from '../Components/Button.vue';
import api from "../api.js";
import { createToast } from "mosha-vue-toastify";

export default {
  name: "Home",
  components: {
    Alert,
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