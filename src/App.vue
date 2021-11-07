<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro' : modoEscuro}">
    <div class="column is-one-fifth">
      <BarraLateral @aoAlterarModo="alterarModo"/>
    </div>
    <div class="column conteudo">
      <router-view/>
    </div>
    <Notificacoes />
    <Loader :mostrar="carregando"/>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import BarraLateral from "./components/BarraLateral.vue";
import Loader from "./components/Loader.vue";
import Notificacoes from "./components/Notificacoes.vue";
import { useStore } from "./store";

export default defineComponent({
  name: "App",
  components: {
    BarraLateral,
    Notificacoes,
    Loader
  },
  setup() {
    const store = useStore()
    const modoEscuro = ref(false)

    const alterarModo = (modo: boolean) : void => {
      modoEscuro.value = modo
    }

    return {
      modoEscuro,
      alterarModo,
      carregando: computed(() => store.getters.loading)
    }
  }
});
</script>

<style>
main {
  --bg-primario: #fff;
  --texto-primario: #000;
}
main.modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}
.lista {
  padding: 1.25rem;
}
.conteudo {
  background-color: var(--bg-primario);
}
</style>