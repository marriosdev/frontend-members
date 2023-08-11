<template>
  <div class="input-field col s12">
    <select :value="modelValue ? modelValue : value" @change="updateValue" :id="id">
      <option
        v-for="community in communities"
        :key="community"
        :value="community.value"
      >
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
    communities: [],
    id: "",
    label: "",
    value: null,
  },

  data() {
    return {
      modelValue: null,
    };
  },
  mounted() {
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