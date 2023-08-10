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
    background-color: #00000000;
    box-shadow: none !important;
}

.button-sidebar:hover {
    background-color: #003a61 !important;
    border-radius: 10px;
}
</style>