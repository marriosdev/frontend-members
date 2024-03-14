<template>
  <div id="infoMonthlyPaymentModal" :class="classModal">
    <div class="modal-content">
      <div class="">
        <h5>Informações da Fatura</h5>
        <br />
        <Loader :show="loading" />
        <div class="" v-if="!loading">
          <div class="row">
            <div class="col s6">
              Nº: <strong>{{ id }}</strong>
              <br>
              Leitura: <strong>{{ reading }}</strong>
              <br>
              Consumo: <strong>{{ consumption }}</strong>
            </div>
            <div v-if="payment_status_id && payment_status_id == 1">
              <div class="status-payment orange accent-1">
                <span class="bolinha orange accent-5"></span>
                {{ payment_status_name }}
              </div>
            </div>
            <div v-if="payment_status_id && payment_status_id == 2">
              <div class="status-payment blue-grey lighten-4">
                <span class="bolinha blue-grey lighten-10"></span>
                {{ payment_status_name }}
              </div>
            </div>

            <div v-if="payment_status_id && payment_status_id == 3">
              <div class="status-payment red accent-1">
                <span class="bolinha red accent-6"></span>
                {{ payment_status_name }}
              </div>
            </div>

            <div v-if="payment_status_id && payment_status_id == 4">
              <div>
                <div class="status-payment light-green accent-1">
                  <span class="bolinha light-green accent-6"></span>
                  {{ payment_status_name }}
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col s6">
              <Input
                :id="'valor'"
                :type="'text'"
                @input="moneyFormatter()"
                v-model="value"
                :value="value"
                :label="'R$ Valor'"
              />
            </div>
            <div class="col s6">
              <Input
                @click="setpaymendivate(this.value)"
                :id="'data_pagamento'"
                :type="'date'"
                v-model="payment_date"
                :value="payment_date"
                :label="'Data do pagamento'"
              />
            </div>
          </div>
          <div class="row">
            <div class="col s6">
              <select name="" id="paymentStatus" v-model="payment_status_id">
                <option selected value="">Status do pagamento</option>
                <option
                  v-for="status in paymentStatuses"
                  :key="status.id"
                  :value="status.id"
                  :selected="status.id == payment_status_id"
                >
                  {{ status.name }}
                </option>
              </select>
            </div>
            <div class="col s6">
              <select name="" id="paymentMethod" v-model="payment_method_id">
                <option selected value="">Forma de pagamento</option>
                <option
                  v-for="method in paymentMethods"
                  :key="method.id"
                  :value="method.id"
                  :selected="method.id == payment_method_id"
                >
                  {{ method.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col s6">
              <Input
                :id="'emissao'"
                :type="'date'"
                v-model="emission_date"
                :value="emission_date"
                :label="'Emissão (não pode ser alterado)'"
              />
            </div>
            <div class="col s6">
              <Input
                :id="'link_pagamento'"
                :type="'text'"
                :value="payment_link"
                :label="'Link de pagamento'"
              />
            </div>
          </div>
          <div class="row">
            <div class="col s6">
              <Input
                :id="'vencimento'"
                :type="'date'"
                v-model="due_date"
                :value="due_date"
                :label="'Vencimento'"
              />
            </div>
            <div class="col s6">
              <Input
                :id="'codigo_pagamento'"
                :type="'text'"
                :value="payment_code"
                :label="'Código do pagamento'"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <a
        style="color: white"
        class="modal-close red waves-effect waves-green btn-flat"
        >Fechar</a
      >
      <button
        @click="saveInfos"
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
import Loader from "@/Components/Loader.vue";
import M, { AutoInit } from "materialize-css";

export default {
  name: "AddMonthlyPayment",

  components: {
    Input,
    Loader,
  },
  props: {
    uuid: "",
    show: false,
  },
  data() {
    return {
      consumption: "",
      reading: "",
      payment_status_name: "",
      classModal: "modal modal-fixed-footer",
      loading: false,
      payment_status_id: "",
      payment_method_id: "",
      value: "",
      payment_date: "",
      payment_link: "",
      due_date: "",
      payment_code: "",
      emission_date: "",
      id: "",
      errors: {},
      success: {},
      paymentMethods: Array,
      paymentStatuses: Array,
    };
  },
  updated() {
    M.AutoInit();
  },
  created() {
    api
      .get("getPaymentMethodAndPaymentStatus")
      .then((response) => {
        this.paymentMethods = response.data.paymentMethods;
        this.paymentStatuses = response.data.paymentStatus;
      })
      .finally(() => {
        this.classModal = "no-autoinit " + this.classModal;
      });
  },

  methods: {
    async moneyFormatter()
    {
      this.value = this.value.replace(/\D/g, "").replace(/(\d)(\d{2})$/, "$1.$2");
    },
    async saveInfos() {
      this.loading = true;
      api
        .put(`monthlypayment/${this.uuid}`, {
          payment_status_id: document.getElementById("paymentStatus").value,
          payment_method_id: document.getElementById("paymentMethod").value,
          value: document.getElementById("valor").value,
          payment_date: document.getElementById("data_pagamento").value,
          payment_link: document.getElementById("link_pagamento").value,
          due_date: document.getElementById("vencimento").value,
          payment_code: document.getElementById("codigo_pagamento").value,
        })
        .then((response) => {
          if (response.status !== 200) {
            throw Error();
          }
          createToast(`Fatura atualizada com sucesso!`, {
            type: "success",
            showIcon: "true",
          });
          this.getInfos(this.uuid);
        })
        .catch((error) => {
          createToast(`Ocorreu um erro ao atualizar a fatura!`, {
            type: "danger",
            showIcon: "true",
          });
        })
        .finally(() => {
          this.loading = false;
          this.$emit("updateMonthlyPayments");
        });
    },

    async getInfos(uuid) {
      this.reading = "";
        this.consumption = "";

      this.loading = true;
      api
        .get(`monthlypayment/${uuid}`)
        .then((response) => {
          if (response.status !== 200) {
            throw Error();
          }
          this.payment_status_id = response.data.payment_status_id;
          this.payment_method_id = response.data.payment_method_id;
          this.value = response.data.value;
          this.payment_date = response.data.payment_date;
          this.payment_link = response.data.payment_link;
          this.due_date = response.data.due_date;
          this.payment_code = response.data.payment_code;
          this.emission_date = response.data.emission_date;
          this.id = response.data.id;
          this.payment_status_name = response.data.payment_status.name;
          this.reading = response.data.reading.original_hydrometer_value;
          this.consumption = response.data.reading.consumption;
          
          if(response.data.reading == null) {
            
          }
        })
        .catch((error) => {
          
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  watch: {
    uuid() {
      this.getInfos(this.uuid);
    },
    value() {
      this.moneyFormatter()    
    },
  },
};
</script>

<style scoped>
.modal {
  width: 60% !important;
  top: 5% !important;
  min-height: 90vh !important;
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
