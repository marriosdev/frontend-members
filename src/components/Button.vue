<template>
  <a class="btn-default waves-effect waves-light btn"
    ><i class="material-icons right">{{ icon }}</i
    >{{ text }}</a
  >
</template>
<script>
export default {
  props: {
    text: String,
    icon: String,
  },
  name: "Button",
};
</script>

<style>
.btn-default {
  margin: 5px !important;
  background-color: #2196f3 !important;
  border: none !important;
  border-radius: 4px !important;
  display: inline-block !important;
  height: 36px !important;
  line-height: 36px !important;
  padding: 0 16px !important;
  text-transform: uppercase !important;
  vertical-align: middle !important;
  -webkit-tap-highlight-color: transparent !important;
}
</style>