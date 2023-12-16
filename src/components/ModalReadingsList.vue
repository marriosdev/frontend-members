<template>
  <div id="modalReadingsList" :class="classModal">
    <div class="modal-content">
      <div>
        <Loader :show="loading"/>
      </div>
      <div id="reading-list" v-if="!loading">
        <div
          v-for="reading in data"
          :key="reading.id"
          class="box-infos-monthlyreadings"
        >
          <div class="1st-box box-info">
            <span>
              <strong> Nº Inscrição </strong>
              {{ reading.registration_number }}
            </span>
            <span>
              <strong> Nome </strong>
              {{ reading.name }}
              {{ reading.lastName }}
            </span>
          </div>
          <div class="2st-box box-info">
            <span>
              <strong> Leitura </strong>
              <input type="text" @change="updateReadings(reading.original_hydrometer_value, reading.id, reading.memberId)" v-model="reading.original_hydrometer_value" />
            </span>
            <span>
              <strong> Nº Sistema </strong>
              {{ reading.memberId }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer" style="display: flex; justify-content: end">
      <Button :icon="'check'" :text="'Salvar Leitura'" @click="sendUpdates()" :addClass="'green'"/>
      <Button :icon="'cloud_download'" :text="'Baixar'" />
      <Button v-if="readingsUpdate.length == 0" :icon="'close'" :text="'Fechar'"  :addClass="'modal-close red'" />
      <Button v-if="readingsUpdate.length > 0" :icon="'refresh'" @click="revertChanges()" :text="'Limpar Alterações'"  :addClass="'orange'" />
    </div>
  </div>
</template>

<script>
import Input from "@/components/Input.vue";
import { jsPDF } from "jspdf";
import Button from "./Button.vue";
import api from "../api.js";
import { createToast } from "mosha-vue-toastify";
import Loader from './Loader.vue';

export default {
  name: "ModalReadingsList",

  components: {
    Loader,
    Input,
    Button,
  },
  props: {
    data: Object,
    show: false,
  },
  data() {
    return {
      loading: false,
      readingsUpdate: [],
      value: String,
      classModal: "modal modal-fixed-footer ",
    };
  },
  mounted() {
    M.AutoInit();
    this.classModal = "no-autoinit " + this.classModal;
  },
  methods: {
    async revertChanges() {
      this.readingsUpdate = []
      createToast(`Alterações revertidas!`, {
        type: "success",
        showIcon: "true",
      });
    },

    async sendUpdates() {
      if(this.readingsUpdate.length == 0){
        createToast(`Nenhuma leitura foi alterada!`, {
          type: "warning",
          showIcon: "true",
        });
        return;
      }

      this.loading = true;
      api
        .post("/monthlyreading/update/all", this.readingsUpdate)
        .then((response) => {
          createToast(`Lista atualizada com sucesso!`, {
            type: "success",
            showIcon: "true",
          });
          this.readingsUpdate = [];
          
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        })
        .finally(() => {
            this.loading = false;
        });
    },

    async updateReadings(original_hydrometer_value, id, memberId){
      if(original_hydrometer_value == null || original_hydrometer_value == ""){
        return;
      }
      this.readingsUpdate.push({
        original_hydrometer_value: original_hydrometer_value,
        id: id,
        memberId: memberId
      })
    },

    async downloadList() {
      const pdf = new jsPDF();
      const conteudo = document.getElementById("reading-list");
      pdf.internal.pageSize.width = 595.28;
      pdf.internal.pageSize.height = 841.89;

      pdf.setFontSize(40);
      pdf.html(conteudo, {
        callback: function (pdf) {
          pdf.save("documento.pdf");
        },
      });
    },
  },
};
</script>

<style scoped>
.box-infos-monthlyreadings {
  margin-bottom: 10px !important;
  border: 1px solid #ccc;
}

.box-info {
  display: flex;
  justify-content: space-between;
  padding: 5px;
}
strong {
  font-weight: 1000 !important;
}
* {
  font-family: "Roboto", sans-serif;
}
input {
  border: 1px solid black !important;
  height: 35px !important;
  width: 100px !important;
}
.modal {
  width: 100% !important;
  top: 0% !important;
  min-height: 100% !important;
  border-radius: 0px !important;
}
</style>
