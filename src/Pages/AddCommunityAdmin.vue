<template>
  <div class="container">
    <div class="form">
      <div class="container">
        <h4>Cadastrar ADMIN</h4>
        <hr />
        <div class="row">
          <div class="col s6">
            <SelectInput
              :id="'community_id'"
              :communities="communities"
              v-model="community_id"
              :label="'Selecione a comunidade'"
            />
          </div>
        </div>

        <div class="row">
          <div class="col s6">
            <Input
              :id="'name'"
              :icon="'edit_road'"
              :type="'text'"
              v-model="name"
              :label="'Nome'"
            />
          </div>
          <div class="col s6">
            <Input
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
              :id="'email'"
              :icon="'email'"
              :type="'text'"
              v-model="email"
              :label="'E-mail'"
            />
          </div>
          <div class="col s6">
            <Input
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
              :id="'username'"
              :icon="'person'"
              :type="'text'"
              v-model="username"
              :label="'Usuário (utilizado para login)'"
            />
          </div>
          <div class="col s6">
            <Input
              :id="'password'"
              :icon="'lock'"
              :type="'text'"
              v-model="password"
              :label="'Senha'"
            />
          </div>
        </div>

        <div class="box-button">
          <button @click="submit" class="waves-effect waves-light btn submit">
            <i class="material-icons right">save</i>Salvar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "@/components/Input.vue";
import api from "../api.js";
import SelectInput from "../Components/SelectInput.vue";

export default {
  name: "AddCommunityAdmin",

  components: {
    Input,
    SelectInput,
  },
  data() {
    return {
      communities: Array,
      name: String,
      lastname: String,
      description: String,
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
      errors: [],
      success: false,
    };
  },
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
      api.post("/user", memberData);
      console.log(memberData);
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
