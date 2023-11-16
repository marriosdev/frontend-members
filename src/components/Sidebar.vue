<template>
  <div id="sidebar" v-if="showSidebar" class="sidenav-fixed">
    <div>
      <div id="header-sidebar">
        <div style="display: flex; flex-direction: column;">
          <span style="font-size: 13pt; display: flex; align-items: center;">
            <img  style="width: 40px;" src="../assets/img/profile-icon.png" alt="" srcset="">
            {{ username }}
          </span>
          <span style="font-size: 8pt;">
            {{ profile }}
          </span>
        </div>
      </div>
      <ul v-for="buttonSidebar in buttons" :key="buttonSidebar.text">
        <li>
          <ButtonSidebar
          :text="buttonSidebar.text"
          :icon="buttonSidebar.icon"
          :link="buttonSidebar.link"
          />
        </li>
      </ul>
      <span style="float: left; margin-bottom: 15px;">
        <CirculaIcon @click="logout" :icon="'exit_to_app'"/>
      </span>
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
    CirculaIcon,
  },
  data() {
    return {
      showSidebar: (!localStorage.getItem("token") ? false : true) ,
      username: "",
      profile: "",
      buttons: [
        {
          text: "Inicio",
          icon: "home",
          link: "/home",
        },

        {
          text: "Membros",
          icon: "group_add",
          link: "/membros",
        },
        {
          // icon: "av_timer",
          icon: "opacity",
          text: "Leituras",
          link: "/leituraMensal",
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
      localStorage.clear();
      this.$router.push("/login");
      this.showSidebar = false;
      window.location.reload();
    },
  },
  watch: {
    $route(to, from) {
      if (to.path == "/login") {
        this.showSidebar = false;
      } else {
        this.username = JSON.parse(localStorage.getItem("info")).name;
        this.profile = JSON.parse(localStorage.getItem("info")).profile;
        this.showSidebar = true;
      }
    },
  },
  updated() {
  },
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
  overflow: auto;
  padding: 10px;
  margin: 10px;
  border-radius: 15px;
  justify-content: space-between;
  position: sticky;
  min-width: 200px;
  height: 99vh !important;
  background-color: #ffffff;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
}

#header-sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
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