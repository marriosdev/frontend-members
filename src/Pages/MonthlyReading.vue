<template>
  <div class="container">
    <h5>Leituras Mensais</h5>
    <hr />
    <div class="container">
      <Button
        @click="generateMonthlyReadingList"
        :text="'Gerar Lista Mensal'"
        :icon="'playlist_add'"
      />
    </div>
    <ul class="collapsible">
      <li v-for="item in monthlyReadingList" :key="item.group_code" @click="getSpecificList(item.group_code)">
        <div class="collapsible-header">
          <i class="material-icons"></i>
          {{item.reference_date.substring(0, 7).replace("-", "/")}}
        </div>
        <div class="collapsible-body">
          <span v-for="reading in specificList" :key="reading.id">
            {{ reading.memberId }}
            {{ reading.name }}
            {{ reading.lastName }}
            {{ reading.registration_number }}
            <br>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Button from "../Components/Button.vue";
import api from "../api.js";
import { createToast } from "mosha-vue-toastify";

export default {
  name: "MonthlyReading",
  components: {
    Button,
  },
  data() {
    return {
      monthlyReadingList: [],
      specificList: []
    };
  },
  updated() {
    M.AutoInit();
  },  
  methods: {
    async getSpecificList(code_group)
    {
      api
        .get(`/monthlyreading/${code_group}/list`)
        .then((response) => {
          this.specificList = response.data;     
          console.log("sdaljsdkljkj")
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
          console.log(this.monthlyReadingList)      
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