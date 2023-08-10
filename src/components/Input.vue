<template>
  <div class="input-field">

    <i v-if="icon" class="material-icons prefix" style="font-size: 16pt;">{{icon}}</i>
    <input
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
    icon: "",
    inputClass: "",
    type: "",
    label: "",
    id: "",
    value: null,
  },

  data() {
    return {
      modelValue: null,
    };
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