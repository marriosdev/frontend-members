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
    <!-- {{ pagination.links }} -->
    <ul
      class="pagination"
      :v-for="link in pagination.links"
      :key="link"
    >
      <li :class="link ? 'active' : ''"><a href=""></a>{{ link }}</li>
    </ul>
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
    Loader,
  },
  data() {
    return {
      pagination: {
        links: [
          {
            url: "",
            active: false,
            label: "",
          },
          {
            url: "",
            active: false,
            label: "",
          },
        ],
        page: 0,
        rowsPerPage: 0,
        rowsNumber: 0,
      },
      loading: false,
      communities: Array,
      loading: false,
      showModal: false,
    };
  },
  created() {
    this.getCommunities();
  },
  updated() {
    M.AutoInit();
  },
  methods: {
    async getCommunities() {
      this.loading = true;
      this.api
        .get("communities?paginate=yes")
        .then((response) => {
          this.communities = response.data.data;
          this.pagination.links = response.data.links;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          createToast(`Ocorreu um erro ao carregar as comunidades`, {
            type: "danger",
            showIcon: "true",
          });
        });
    },
  },
};
</script>