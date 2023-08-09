<template>
  <div class="container">
    <div class="form">
        <div class="header">
            <h5>Cadastro</h5>
        </div>
        <Alerta :tipo="'erro'" :mensagem="mensagemErro.name[0]" v-if="mensagemErro.name != undefined" />  
        <Alerta :tipo="'erro'" :mensagem="mensagemErro.email[0]" v-if="mensagemErro.email != undefined" />  
        <Alerta :tipo="'erro'" :mensagem="mensagemErro.password[0]" v-if="mensagemErro.password != undefined" />
        <Alerta :tipo="'sucesso'" :mensagem="'Cadastrado com sucesso! Vá para a página de login'" v-if="sucesso" />
        <router-link :to="'login'" v-if="sucesso"><a class="waves-effect waves-light btn-small"><i class="material-icons right">keyboard_arrow_right</i>Login</a></router-link>
        <Input :id="'nome'" :type="'text'" v-model="nome" :label="'Nome'" />
        <Input :id="'email'" :type="'text'" v-model="email" :label="'E-mail'" />
        <Input :id="'password'" :type="'password'" v-model="senha" :label="'Senha'" />
        <a class="waves-effect waves-light btn-small" @click="salvar"><i class="material-icons right">send</i>Registrar</a>
        <div>
            <router-link :to="'login'">Fazer login</router-link>
        </div>
    </div>
  </div>
</template>

<script>
    import Input from '../components/Input.vue';
    import Alerta from '../components/Alerta.vue'
    export default {

        name: 'Login',
        
        components: {
            Input,
            Alerta   
        },

        data() {
            return {
                mensagemErro: "",
                sucesso: false,
                email: '',
                senha: '',
                nome: ''
            }
        },
        mounted() {
            M.AutoInit()
        },
        methods: {
            async salvar() {

                this.api.post('api/register', {
                    name: this.nome,
                    email: this.email,
                    password: this.senha
                })
                .then(response => {
                    this.sucesso = true
                    this.mensagemErro = []
                })
                .catch(error => {
                    this.sucesso = false
                    this.mensagemErro = error.response.data.errors
                })
            }
        }
    }
</script>

<style scoped>
    .form{
        text-align: center;
        padding: 10% 30% 0% 30%;
    }

    @media (max-width: 760px) {
       .form{
        padding: 20% 10% 0% 10%;
        }
    }
</style>

