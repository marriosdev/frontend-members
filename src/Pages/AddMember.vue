<template>
  <div class="container">
    <div class="form">
      <div class="container">
        <h5>Adicionar usuário</h5>
        <Input
          :id="'nome'"
          :type="'text'"
          v-model="nome"
          :label="'Nome do usuário'"
        />
        <Input :id="'email'" :type="'text'" v-model="email" :label="'Email'" />
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

export default {
  name: "AddMember",

  components: {
    Input,
    Alerta,
  },
  data() {
    return {
      nome: "",
      email: "",
      erros: [],
      sucesso: false,
    };
  },
  methods: {
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
