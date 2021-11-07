<template>
  <div class="wrapper" v-if="mostrar">
    <div class="pontos">
      <span class="ponto"></span>
      <span class="ponto"></span>
      <span class="ponto"></span>
      <span class="ponto"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Loader",
  props: {
    mostrar: {
      type: Boolean,
      required: true,
    },
  },
});
</script>
<style scoped>
.wrapper {
  position: fixed;
  z-index: 999;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: #FAF0CA;
  opacity: 0.6;
}
.pontos {
  width: 100vw;
  display: flex;
}
.pontos .ponto {
  opacity: 0;
  width: 20px;
  height: 20px;
  margin: 5px;
  border-radius: 50%;
  background-color: #0D3B66;
  position: absolute;
  animation: move 2.5s cubic-bezier(0.15, 0.56, 0.74, 0.35) infinite;
}

.pontos .ponto:nth-of-type(2) {
  animation-delay: 0.2s;
}

.pontos .ponto:nth-of-type(3) {
  animation-delay: 0.4s;
}

.pontos .ponto:nth-of-type(4) {
  animation-delay: 0.6s;
}

@keyframes move {
  0% {
    left: 1%;
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    left: 99%;
    opacity: 0;
  }
}
</style>