<template>
  <div class="container">
    <AddCommunityModal :show="showModal" />
    <h4>Comunidades</h4>
    <hr />
    <ButtonModal
      :modalId="'addCommunityModal'"
      :text="'Adicionar comunidade'"
      :icon="'add'"
    />

    <table>
      <Loader :show="loading" />
      <thead v-if="!loading">
        <tr>
          <th>Nome</th>
          <th>CNPJ</th>
          <th>E-mail</th>
          <th>Opções</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in communities" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.cnpj }}</td>
          <td>{{ item.email }}</td>
          <td>
            <a
              class="btn-floating dropdown-trigger btn btn-small blue waves-effect waves-light"
              style="margin-top: 10%"
              href="#"
              :data-target="`dropdown${item.id}`"
              ><i class="material-icons tinny">more_vert</i>
            </a>
            <ul :id="`dropdown${item.id}`" class="dropdown-content">
              <router-link
                :to="'/community/' + item.uuid"
                style="width: 10px !important; background-color: red"
              >
                <li>
                  <span
                    ><i
                      style="color: rgb(0, 98, 211) !important"
                      class="material-icons tinny"
                      >info</i
                    ></span
                  >
                </li>
              </router-link>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ButtonModal from "@/components/ButtonModal.vue";
import AddCommunityModal from "@/components/AddCommunityModal.vue";
import Loader from "../Components/Loader.vue";

export default {
  name: "Communities",
  components: {
    ButtonModal,
    AddCommunityModal,
  },
  data() {
    return {
      loading: false,
      communities: Array,
      loading: false,
      showModal: false,
    };
  },
};
</script>