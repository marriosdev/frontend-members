<template>
  <div id="sidebar" class="sidenav-fixed">
    <div>
      <div id="header-sidebar">
        <h3>LOGO</h3>
      </div>
      <ul v-for="btn in buttons" :key="btn.text">
        <li>
          <ButtonSidebar :text="btn.text" :icon="btn.icon" :link="btn.link" />
        </li>
      </ul>
    </div>
    <div id="footer-sidebar">
      <ul>
        <li>
          <ButtonSidebar text="Configurações" icon="settings"/>  
        </li>
        <li>
          <ButtonSidebar text="Sair" icon="exit_to_app"/>  
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ButtonSidebar from "./ButtonSidebar.vue";

export default {
  name: "Sidebar",
  components: {
    ButtonSidebar,
  },
  data() {
    return {
      buttons: [
        {
          text: "Inicio",
          icon: "home",
          link: "/",
        },
        {
          text: "Membros",
          icon: "people",
          link: "/members",
        },
      ],
    };
  },
  mounted() {},
};
</script>

<style scoped>

@import url("../assets/css/global.css");

#sidebar {
  justify-content: space-between;
  position: sticky;
  width: 200px;
  max-width: 200px;
  min-height: 100vh !important;
  background-color: #0056a7 !important;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
}

#header-sidebar {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  background-color: #00000000;
}

#footer-sidebar {
  justify-self: end;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  height: 100px;
}
</style>