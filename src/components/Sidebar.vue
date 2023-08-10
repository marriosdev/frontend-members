<template>
  <div id="sidebar" class="sidenav-fixed">
    <div>
      <div id="header-sidebar">
        <h3>LOGO</h3>
      </div>
      <ul v-for="buttonSidebar in buttons" :key="buttonSidebar.text">
        <li>
          <ButtonSidebar :text="buttonSidebar.text" :icon="buttonSidebar.icon" :link="buttonSidebar.link" />
        </li>
      </ul>
    </div>
    <div id="footer-sidebar">
      <ul>
        <li>
          <ButtonSidebar text="Configurações" icon="settings" link="/settings" />  
        </li>
        <li>
          <ButtonSidebar text="Sair" icon="exit_to_app" link="/logout"/>  
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import ButtonSidebar from "../Components/ButtonSidebar.vue";

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
        {
          text: "Comunidade",
          icon: "people",
          link: "/comunidade",
        },
      ],
    };
  },
  mounted() {
    
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