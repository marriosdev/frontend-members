<template>
  <h5>Editar usuário</h5>
  <div class="container">
    <div class="form">
      <div class="container">

        <Alerta
          v-if="erros.name != undefined"
          :mensagem="erros.name[0]"
          :tipo="'erro'"
        />
        <Alerta
          v-if="erros.email != undefined"
          :mensagem="erros.email[0]"
          :tipo="'erro'"
        />

        <Alerta
          v-if="sucesso"
          :tipo="'sucesso'"
          :mensagem="'Atualizado com sucesso!'"
        />

        <Input
          :id="'nome'"
          :type="'text'"
          v-model="nome"
          :value="nome"
          :label="'Nome do usuário'"
        />
        <Input
          :id="'email'"
          :type="'text'"
          v-model="email"
          :value="email"
          :label="'Email'"
        />
        <div class="box-button">
          <button @click="submit" class="waves-effect waves-light btn submit">
            <i class="material-icons right">send</i>Salvar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "../components/Input.vue";
import Alerta from "../components/Alerta.vue";

export default {
  name: "EditarUsuario",
  components: {
    Input,
    Alerta,
  },
  data() {
    return {
      nomeAntigo: "",
      emailAntigo: "",
      nome: "",
      email: "",
      erros: [],
      sucesso: false,
    };
  },
  methods: {
    async submit() {
      const id = new URLSearchParams(window.location.search).get("id");

      this.api
        .patch(`api/user/${id}`, {
          name: this.nome == this.nomeAntigo ? null : this.nome,
          email: this.email == this.emailAntigo ? null : this.email,
        })
        .then((response) => {
          this.sucesso = true;
          this.erros = [];
          this.nomeAntigo = this.nome;
          this.emailAntigo = this.email;
        })
        .catch((error) => {
          this.sucesso = false;
          this.erros = error.response.data.errors;
        });
    },

    async buscarUsuario() {
      const id = new URLSearchParams(window.location.search).get("id");

      this.api.get(`api/user/${id}`).then((usuario) => {
        this.nomeAntigo = usuario.data[0].name;
        this.emailAntigo = usuario.data[0].email;
        this.nome = usuario.data[0].name;
        this.email = usuario.data[0].email;
      });
    },
  },
  mounted() {
    this.buscarUsuario();
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
</style>
