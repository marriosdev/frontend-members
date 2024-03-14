<template>
  <div id="generateMonthlyPayment" class="modal modal-fixed-footer">
    <div class="modal-content">
      <div class="container">
        <h5>Adicionar nova fatura</h5>
        <div class="form">
            <div class="row">
              <div class="col s6">
                <Input
                  :text="'Criar nova fatura'"
                  :id="'valor'"
                  :errorMsg="errors.value"
                  :icon="'edit_road'"
                  :type="'text'"
                  v-model="value"
                  :label="'Valor'"
                />
              </div>
            </div>
          </div>
      </div>
    </div>
    <div class="modal-footer">
      <button style="margin-right: 10px" @click="submit" class="waves-effect waves-light btn submit">
        <i class="material-icons right">save</i>Salvar
      </button>
      <a href="#!" style="color: white" class="modal-close red waves-effect waves-green btn-flat"
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
    show: false,
  },
  data() {
    return {
      value: "",
      errors: {},
      success: {},
    };
  },
  mounted() {
    M.AutoInit();
  },

  methods: {
    async submit() {
      const data = { 
        value: this.value
      };
      api 
        .post(`/monthlypayment/${this.$route.params.memberId}`, data)
        .then((response) => {
          if (response.status !== 201) {
            throw Error();
          }
          createToast(`${response.data.message}`, {
            type: "success",
            showIcon: "true",
          });
          this.$emit("updateMonthlyPayments");
          this.$emit("getMonthlyPayments");
        })
        .catch((error) => {
          createToast(`Ocorreu um erro ao criar a fatura!`, {
            type: "danger",
            showIcon: "true",
          });
      });
    },
  },
};
</script>

<style scoped>
.modal {
  width: 50% !important;
  top: 20% !important;
  height: 40vh !important;
  min-height: 40vh !important;
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
