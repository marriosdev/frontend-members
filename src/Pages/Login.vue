<template>
  <div class="main-login">
    <div class="container-form">
      <div class="form-login">
        <div style="text-align: center;" class="text-content-login">
            <h5>SGA</h5>
            <img style="width: 80px" src="../assets/img/logo.png" alt="">
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
      <div class="image-container">
        <img src="../assets/img/login_image.jpg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import Input from "../Components/Input.vue";
import Button from "../Components/Button.vue";
import { createToast } from "mosha-vue-toastify";

export default {
  name: "Login",
  components: {
    Input,
    Button,
  },

  data() {
    return {
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
          localStorage.setItem("token", response.data.jwt.access_token);
          localStorage.setItem("info", JSON.stringify(response.data.user));
          window.location.href = '/'
        })
        .catch((error) => {
          createToast(`${error.response.data.message}`, {
            type: "danger",
            showIcon: "true",
          });
        });
    },
  },
};
</script>

<style scoped>
.main-login {
  background-color: var(--primary);
  width: 100% !important;
  height: 100vh !important;
  justify-content: center;
  display: flex;
}

.container-form {
  border-radius: 15px;
  margin-top: 10%;
  height: 400px;
  background: white;
  width: 800px;
  justify-content: center;
  display: flex;
}

.form-login {
  padding-left: 35px;
  width: 50%;
}

.image-container {
  width: 50%;
}

.image-container img {
  width: 380px;
}

@media (max-width: 760px) {
}
.active label {
  color: var(--primary) !important;
}
</style>

