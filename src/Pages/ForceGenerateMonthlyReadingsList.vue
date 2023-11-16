<template>
    
    <div id="addMemberModal" class="modal modal-fixed-footer">
    <div class="modal-content">
      <div class="">
        <h5>Adicionar novo membro</h5>
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
  import api from "../api.js"
  
  export default {
    name: "ForceGenerateMonthlyReadingsList",
  
    components: {
    },
    data() {
      return {
      };
    },
    methods: {
     
    },
  };
  </script>
  
  <style scoped>
  </style>
  