<template>
  <div id="addCommunityModal" class="modal modal-fixed-footer">
    <div class="modal-content">
      <h5>Cadastrar Comunidade</h5>
      <div class="row">
        <Button
          @click="getCnpjData()"
          :icon="'search'"
          :text="'Consultar CNPJ'"
        ></Button>

        <div class="col s6">
          <Input
            :value="cnpj"
            :id="'cnpj'"
            :icon="'file'"
            :type="'text'"
            v-model="cnpj"
            :label="'CNPJ'"
          />
        </div>
        <div class="col s6">
          <Input
            :value="name"
            :id="'name'"
            :icon="'edit_road'"
            :type="'text'"
            v-model="name"
            :label="'Razão Social'"
          />
        </div>
        <div class="col s6">
          <Input
            :value="description"
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
            :value="email"
            :id="'email'"
            :icon="'email'"
            :type="'text'"
            v-model="email"
            :label="'E-mail'"
          />
        </div>
        <div class="col s6">
          <Input
            :value="phone"
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
            :id="'zipcode'"
            :icon="'map'"
            :type="'text'"
            v-model="zipcode"
            :value="zipcode"
            :label="'CEP'"
          />
        </div>

        <div class="col s6">
          <Input
            :id="'city'"
            :icon="'map'"
            :type="'text'"
            :value="city"
            v-model="city"
            :label="'Cidade'"
          />
        </div>

        <div class="col s6">
          <Input
            :id="'sate'"
            :icon="'map'"
            :type="'text'"
            :value="state"
            v-model="state"
            :label="'Estado'"
          />
        </div>

        <div class="col s6">
          <Input
            :id="'address'"
            :icon="'home'"
            :type="'text'"
            :value="address"
            v-model="address"
            :label="'Endereço'"
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
import Button from "@/components/Button.vue";
import { createToast } from "mosha-vue-toastify";

export default {
  components: {
    Input,
    Button,
  },
  data() {
    return {
      cnpj: "",
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
    async getCnpjData() {
      if (this.cnpj.length < 1) {
        createToast("Informe o CNPJ", {
          position: "top-right",
          showIcon: true,
          timeout: 2000,
          type: "warning",
        });
        return;
      }
      api
        .get("https://brasilapi.com.br/api/cnpj/v1/" + this.cnpj)
        .then((response) => {
          this.zipcode = response.data.cep;
          this.name = response.data.razao_social;
          this.phone = response.data.ddd_telefone_1;
          this.description = response.data.cnae_fiscal_descricao;
          this.email = response.data.email;
          this.city = response.data.municipio;
          this.state = response.data.uf;
          this.address =
            response.data.logradouro +
            " " +
            response.data.numero +
            " " +
            response.data.complemento;
          console.log(response.data);
        });
    },

    async submit() {
      const memberData = {
        name: this.name,
        description: this.description,
        phone: this.phone,
        email: this.email,
        address: this.address,
        city: this.city,
        state: this.state,
        country: this.country,
        zipcode: this.zipcode,
        cnpj: this.cnpj,
      };

      api
        .post("/community", memberData)
        .then((response) => {
          createToast("Comunidade cadastrada com sucesso!", {
            type: "success",
            showIcon: "true",
          });
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