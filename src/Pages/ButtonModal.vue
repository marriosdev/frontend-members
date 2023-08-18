<template>
  <a :class="classCss + 'waves-effect waves-light btn modal-trigger'" :href="'#' + modalId" >
    <i class="material-icons tinny">{{ icon }}</i
    >{{ text }}</a
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