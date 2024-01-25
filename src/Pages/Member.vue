<template>
  <div class="container">
    <InfoMonthlyPaymentModal
      @updateMonthlyPayments="getMonthlyPayments()"
      :uuid="monthlyPaymentIdModal"
    />
    <AddMonthlyPayment
      @updateMonthlyPayments="getMonthlyPayments()"
      :show="showModal"
    />
    <h4>Detalhes</h4>
    <hr />
    <Loader :show="loading" />
    <div class="" v-if="!loading">
      <div style="display: flex; align-items: start">
        <i
          style="color: rgb(75, 83, 85) !important; font-size: 10rem !important"
          class="material-icons"
        >
          person
        </i>
        <div style="display: flex; flex-direction: column">
          <h5>
            {{ member.name }}
          </h5>
          <span>
            <p>
              Nº <strong>{{ member.registration_number }}</strong>
            </p>
            <p>
              CPF <strong>{{ member.cpf }}</strong>
            </p>
          </span>
        </div>
      </div>
      <ul class="tabs tabs-fixed-width flow-text">
        <li class="tab">
          <a class="active" href="#memberInfos" style="color: black !important"
            >Informações pessoais</a
          >
        </li>
        <li class="tab">
          <a href="#monthlyPaymentsTable" style="color: black !important"
            >Faturas</a
          >
        </li>
      </ul>
      <div id="memberInfos">INFOS</div>
      <div id="monthlyPaymentsTable">
        <div
          class="container"
          style="display: flex; justify-content: end; margin: 10px; width: 100%"
        >
          <ButtonModal
            :modalId="'generateMonthlyPayment'"
            :text="'Criar nova fatura'"
            :icon="'add'"
          />
        </div>
        <table>
          <thead>
            <tr>
              <th style="width: 50px">Status</th>
              <th>Valor</th>
              <th>Emissão</th>
              <th>Vencimento</th>
              <th></th>
            </tr>
          </thead>
          <tbody
            v-for="monthlyPayment in monthlyPayments"
            :key="monthlyPayment"
          >
            <tr>
              <td
                v-if="
                  monthlyPayment.payment_status &&
                  monthlyPayment.payment_status.id == 1
                "
              >
                <div class="status-payment orange accent-1">
                  <span class="bolinha orange accent-5"></span>
                  {{
                    monthlyPayment.payment_status &&
                    monthlyPayment.payment_status.name
                  }}
                </div>
              </td>
              <td
                v-if="
                  monthlyPayment.payment_status &&
                  monthlyPayment.payment_status.id == 2
                "
              >
                <div class="status-payment blue-grey lighten-4">
                  <span class="bolinha blue-grey lighten-10"></span>
                  {{ monthlyPayment.payment_status.name }}
                </div>
              </td>

              <td
                v-if="
                  monthlyPayment.payment_status &&
                  monthlyPayment.payment_status.id == 3
                "
              >
                <div class="status-payment red accent-1">
                  <span class="bolinha red accent-6"></span>
                  {{ monthlyPayment.payment_status.name }}
                </div>
              </td>

              <td
                v-if="
                  monthlyPayment.payment_status &&
                  monthlyPayment.payment_status.id == 4
                "
              >
                <div>
                  <div class="status-payment light-green accent-1">
                    <span class="bolinha light-green accent-6"></span>
                    {{ monthlyPayment.payment_status.name }}
                  </div>
                </div>
              </td>

              <!-- Formatar moeda para BRL -->
              <td>R$ {{ (monthlyPayment.value) }}</td>
              <td>{{ monthlyPayment.created_at }}</td>
              <td>{{ monthlyPayment.due_date }}</td>
              <td>
                <ButtonModal
                  @click="setMonthlyPaymentIdModal(`${monthlyPayment.uuid}`)"
                  :modalId="'infoMonthlyPaymentModal'"
                  :icon="'info'"
                  :classCss="'rounded'"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
  
<script>
import Button from "../Components/Button.vue";
import api from "../api";
import ButtonModal from "../Components/ButtonModal.vue";
import AddMonthlyPayment from "../Components/AddMonthlyPayment.vue";
import { createToast } from "mosha-vue-toastify";
import InfoMonthlyPaymentModal from "../Components/infoMonthlyPaymentModal.vue";
import Loader from "../Components/Loader.vue";

export default {
  data() {
    return {
      loading: false,
      monthlyPaymentIdModal: "",
      showModal: false,
      member: Array,
      monthlyPayments: Array,
    };
  },
  components: {
    Button,
    ButtonModal,
    AddMonthlyPayment,
    InfoMonthlyPaymentModal,
    Loader,
  },
  methods: {
    async setMonthlyPaymentIdModal(monthlyPaymentId) {
      this.monthlyPaymentIdModal = monthlyPaymentId;
    },
    async getMember() {
      this.loading = true;
      const memberId = this.$route.params.memberId;
      api
        .get(`/member/${memberId}`)
        .then((response) => {
          this.member = response.data;
          this.getMonthlyPayments();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async generateMonthlyPayment() {
      api
        .post(`/monthlypayment/${this.$route.params.memberId}`)
        .then((response) => {
          if (response.status !== 200) {
            throw Error();
          }
          createToast(response.data.message, {
            type: "success",
            showIcon: "true",
          });
          this.getMonthlyPayments();
        })
        .catch((error) => {
          createToast("Ocorreu um erro ao gerar a fatura.", {
            type: "danger",
            showIcon: "true",
          });
        })
        .finally(() => {});
    },
    async getMonthlyPayments() {
      const memberId = this.member.id;
      api.get(`/member/${memberId}/monthlypayment`).then((response) => {
        this.monthlyPayments = response.data;
      });
    },
    async updateValueMonthlyPayment(element, monthlyPaymentId) {},
  },
  created() {
    M.AutoInit();
    this.getMember();
  },
};
</script>
  
<style scoped>
.td-status {
  text-align: center;
}
</style>