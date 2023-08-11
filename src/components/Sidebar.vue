<template>
  <div id="sidebar" v-if="isLogged =='true'" class="sidenav-fixed">
    <div>
      <div id="header-sidebar">
        <div>
          <h3>LOGO</h3>
        </div>
        <div style="padding: 10px; display: flex; justify-content: start; width: 100%; margin-top: 10px; margin-bottom: 10px">
          <CirculaIcon @click="logout" :icon="'exit_to_app'" />
        </div>
      </div>
      <ul v-for="buttonSidebar in buttons" :key="buttonSidebar.text">
        <li>
          <ButtonSidebar :text="buttonSidebar.text" :icon="buttonSidebar.icon" :link="buttonSidebar.link" />
        </li>
      </ul>
    </div>
    <div id="footer-sidebar">
      <ul>
        <p>
          <!-- Desenvolvido por -->
          <!-- <a href="https://edmariooliveira.vercel.app/" target="_blank">Edmario Oliveira</a> -->
        </p>
      </ul>
    </div>
  </div>
</template>

<script>

import ButtonSidebar from "../Components/ButtonSidebar.vue";
import CirculaIcon from "./CirculaIcon.vue";

export default {
  name: "Sidebar",
  components: {
    ButtonSidebar,
    CirculaIcon
  },
  data() {
    return {
      isLogged: Boolean,
      buttons: [
        {
          text: "Inicio",
          icon: "home",
          link: "/",
        },
        {
          text: "Membros",
          icon: "group_add",
          link: "/adicionarMembro",
        },
        {
          text: "Comunidade",
          icon: "people",
          link: "/adicionarComunidade",
        },
        {
          text: "ADMIN",
          icon: "settings",
          link: "/adicionarAdminComunidade",
        },
      ],
    };
  },
  methods: {
    async logout() {
      localStorage.setItem("isLogged", false);
      localStorage.removeItem("token");
      this.$router.push("/login");
      this.isLogged = false;
    }
  },    
  mounted() {
    this.isLogged = localStorage.getItem("isLogged");
  },
};
</script>

<style scoped>

#sidebar {
  justify-content: space-between;
  position: sticky;
  min-width: 200px;
  min-height: 100vh !important;
  background-color: var(--primary);
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
}

#header-sidebar {
  display: flex;
  flex-direction: column;;
  align-items: center;
  justify-content: center;
  height: 100px;
  background-color: #00000000;
}

#footer-sidebar {
  padding: 30px;
  justify-self: end;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  height: 100px;
}
</style>