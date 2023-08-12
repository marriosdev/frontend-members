<template>
  <div class="input-field col s12">
    <select class="" :value="modelValue ? modelValue : value" @change="updateValue" :id="id">
      <option value="">Selecione</option>
      <option
        v-for="community in communities"
        :key="community.id"
        :value="community.id">
        {{ community.name }}
      </option>
    </select>
    <label>
      {{ label }}
    </label>
  </div>
</template>
  
  <script>
export default {
  name: "SelectInput",
  props: {
    communities: Array,
    id: Number,
    label: String,
    value: null,
  },

  data() {
    return {
      modelValue: null,
    };
  },
  updated() {
    M.AutoInit();
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