<template>
  <AddMemberModal :show="showModal" />
  <div class="container">
    <h5>Detalhes</h5>
    <hr />
    <div class="">
      <div style="display: flex; align-items: start">
        <i style="color: rgb(75, 83, 85) !important; font-size: 8rem !important;" class="material-icons">
          person
        </i>
        <div style="display: flex; flex-direction: column;">
          <h5 >
            {{ member.name }}
          </h5>
        </div>
      </div>
      <ul class="tabs tabs-fixed-width flow-text  blue lighten-2">
        <li class="tab"><a class="active" href="#memberInfos" style="color: black !important">Informações pessoais</a></li>
        <li class="tab"><a href="#monthlyPaymentsTable" style="color: black !important">Faturas</a></li>
      </ul>
      <div id="memberInfos">
        asodkapsdo
      </div>
      <div id="monthlyPaymentsTable">
          <table>
            <thead>
              <tr>
                <th style="width: 50px">Status</th>
                <th>Valor</th>
                <th>Emissão</th>
                <th></th>
              </tr>
            </thead>
            <tbody
              v-for="monthlyPayment in member.monthly_payments"
              :key="monthlyPayment">
              <tr>
                <td
                  v-if="monthlyPayment.payment_status.id == 1"
                  class="td-status ">
                  <p class="status-payment lime accent-1">
                    {{ monthlyPayment.payment_status.name }}
                  </p>
                </td>
                <td
                  v-if="monthlyPayment.payment_status.id == 2"
                  class="td-status ">
                  <p class="status-payment red lighten-3">
                    {{ monthlyPayment.payment_status.name }}
                  </p>
                </td>

                <td
                  v-if="monthlyPayment.payment_status.id == 3"
                  class="td-status">
                  <p class="status-payment light-green accent-1">
                    {{ monthlyPayment.payment_status.name }}
                  </p>
                </td>

                <td>R$ {{ monthlyPayment.value }}</td>

                <td>{{ monthlyPayment.created_at }}</td>

                <td>
                  <span>
                    <i
                      style="color: rgb(0, 204, 255) !important"
                      class="material-icons tinny"
                      >infos
                    </i>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
      </div>
    </div>
  </div>
</template>
  
<script>
  import api from "../api";
  import AddMemberModal from "./AddMemberModal.vue";
  import ButtonModal from "./ButtonModal.vue";
  export default {
    components: {
      AddMemberModal,
      ButtonModal,
    },
    data() {
      return {
        member: Array,
      };
    },
    updated() {},
    created() {
      const memberId = this.$route.params.memberId;
      api.get(`/member/${memberId}`).then((response) => {
        this.member = response.data;
      });
    },
    methods: {
      async updateValueMonthlyPayment(element, monthlyPaymentId) {},
    },
    updated() {
      M.AutoInit();
    },
    mounted() {},
  };
</script>
  
<style scoped>
  .status-payment {
    padding: 5px;
    border-radius: 15px;
    font-size: 9pt;
  }

  .td-status {
    text-align: center;
  }
</style>