<template>
  <div id="infoMonthlyPaymentModal" class="modal modal-fixed-footer">
    <div class="modal-content">
      <div class="">
        <h5>Informações da Fatura</h5>
        <br>
        <div class="" >
            <div class="row">
              <div class="col s6">
                Nº: <strong>{{ monthlyPayment.id }}</strong>
              </div>
              <div class="col s6">
                Status: <strong> {{ paymentStatus.name }} </strong>
              </div>
            </div>
            <div class="row">
              <div class="col s6">
                Valor: R$<strong>{{ monthlyPayment.value }}</strong>
              </div>
              <div class="col s6">
                Data do pagamento: <strong>{{ monthlyPayment.payment_date }}</strong>
              </div>
            </div>
            <div class="row">
              <div class="col s6">
                Emissão: <strong>{{ monthlyPayment.created_at }}</strong>
              </div>
              <div class="col s6">
                Link: <strong>{{ monthlyPayment.payment_link }}</strong>
              </div>
            </div>
            <div class="row">
              <div class="col s6">
                Vencimento: <strong>{{ monthlyPayment.due_date }}</strong>
              </div>
              <div class="col s6">
                Código: <strong>{{ monthlyPayment.payment_code }}</strong>
              </div>
            </div>
          </div>
      </div>
    </div>
    <div class="modal-footer">
      <!-- <button style="margin-right: 10px" @click="submit" class="waves-effect waves-light btn submit">
        <i class="material-icons right">save</i>Salvar
      </button> -->
      <a style="color: white" class="modal-close red waves-effect waves-green btn-flat"
        >Fechar</a
      >
    </div>
  </div>
</template>

<script>
import Input from "@/components/Input.vue";
import api from "../api.js";
import { createToast } from "mosha-vue-toastify";

export default {
  name: "AddMonthlyPayment",

  components: {
    Input,
  },
  props: {
    uuid: "",
    show: false,
  },
  data() {
    return {
      monthlyPayment: Array,
      paymentMethod: Array,
      paymentStatus: Array,
      value: "",
      errors: {},
      success: {},
    };
  },
  mounted() {
    M.AutoInit();
  },

  methods: {
    async getInfos(uuid) {
      api 
        .get(`monthlypayment/${uuid}`)
        .then((response) => {
          if (response.status !== 200) {
            throw Error();
          }
          this.monthlyPayment = response.data
          this.paymentStatus = response.data.payment_status
          this.paymentMethod = response.data.payment_method
        })
        .catch((error) => {
          createToast(`Ocorreu um erro ao consultar a fatura!`, {
            type: "danger",
            showIcon: "true",
          });
      });
    },
  },
  watch: {
    uuid() {
      this.getInfos(this.uuid)
    }
  },
};
</script>

<style scoped>
.modal {
  width: 60% !important;
  top: 10% !important;
  height: 90vh !important;
  min-height: 80vh !important;
}

.form {
  padding-bottom: 20px;
}
.box-button {
  text-align: center;
  width: 100%;
}
.box-button button {
  background-color: var(--primary);
}
</style>
