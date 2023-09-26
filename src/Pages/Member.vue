<template>
  <AddMemberModal :show="showModal" />
  <div class="container">
    <h5>Detalhes</h5>
    <hr />
    <div class="">
        
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
        name: String,
        lastname: String,
        rg: String,
        cpf: String,
        registration_number: String,
        member: {},
        nis: String,
        birthday: String,
        email: String,
        phone: String,
    };
  },
  updated() {},
  created() {
    const memberId = this.$route.params.memberId;
    api.get(`/member/${memberId}`).then((response) => {
      this.member = response.data;
    });
  },
  methods: {},
  updated() {
    M.AutoInit();
  },
  mounted() {},
};
</script>
  