<template>
  <nav v-if="show">
    <a class="brand-logo center"> 
      <img
      style="width: 70px; height: 70px"
      src="../assets/img/logo.png"
      alt=""
      />
    </a>
    
    <div class="nav-wrapper z-depth-3">
      <a class="brand-logo left" style="margin-left: 10px;"> 
        <a class="inputBox_container">
          <svg
            class="search_icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            alt="search icon"
          >
            <path
              d="M46.599 46.599a4.498 4.498 0 0 1-6.363 0l-7.941-7.941C29.028 40.749 25.167 42 21 42 9.402 42 0 32.598 0 21S9.402 0 21 0s21 9.402 21 21c0 4.167-1.251 8.028-3.342 11.295l7.941 7.941a4.498 4.498 0 0 1 0 6.363zM21 6C12.717 6 6 12.714 6 21s6.717 15 15 15c8.286 0 15-6.714 15-15S29.286 6 21 6z"
            ></path>
          </svg>
          <input
            class="inputBox"
            id="inputBox"
            type="text"
            placeholder="Buscar membro"
          />
        </a>
      </a>
      <ul class="right" style="padding-right: 20px !important">
        <li
          class="dropdown-trigger"
          href="#"
          data-target="dropMenu"
          style="
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          "
        >
          <img
            style="width: 35px; height: 35px"
            src="../assets/img/profile-icon.png"
            alt=""
          />
          {{ username }}
        </li>
      </ul>

      <ul id="dropMenu" class="dropdown-content">
        <li class="disable"><a>Perfil</a></li>
        <li class="disable"><a>Configurações</a></li>
        <li @click="logout()"><a>Sair</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import ButtonSidebar from "./ButtonSidebar.vue";
import CircularIcon from "./CircularIcon.vue";

export default {
  name: "Header",
  components: {
    ButtonSidebar,
    CircularIcon,
  },
  data() {
    return {
      username: "",
      profile: "",
      show: !localStorage.getItem("token") ? false : true,
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
      if (to.path == "/login" || localStorage.getItem("token") == null) {
        this.show = false;
      } else {
        this.username = JSON.parse(localStorage.getItem("info")).name;
        this.profile = JSON.parse(localStorage.getItem("info")).profile;
        this.show = true;
      }
    },
  },
  updated() {
    M.AutoInit();
  },
};
</script>

<style scoped>
#dropMenu {
  top: -70px;
}

nav {
  background-color: var(--main-color) !important;
  color: #e4e4e4;
  height: 70px;
  z-index: 999999;
  box-sizing: border-box;
}
.inputBox_container {
  width: 220px;
  height: 45px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  flex-direction: row;
  background-color: #5c6370;
  border-radius: 0.8em;
  overflow: hidden;
}

.search_icon {
  height: 1em;
  padding: 0 0.5em 0 0.8em;
  fill: #abb2bf;
}

.inputBox {
  background-color: transparent;
  color: #ffffff;
  outline: none;
  border: 0;
  padding: 0.5em 1.5em 0.5em 0;
  font-size: 1em;
}

::placeholder {
  color: #abb2bf;
}
</style>