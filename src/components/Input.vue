<template>
  <span style="color: red">{{ (errorMsg != undefined) ? errorMsg[0] : ""  }}</span>
  <div class="input-field">
    <i v-if="icon" class="material-icons prefix" style="font-size: 16pt;">{{icon}}</i>
    <input
      :style="(errorMsg != '') ? 'border-bottom: 1px solid red !important;' : 'border-bottom: 1px solid black !important'"
      :id="id"
      :type="type"
      :class="inputClass"
      :value="modelValue ? modelValue : value"
      @change="updateValue"
    />
    <label :for="id" :class="value ? 'active' : ''"> {{ label }}</label>
  </div>
  
</template>

<script>
export default {
  name: "Input",

  props: {
    errorMsg: "",
    icon: "",
    inputClass: "",
    type: "",
    label: "",
    id: "",
    value: null,
  },

  data() {
    return {
    };
  },
  updated() {
  },
  methods: {
    async updateValue(event) {
      this.modelValue = event.target.value;
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style scoped>

</style>