<template>
  <div class="modal" :class="{ 'is-active': mostrar }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <slot name="cabecalho"></slot>
      </header>
      <section class="modal-card-body">
        <slot name="corpo"></slot>
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <slot name="rodape"></slot>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TrackerModal",
  props: {
    mostrar: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style scoped>
.box {
  background: #faf0ca;
}
</style>