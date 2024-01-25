<template>
  <button :class="` btn-default waves-effect waves-light btn ${addClass}`">
    <i class="material-icons left">{{ icon }}</i>
    {{ text }}
  </button>
</template>
<script>
export default {
  props: {
    text: String,
    icon: String,
    addClass: String
  },
  name: "Button",
};
</script>

<style>
.btn-default {
  margin: 5px !important;
  background-color: var(--main-color-button) !important;
  border: none !important;
  border-radius: 4px !important;
  padding: 0 16px !important;
  text-transform: uppercase !important;
  vertical-align: middle !important;
  -webkit-tap-highlight-color: transparent !important;
  letter-spacing: 1px;
  border-radius: 10px;
  font-size: 12px;
  text-transform: uppercase;
  transition: 0.5s;
  color: rgba(255, 255, 255, 0.907) !important;
  font-weight: bold;
  display: flex !important;
}

</style>