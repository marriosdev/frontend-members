<template>
  <AddMemberModal :show="showModal" />
  <div class="container">
    <h4>Membros</h4>
    <hr />
    <ButtonModal
      :modalId="'addMemberModal'"
      :text="'Adicionar novo membro'"
      :classCss="'btn-floating btn-large waves-effect waves-light blue'"
      :icon="'add'"
    />
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>RG</th>
          <th>CPF</th>
          <th>Nº Inscrição</th>
          <th>Opções</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="member in members" :key="member.id">
          <td>{{ member.name + " " + member.lastname }}</td>
          <td>{{ member.rg }}</td>
          <td>{{ member.cpf }}</td>
          <td>{{ member.registration_number }}</td>
          <a
            class="btn-floating dropdown-trigger btn btn-small blue waves-effect waves-light"
            style="margin-top: 10%"
            href="#"
            :data-target="`dropdown${member.id}`"
            ><i class="material-icons tinny">more_vert</i>
          </a>
          <ul :id="`dropdown${member.id}`" class="dropdown-content">
            <router-link :to="'/member/' + member.uuid">
            <li>
                <span
                  ><i
                    style="color: rgb(0, 211, 112) !important"
                    class="material-icons tinny"
                    >payment</i
                  ></span
                >
              </li>
            </router-link>
            <li>
              <span style="color: #00b7cf !important"
                ><i class="material-icons">create</i></span
              >
            </li>
            <li>
              <span style="color: red !important"
                ><i class="material-icons">delete</i></span
              >
            </li>
          </ul>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "../api";
import AddMemberModal from "./AddMemberModal.vue";
import ButtonModal from "./ButtonModal.vue";
export default {
  components: {
    AddMemberModal,
    ButtonModal,
  },
  data() {
    return {
      showModal: false,
      members: Array,
    };
  },
  updated() {},
  methods: {
    openModalAddMember() {
      if (!this.showModal) {
        this.showModal = true;
      } else {
        this.showModal = false;
      }
    },

    async getMembers() {
      api
        .get("/members")
        .then((response) => {
          this.members = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  updated() {
    M.AutoInit();
  },
  mounted() {
    this.getMembers();
  },
};
</script>
