<template>
  <router-link :to="link" >
    <a class="button-sidebar waves-effect waves-light btn">
      <i class="material-icons left">
        {{ icon }}
      </i>
      {{ text }}
    </a>
  </router-link>
</template>

<script>
export default {
  props: {
    text: String,
    icon: String,
    link: String,
    disabled: Boolean,
  },
  data() {
    return {
    }
  }
};
</script>

<style scoped>
.button-sidebar {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: start;
    justify-content: start;
    border-radius: 0;
    line-clamp: 100px;
    background-color: rgba(0, 0, 0, 0);
    box-shadow: none !important;
    color: rgb(34, 34, 34);
}

.button-sidebar:hover {
    background-color: #003a616b !important;
    border-radius: 10px;
}
</style>