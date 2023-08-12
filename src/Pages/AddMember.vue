<template>
  <div class="container">
    <div class="form">
      <div class="container">
        <h4>Adicionar novo membro</h4>
        
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
              :id="'birthday'"
              :inputClass="''"
              :icon="'date_range'"
              :type="'date'"
              v-model="birthday"
              :label="'Data de Nascimento'"
            />
          </div>
          <div class="col s6">
            <Input
              :id="'registrationNumber'"
              :icon="'looks_one'"
              :type="'text'"
              v-model="registrationNumber"
              :label="'Nº de Inscrição'"
            />
          </div>
        </div>

        <div class="row">
          <div class="col s6">
            <Input
              :id="'nis'"
              :icon="'description'"
              :type="'text'"
              v-model="nis"
              :label="'Nis'"
            />
          </div>
          <div class="col s6">
            <Input
              :id="'cpf'"
              :icon="'description'"
              :type="'text'"
              v-model="cpf"
              :label="'CPF'"
            />
          </div>
        </div>

        <div class="row">
          <div class="col s6">
            <Input
              :id="'rg'"
              :icon="'description'"
              :type="'text'"
              v-model="rg"
              :label="'RG'"
            />
          </div>

          <div class="col s6">
            <Input
              :id="'email'"
              :icon="'email'"
              :type="'text'"
              v-model="email"
              :label="'E-mail'"
            />
          </div>
        </div>

        <div class="row">
          <div class="col s6">
            <Input
              :id="'phone'"
              :icon="'phone'"
              :type="'text'"
              v-model="phone"
              :label="'Telefone'"
            />
          </div>

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
  name: "AddMember",

  components: {
    Input,
  },
  data() {
    return {
      name: String,
      lastname: String,
      birthday: Date,
      rg: String,
      phone: String,
      email: String,
      address: String,
      nis: String,
      cpf: String,
      registration_number: Number,
      city: String,
      state: String,
      country: String,
      zipcode: String,
      community_id: String,
      errors: Array,
      success: {
        type: Boolean,
        default: false
      },
    };
  },
  methods: {
    async submit() {
     const memberData = {
        "name": this.name,
        "lastname":this.lastname,
        "birthday":this.birthday,
        "rg": this.rg,
        "phone": this.phone,
        "email": this.email,
        "address": this.address,
        "nis": this.nis,
        "cpf": this.cpf,
        "registration_number": this.registrationNumber,
        "city": this.city,
        "state": this.state,
        "country": this.country,
        "zipcode": this.zipcode,
        "community_id": "1"
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
