<template>
  <button :class="classCss + 'light-blue accent-2 btn-modal waves-effect waves-light btn modal-trigger'" :href="'#' + modalId" >
    <i class="material-icons tinny">{{ icon }}</i
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
  margin: 15px;
  display: flex !important;
  background-color: #007ccf !important;
  color: rgba(255, 255, 255, 0.907) !important;
  border-radius: 10px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: 0.5s;
}
</style>