<template>
  <div id="addMemberModal" class="modal modal-fixed-footer">
    <div class="modal-content">
      <div class="">
        <h5>Adicionar novo membro</h5>
        <div class="form">
            <div class="row">
              <div class="col s6">
                <Input
                  :id="'name'"
                  :errorMsg="errors.name"
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
                  :errorMsg="errors.birthday"
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
                  :errorMsg="errors.registration_number"
                  :id="'registrationNumber'"
                  :icon="'looks_one '"
                  :type="'text'"
                  v-model="registrationNumber"
                  :label="'Nº de Inscrição'"
                />
              </div>
            </div>

            <div class="row">
              <div class="col s6">
                <Input
                  :errorMsg="errors.nis"
                  :id="'nis'"
                  :icon="'description'"
                  :type="'text'"
                  v-model="nis"
                  :label="'Nis'"
                />
              </div>
              <div class="col s6">
                <Input
                  :errorMsg="errors.cpf"
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
                  :errorMsg="errors.rg"
                  :id="'rg'"
                  :icon="'description'"
                  :type="'text'"
                  v-model="rg"
                  :label="'RG'"
                />
              </div>

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
            </div>

            <div class="row">
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

              <div class="col s6">
                <Input
                  :errorMsg="errors.address"
                  :id="'address'"
                  :icon="'home'"
                  :type="'text'"
                  v-model="address"
                  :label="'Endereço'"
                />
              </div>
            </div>
          </div>
      </div>
    </div>
    <div class="modal-footer">
      <button style="margin-right: 10px" @click="submit" class="waves-effect waves-light btn submit">
        <i class="material-icons right">save</i>Salvar
      </button>
      <a href="#!" style="color: white" class="modal-close red waves-effect waves-green btn-flat"
        >Fechar</a
      >
    </div>
  </div>
</template>

<script>
import Input from "@/components/Input.vue";
import api from "../api.js";
import { createToast } from "mosha-vue-toastify";

export default {
  name: "AddMemberModal",

  components: {
    Input,
  },
  props: {
    show: false,
  },
  data() {
    return {
      errors: {
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
      },
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
      success: {
        type: Boolean,
        default: false,
      },
    };
  },
  mounted() {
    M.AutoInit();
  },

  methods: {
    async submit() {
      const memberData = {
        name: this.name,
        lastname: this.lastname,
        birthday: this.birthday,
        rg: this.rg,
        phone: this.phone,
        email: this.email,
        address: this.address,
        nis: this.nis,
        cpf: this.cpf,
        registration_number: this.registrationNumber,
        city: this.city,
        state: this.state,
        country: this.country,
        zipcode: this.zipcode,
      };
      api
        .post("/members", memberData)
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

.form {
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
