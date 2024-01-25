<template>
  <button :class="classCss + ' accent-2 btn-modal waves-effect waves-light btn modal-trigger'" :href="'#' + modalId" >
    <i class="material-icons tinny left">{{ icon }}</i
    >
   {{ text }}
  </button
  >
</template>
<script>
export default {
  name: "ButtonModal",
  props: {
    modalId: String,
    text: String,
    classCss: String,
    style: String,
    icon: String,
  },
};
</script>

<style>
.btn-modal {
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