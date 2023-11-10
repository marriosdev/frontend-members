<template>
  <div id="infoMonthlyPaymentModal" class="modal modal-fixed-footer">
    <div class="modal-content">
      <div class="">
        <h5>Informações da Fatura</h5>
        <br />
        <div class="">
          <div class="row">
            <div class="col s6">
              Nº: <strong>{{ monthlyPayment.id }}</strong>
            </div>
            <div class="col s6">
              <div
                v-if="
                  monthlyPayment.payment_status &&
                  monthlyPayment.payment_status.id == 4
                "
                class="status-payment light-green accent-1"
              >
                <span class="bolinha light-green accent-6"></span>
                {{ monthlyPayment.payment_status.name }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col s6">
              <!-- Valor: R$<strong>{{ monthlyPayment.value }}</strong> -->
              <Input
                :id="'valor'"
                :type="'text'"
                v-model="monthlyPayment.value"
                :value="monthlyPayment.value"
                :label="'R$ Valor'"
              />
            </div>
            <div class="col s6">
              <!-- Data do pagamento:
              <strong>{{ monthlyPayment.payment_date }}</strong> -->
              <Input
                :id="'valor'"
                :type="'date'"
                v-model="monthlyPayment.payment_date"
                :value="monthlyPayment.payment_date"
                :label="'Data do pagamento'"
              />
            </div>
          </div>
          <div class="row">
            <div class="col s6">
              <select name="" id="paymentStatus">
                <option value="">Status do pagamento</option>
                <!--  pegar selecionado e marcar o selected-->
                <option
                v-for="status in paymentStatuses"
                :key="status.id"
                :value="status.id"
                :selected="status.id == monthlyPayment.payment_status_id"
                >
                  {{ status.name }}
                </option>
              </select>
            </div>
            <div class="col s6">
              <select name="" id="paymentMethod">
                <option value="">Forma de pagamento</option>
                <option
                  v-for="method in paymentMethods"
                  :key="method.id"
                  :value="method.id"
                  :selected="method.id == monthlyPayment.payment_method_id"
                >
                  {{ method.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col s6">
              <!-- Emissão: <strong>{{ monthlyPayment.created_at }}</strong> -->
              <Input
                :id="'valor'"
                :type="'date'"
                v-model="monthlyPayment.created_at"
                :value="monthlyPayment.created_at"
                :label="'Emissão'"
              />
            </div>
            <div class="col s6">
              <!-- Link: <strong>{{ monthlyPayment.payment_link }}</strong> -->
              <Input
                :id="'valor'"
                :type="'text'"
                v-model="monthlyPayment.payment_link"
                :value="monthlyPayment.payment_link"
                :label="'Link de pagamento'"
              />
            </div>
          </div>
          <div class="row">
            <div class="col s6">
              <!-- Vencimento: <strong>{{ monthlyPayment.due_date }}</strong> -->
              <Input
                :id="'valor'"
                :type="'date'"
                v-model="monthlyPayment.due_date"
                :value="monthlyPayment.due_date"
                :label="'Vencimento' + monthlyPayment.due_date"
              />
            </div>
            <div class="col s6">
              <!-- Código: <strong>{{ monthlyPayment.payment_code }}</strong> -->
              <Input
                :id="'valor'"
                :type="'text'"
                v-model="monthlyPayment.payment_code"
                :value="monthlyPayment.payment_code"
                :label="'Código do pagamento'"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <!-- <button style="margin-right: 10px" @click="submit" class="waves-effect waves-light btn submit">
        <i class="material-icons right">save</i>Salvar
      </button> -->
      <a
        style="color: white"
        class="modal-close red waves-effect waves-green btn-flat"
        >Fechar</a
      >
      <button
        style="
          border: 1px solid green;
          margin-left: 10px;
          margin-right: 15px;
          color: green;
        "
        class="white waves-effect waves-green btn-flat"
      >
        Salvar
      </button>
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
      paymentMethods: Array,
      paymentStatuses: Array,
    };
  },
  updated() {
    M.AutoInit();
  },
  mounted() {
    api.get("getPaymentMethodAndPaymentStatus").then((response) => {
      this.paymentMethods = response.data.paymentMethods;
      this.paymentStatuses = response.data.paymentStatus;
    });
  },

  methods: {
    async getInfos(uuid) {

      api
        .get(`monthlypayment/${uuid}`)
        .then((response) => {
          if (response.status !== 200) {
            throw Error();
          }
          this.monthlyPayment = response.data;
          this.paymentStatus = response.data.payment_status;
          this.paymentMethod = response.data.payment_method;
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
      this.getInfos(this.uuid);
    },
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
