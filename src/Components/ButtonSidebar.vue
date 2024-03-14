<template>
  <router-link :to="link">
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
    return {};
  },
};
</script>

<style scoped>
.button-sidebar {
  border-radius: 10px 0px 0px 10px !important;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: start;
  border-radius: 0;
  line-clamp: 100px;
  background-color: rgba(0, 0, 0, 0);
  box-shadow: none !important;
  color: rgb(255, 255, 255);
}

.button-sidebar:hover {
  background-color: #3d4b53 !important;
}
</style>