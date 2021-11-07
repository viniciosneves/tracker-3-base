<template>
  <button
    class="button"
    :class="contexto"
    @click="aoClicar"
    :disabled="desabilitado"
    :type="tipo"
  >
    <span class="icon" v-if="icone">
      <i :class="icone"></i>
    </span>
    <span>{{texto}}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TrackerBtn",
  props: {
    tipo: {
      type: String,
      default: 'submit',
    },
    texto: {
      type: String,
      required: true,
    },
    contexto: {
      type: String,
      required: false,
    },
    icone: {
      type: String,
      required: false,
    },
    desabilitado: {
      type: Boolean,
      required: false,
    },
  },
  emits: ["aoClicado"],
  methods: {
    aoClicar() {
      this.$emit("aoClicado");
    },
  },
});
</script>

<style scoped>
.box {
  background: #faf0ca;
}
</style>