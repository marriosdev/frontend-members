<template>
  <div class="container">
    <div class="form">
      <div class="container">
        <h4>Cadastrar nova comunidade</h4>
        <hr />
        <div class="row">
          <Button
            @click="getCnpjData()"
            :icon = "'search'"
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
import Button from "@/components/Button.vue";
import { createToast } from "mosha-vue-toastify";

export default {
  name: "AddCommunity",

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
      console.log(this.cnpj.length)
      if(this.cnpj.length < 1) {
        createToast("Informe o CNPJ", {
          position: "top-right",
          showIcon: true,
          timeout: 2000,
          type: "warning",
        });
        return;
      }
      
      api.get("https://brasilapi.com.br/api/cnpj/v1/" + this.cnpj).then((response) => {
        this.zipcode = response.data.cep;
        this.name = response.data.razao_social; 
        this.phone = response.data.ddd_telefone_1;
        this.description = response.data.cnae_fiscal_descricao
        this.email = response.data.email;
        this.city = response.data.municipio
        this.state = response.data.uf
        this.address = response.data.logradouro + " " + response.data.numero + " " + response.data.complemento
        console.log(response.data)
      });
    },
    
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
        "cnpj": this.cnpj,
      }

      api.post('/community', memberData)
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
