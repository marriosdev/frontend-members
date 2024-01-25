<template>
  <div id="addCommunityAdminModal" class="modal modal-fixed-footer">
    <div class="modal-content">
      <h4>Cadastrar ADMIN</h4>
      <div class="row">
        <SelectInput
          :errorMsg="errors.community_id"
          :id="'community_id'"
          :communities="communities"
          v-model="community_id"
          :label="'Selecione a comunidade'"
        />
      </div>

      <div class="row">
        <div class="col s6">
          <Input
            :errorMsg="errors.name"
            :id="'name'"
            :icon="'edit_road'"
            :type="'text'"
            v-model="name"
            :label="'Nome'"
          />
        </div>
        <div class="col s6">
          <Input
            :errorMsg="errors.lastname"
            :id="'lastname'"
            :icon="'edit_road'"
            :type="'text'"
            v-model="lastname"
            :label="'Sobrenome'"
          />
        </div>
      </div>

      <div class="row">
        <div class="col s6">
          <Input
            :errorMsg="errors.email"
            :id="'email'"
            :icon="'email'"
            :type="'text'"
            v-model="email"
            :label="'E-mail'"
          />
        </div>
        <div class="col s6">
          <Input
            :errorMsg="errors.phone"
            :id="'phone'"
            :icon="'phone'"
            :type="'text'"
            v-model="phone"
            :label="'Telefone'"
          />
        </div>
      </div>

      <div class="row">
        <div class="col s6">
          <Input
            :errorMsg="errors.username"
            :id="'username'"
            :icon="'person'"
            :type="'text'"
            v-model="username"
            :label="'Usuário (utilizado para login)'"
          />
        </div>
        <div class="col s6">
          <Input
            :errorMsg="errors.password"
            :id="'password'"
            :icon="'lock'"
            :type="'text'"
            v-model="password"
            :label="'Senha'"
          />
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button
        style="margin-right: 10px"
        @click="submit"
        class="waves-effect waves-light btn submit"
      >
        <i class="material-icons right">save</i>Salvar
      </button>
      <a
        href="#!"
        style="color: white"
        class="modal-close red waves-effect waves-green btn-flat"
        >Fechar</a
      >
    </div>
  </div>
</template>
  
  <script>
import Input from "@/components/Input.vue";
import api from "../api.js";
import SelectInput from "../Components/SelectInput.vue";
import { createToast } from "mosha-vue-toastify";

export default {
  name: "AddCommunityAdmin",

  components: {
    Input,
    SelectInput,
    createToast,
  },
  data() {
    return {
      errors: {
        communities: "",
        name: "",
        lastname: "",
        phone: "",
        email: "",
        address: "",
        community_id: "",
        username: "",
        password: "",
      },
      communities: Array,
      name: String,
      lastname: String,
      phone: String,
      email: String,
      address: String,
      community_id: String,
      city: String,
      state: String,
      country: String,
      zipcode: String,
      username: String,
      password: String,
      success: false,
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

    async submit() {
      const memberData = {
        community_id: this.community_id,
        name: this.name,
        lastname: this.lastname,
        phone: this.phone,
        email: this.email,
        address: this.address,
        city: this.city,
        state: this.state,
        country: this.country,
        zipcode: this.zipcode,
        username: this.username,
        password: this.password,
      };
      api
        .post("/user", memberData)
        .then((response) => {
          console.log(response.data.errors);
          createToast(`${this.name} cadastrado com sucesso!`, {
            type: "success",
            showIcon: "true",
          });
          this.errors = [];
        })
        .catch((error) => {
          let errors = error.response.data.errors;
          errors = Object.values(errors);
          errors.forEach(element => {
            createToast(element[0], {
              type: "danger",
              showIcon: "true",
              timeout: 3000.
            })
          });
        });
    },
  },
};
</script>
  
<style scoped>
  .modal {
    width: 60% !important;
    top: 5% !important;
    height: 90vh !important;
    min-height: 90vh !important;
    max-height: 90vh !important;
  }
</style>
  