<template>
  <div class="box">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para iniciar uma nova tarefa"
      >
        <input
          class="input"
          type="text"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="descricao"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="0" disabled>Selecione o projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @aoFinalizarTarefa="salvarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import IProjeto from "@/interfaces/IProjeto";
import { useStore } from "@/store";
import { computed, defineComponent, ref } from "vue";
import Temporizador from "./Temporizador.vue";

export default defineComponent({
  name: "Formulario",
  emits: ["aoSalvarTarefa"],
  components: {
    Temporizador,
  },
  setup(props, { emit }) {
    const idProjeto = ref(0)
    const descricao = ref('')
    const store = useStore();

    const salvarTarefa = (tempoEmSegundos: number): void => {
      const projeto = store.getters.obterProjetoPorId(idProjeto.value) as IProjeto;
      emit("aoSalvarTarefa", {
        duracaoEmSegundos: tempoEmSegundos,
        descricao: descricao.value,
        projeto,
      });
      descricao.value = "";
    }
    return {
      idProjeto,
      descricao,
      salvarTarefa,
      projetos: computed(() => store.state.projetos),
    };
  },
});
</script>
<style scoped>
.button {
  margin-left: 8px;
}
.box {
  background-color: var(--bg-primario);
  color: var(--texto-primario);
}
</style>