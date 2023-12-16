<template>
  <div id="sidebar" v-if="showSidebar" class="sidenav-fixed">
    <div>
      <div id="header-sidebar">
        {{ profile }}
        <i class="material-icons">bug_report</i>
      </div>
      <hr>
      <p class="menu-title">
        Menu
      </p>
      <ul v-for="buttonSidebar in buttons" :key="buttonSidebar.name">
        <li>
          <ButtonSidebar
          :text="buttonSidebar.name"
          :icon="buttonSidebar.icon"
          :link="buttonSidebar.link"
          />
        </li>
      </ul>
    </div>
    <div id="footer-sidebar">
      <ul>
        <p>
        </p>
      </ul>
    </div>
  </div>
</template>

<script>
import ButtonSidebar from "../Components/ButtonSidebar.vue";
import api from '../api.js'
import { createToast } from "mosha-vue-toastify";

export default {
  name: "Sidebar",
  components: {
    ButtonSidebar,
  },
  data() {
    return {
      profile: "",
      showSidebar: (!localStorage.getItem("token") ? false : true) ,
      buttons: [],
    };
  },
  methods: {
    async getMenus()
    {
      api
        .get("/user/menu")
        .then((response) => {
          this.buttons = response.data
          console.log(response)
        })
        .catch((error) => {
          createToast(`Ocorreu um erro ao atualizar o menu`, {
            type: "danger",
            showIcon: "true",
          });
        });
    },
    async logout() {
      localStorage.clear();
      this.$router.push("/login");
      this.showSidebar = false;
      window.location.reload();
    },
  },
  watch: {
    $route(to, from) {
      if (to.path == "/login" || localStorage.getItem("token") == null) {
        this.showSidebar = false;
      }else{
        this.profile = JSON.parse(localStorage.getItem("info")).profile;
      }
    },
  },
  created() {
    this.getMenus()
  }
};
</script>

<style scoped>

#sidebar::-webkit-scrollbar {
  width:3px; 
}

#sidebar::-webkit-scrollbar-track {
  background: rgb(255, 255, 255);
}

#sidebar::-webkit-scrollbar-thumb {
  background-color: rgb(139, 139, 139);
  border-radius: 20px; 
}

#sidebar {
  color: rgb(255, 255, 255) !important;
  overflow: auto;
  justify-content: space-between;
  position: sticky;
  width: 300px;
  height: 100vh !important;
  background-color: var(--main-color) !important;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
}

#header-sidebar {
  margin-top: 30px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 40px;
}

#footer-sidebar {
  padding: 30px;
  justify-self: end;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  height: 100px;
}

.menu-title {
  text-indent: 10px;
  font-size: 12px;
  margin: 0 0 0 10px;
  color: rgba(255, 255, 255, 0.514);
  text-transform: uppercase;
}

hr {
  border: 0;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.171);
  margin: 10px 10px 10px 10px;
}
</style>