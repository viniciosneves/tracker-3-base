<template>
  <header>
    <h1>
      <img alt="Alura Tracker" src="../assets/logo.png" />
    </h1>
    <div class="has-text-centered">
      <button class="button" @click="alterarModo">
        Ativar modo {{ textoBtn }}
      </button>
    </div>
    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link class="link" to="/">
            <i class="fas fa-tasks"></i>
            tarefas
          </router-link>
        </li>
        <li>
          <router-link class="link" to="/projetos">
            <i class="fas fa-project-diagram"></i>
            projetos
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "BarraLateral",
  emits: ["aoAlterarModo"],
  computed: {
    textoBtn(): string {
      return this.modoEscuro ? "claro" : "escuro";
    },
  },
  setup (props, { emit }) {
    const modoEscuro = ref(false)
    const alterarModo = (): void => {
      modoEscuro.value = !modoEscuro.value;
      emit("aoAlterarModo", modoEscuro.value);
    }
    return {
      modoEscuro,
      alterarModo
    }
  }
});
</script>
<style scoped>
h1 {
  text-align: center;
}
strong {
  color: #f95738;
}
header {
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  padding: 2rem;
}
@media only screen and (max-width: 768px) {
  header {
    height: auto;
  }
}
.panel li {
  margin: 8px 0;
}
.link {
  color: #fff;
}
.link:hover {
  color: #FAF0CA;
}
.link.router-link-active {
  color: #FAF0CA;
}
</style>