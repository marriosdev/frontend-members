<template>
  <div id="infoMonthlyPaymentModal" :class="classModal">
    <div class="modal-content">
      <div class="container">
        <h4>Informações da Comunidade</h4>
        <hr />
        <Loader :show="loading" />
        <div class="row">
          <div class="col s12">
            <ul class="tabs">
              <li class="tab col s3" @click="buscarCredenciais()">
                <a href="#pagamentos">PAGAMENTOS</a>
              </li>
              <li class="tab col s3">
                <a class="" href="#test2">Test 2</a>
              </li>
            </ul>
          </div>
          <div id="pagamentos" class="col s12">
            <div class="row">
              <div class="col s12">
                <div class="row">
                    <Button @click="verCredentials()" :text="'Ver Credenciais'" :icon="'visibility'"/>
                  <div class="input-field col s6">
                    <input v-model="paymentCredentials.access_token" id="access_token" :type="credentials_visibility" />
                    <label for="access_token">ACCESS_TOKEN</label>
                  </div>
                  <div class="input-field col s6">
                    <input v-model="paymentCredentials.public_key" id="public_key" :type="credentials_visibility" />
                    <label for="public_key">PUBLIC_KEY</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s6">
                    <input v-model="paymentCredentials.client_secret" id="client_secret" :type="credentials_visibility" />
                    <label for="client_secret">CLIENT_SECRET</label>
                  </div>
                  <div class="input-field col s6">
                    <input v-model="paymentCredentials.client_id" id="client_id" :type="credentials_visibility" />
                    <label for="client_id">CLIENT_ID</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col s12 d-flex justify-content-center">
                    <Button @click="salvarCredenciaisPagamento()" :text="'Salvar Credenciais'" :icon="'save'"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="test2" class="col s12">Test 4</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import Button from '../Components/Button.vue';
import api from '../api';

export default {
  name: "CommunityConfig",

  components: {
    Button,
  },

  data() {
    return {
      loading: false,
      credentials_visibility: "password",
      paymentCredentials: {
        access_token: "000000000",
        public_key: "0000000",
        client_id: "000000",
        client_secret: "0000000"
      }
    }
  },
  methods: {
    async verCredentials()
    {
      this.credentials_visibility = this.credentials_visibility == "password" ? "text" : "password"
    },
    async salvarCredenciaisPagamento() {
      console.log(this.paymentCredentials)

      api.post('community/paymentcredentials', this.paymentCredentials)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    async buscarCredenciais()
    {
      api.get('community/paymentcredentials')
        .then(response => {
          this.paymentCredentials = response.data
        })
        .catch(error => {
        })
    }
  }
};
</script>