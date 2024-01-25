<template>
  <div class="container">
    <AddAdminCommunityModal :show="showModal"/>
    <h4>Comunidades / ADMS</h4>
    <hr>
    <ButtonModal
      :modalId="'addCommunityAdminModal'"
      :text="'Adicionar comunidade'"
      :icon="'add'"
    />
  </div>
</template>

<script>
import api from "../api.js";
import { createToast } from "mosha-vue-toastify";
import AddAdminCommunityModal from "../Components/AddAdminCommunityModal.vue";
import ButtonModal from "../Components/ButtonModal.vue";

export default {
  components: {
    createToast,
    ButtonModal, 
    AddAdminCommunityModal,
  },
  data() {
    return {
      showModal: false,
    };
  },
  updated() {},
  mounted() {
    this.getCommunities();
  },
  methods: {
    async getCommunities() {
      this.api.get("/communities").then((response) => {
        console.log(response.data);
        this.communities = response.data;
      });
    },
  },
};
</script>

<style scoped>
.form {
  padding-top: 20px;
  border: 1px solid rgb(196, 196, 196);
  margin-top: 10vh;
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
