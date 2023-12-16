<template>
  <ModalReadingsList :data="specificList" />
  <div class="container">
    <h4>Leituras Mensais</h4>
    <hr />
      <Button
        @click="generateMonthlyReadingList"
        :text="'Gerar Lista Mensal'"
        :icon="'playlist_add'"
      />
    <ul class="collapsible">
      <li
        v-for="item in monthlyReadingList"
        :key="item.group_code"
      >
        <div class="collapsible-header">
          <i class="material-icons"></i>
          {{ item.reference_date.substring(0, 7).replace("-", "/") }}
        </div>
        <div class="collapsible-body">
          <ButtonModal
            @click="getSpecificList(item.group_code)"            
            :modalId="'modalReadingsList'"
            :text="'Abrir lista'"
            :icon="'add'"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

import Button from "../Components/Button.vue";
import api from "../api.js";
import { createToast } from "mosha-vue-toastify";
import ModalReadingsList from "../Components/ModalReadingsList.vue";
import ButtonModal from '../Components/ButtonModal.vue';

export default {
  name: "MonthlyReading",
  components: {
    Button,
    ModalReadingsList,
    ButtonModal,
  },
  data() {
    return {
      monthlyReadingList: [],
      specificList: [],
    };
  },
  updated() {
    M.AutoInit();
  },
  methods: {

    async getSpecificList(code_group) {
      api
        .get(`/monthlyreading/${code_group}/list`)
        .then((response) => {
          this.specificList = response.data;
        })
        .catch((error) => {
          console.log(error);
          createToast(error.response.data.message, {
            type: "danger",
            showIcon: "true",
          });
        });
    },
    async getMonthlyReadingsByCommunity() {
      api
        .get("/monthlyreading/list")
        .then((response) => {
          this.monthlyReadingList = response.data;
          console.log(this.monthlyReadingList);
        })
        .catch((error) => {
          console.log(error);
          createToast(error.response.data.message, {
            type: "danger",
            showIcon: "true",
          });
        });
    },
    async generateMonthlyReadingList() {
      api
        .post("/monthlyreading/list/generate")
        .then((response) => {
          if (response.status == 201) {
            createToast(response.data.message, {
              type: "success",
              showIcon: "true",
            });
            return;
          }
          createToast(response.data.message, {
            type: "warning",
            showIcon: "true",
          });
        })
        .catch((error) => {
          console.log(error);
          createToast(error.response.data.message, {
            type: "danger",
            showIcon: "true",
          });
        });
    },
  },
  created() {
    this.getMonthlyReadingsByCommunity();
  },
};
</script>

<style scoped>
.box-button {
  text-align: center;
}

</style>