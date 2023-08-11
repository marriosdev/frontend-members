<template>
  <div class="container">
    <div class="form">
      <div class="header">
        <h5>Login</h5>
      </div>
      <Input :id="'email'" :type="'text'" v-model="email" :label="'E-mail'" />
      <Input
        :id="'password'"
        :type="'password'"
        v-model="senha"
        :label="'Senha'"
      />
      <Button @click="login" :text="'Entrar'" :icon="'input'" />
    </div>
  </div>
</template>

<script>
import Input from "../Components/Input.vue";
import Button from "../Components/Button.vue";

export default {
  name: "Login",

  components: {
    Input,
    Button,
  },

  data() {
    return {
      mensagemErro: "",
      sucesso: false,
      email: "",
      senha: "",
    };
  },
  mounted() {
    M.AutoInit();
  },
  methods: {
    async login() {
      this.api
        .post("login", {
          email: this.email,
          password: this.senha,
        })
        .then((response) => {
          this.sucesso = true;
          this.erros = [];
          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("isLogged", true);
          window.location.href = "/";
        })
        .catch((error) => {
          this.sucesso = false;
          this.mensagemErro = error.response.data.message;
        });
    },
  },
};
</script>

<style scoped>
.form {
  text-align: center;
  padding: 10% 30% 0% 30%;
}

@media (max-width: 760px) {
  .form {
    padding: 20% 10% 0% 10%;
  }
}
</style>

