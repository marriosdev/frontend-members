<template>
  <div class="container">
    <MenuDetalhes
      :pagina="'user'"
      :paginaAtras="'usuarios'"
      :paginaEdicao="`editarUsuario?id=${id}`"
    />
    <div class="container datalhes">
      <ItemDetalhe 
        :titulo="'Nome'" 
        :dados="nome" 
        :icone="'person'" 
      />
      <ItemDetalhe 
        :titulo="'E-mail'" 
        :dados="email" 
        :icone="'email'" 
      />
      <ItemDetalhe
        :titulo="'Criação'"
        :dados="criado_em"
        :icone="'date_range'"
      />
      <ItemDetalhe
        :titulo="'Assinaturas'"
        :dados="quantidade_assinaturas"
        :icone="'assignment_ind'"
      />

      <div v-for="assinatura in assinaturas" :key="assinatura.id">
        <TabelaAssinatura
          :assinatura="assinatura"
          :titulo="assinatura.club"
          :onAbrirModal="abrirModal"
          :onAtualizar="atualizar"
        />
      </div>
    </div>
  </div>

  <div id="modal" class="modal">
    <div class="modal-content">
      <h5>{{ mensagemModal.titulo }}</h5>
      <p>{{ mensagemModal.mensagem }}</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat"
        >Fechar</a
      >
    </div>
  </div>
</template>

<script>
import TabelaAssinatura from "../components/TabelaAssinatura.vue";
import MenuDetalhes from "../components/MenuDetalhes.vue";
import ItemDetalhe from "../components/ItemDetalhe.vue";

export default {
  name: "DetalhesClube",

  components: {
    MenuDetalhes,
    ItemDetalhe,
    TabelaAssinatura,
  },

  data() {
    return {
      id: null,
      mensagemModal: "",
      nome: "",
      assinaturas: Array,
      criado_em: "",
      quantidade_assinaturas: 0,
      assinaturas: [],
      email: "",
    };
  },

  methods: {
    async buscarUsuario() {
      const id = new URLSearchParams(window.location.search).get("id");
      this.id = id;
      this.api.get(`api/user/${id}`).then((usuario) => {
        this.nome = usuario.data[0].name;
        this.email = usuario.data[0].email;
        this.criado_em = usuario.data[0].created_at.split("T")[0];
        this.assinaturas = usuario.data[1].signatures;
        this.quantidade_assinaturas = usuario.data[1].signatures.length;
      });
    },

    async abrirModal(mensagem) {
      this.mensagemModal = mensagem;
      let elem = document.getElementById("modal");
      let instance = M.Modal.getInstance(elem, { dismissible: true });
      instance.open();
    },

    async atualizar() {
      this.buscarUsuario();
      this.buscarUsuario();
    },
  },

  mounted() {
    this.buscarUsuario();
    M.AutoInit();
  },
};
</script>

<style scoped>
.datalhes {
  display: flex;
  flex-direction: column;
}
</style>
