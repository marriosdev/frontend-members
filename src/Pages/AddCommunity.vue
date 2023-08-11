<template>
  <div class="container">
    <div class="form">
      <div class="container">
        <h4>Cadastrar nova comunidade</h4>
        
        <hr />

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
              :id="'description'"
              :icon="'edit_road'"
              :type="'text'"
              v-model="description"
              :label="'Descrição'"
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
              :id="'address'"
              :icon="'home'"
              :type="'text'"
              v-model="address"
              :label="'Endereço'"
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
import api from "../api.js"

export default {
  name: "AddCommunity",

  components: {
    Input,
  },
  data() {
    return {
      name: "",
      description: "",
      phone: "",
      email: "",
      address: "",
      registration_number: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
      errors: [],
      success: false,
    };
  },
  methods: {
    async submit() {
     const memberData = {
        "name": this.name,
        "description":this.description,
        "phone": this.phone,
        "email": this.email,
        "address": this.address,
        "city": this.city,
        "state": this.state,
        "country": this.country,
        "zipcode": this.zipcode,
      }

      api.post('/members', memberData)
      console.log(memberData)
    }
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
