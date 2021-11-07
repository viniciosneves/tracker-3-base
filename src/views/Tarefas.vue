<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <Box v-if="semTarefas">
      Você não está muito produtivo hoje
      <span class="has-text-weight-bold">:(</span>
    </Box>
    <Tarefa
      v-for="(tarefa, index) in tarefas"
      :tarefa="tarefa"
      :key="index"
      @aoClicado="abrirModal(tarefa)"
    />
    <div class="modal" :class="{ 'is-active': tarefaSelecionada != null }">
      <div class="modal-background"></div>
      <form
        class="modal-card"
        @submit.prevent="atualizarTarefa"
        v-if="tarefaSelecionada"
      >
        <header class="modal-card-head">
          <p class="modal-card-title">Editando a tarefa</p>
          <button
            type="button"
            class="delete"
            aria-label="close"
            @click="fecharModal"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Nome do projeto</label>
            <div class="control">
              <input
                class="input"
                v-model="tarefaSelecionada.descricao"
                type="text"
                placeholder="Digite aqui o nome do projeto"
                required
              />
            </div>
          </div>
        </section>
        <footer class="modal-card-foot is-justify-content-flex-end">
          <button @click="fecharModal" type="button" class="button is-danger">
            Cancelar
          </button>
          <button class="button is-success">Salvar</button>
        </footer>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import Box from "../components/Box.vue";
import ITarefa from "../interfaces/ITarefa";
import { useStore } from "@/store";
import { TipoAcoes } from "@/store/tipos-acoes";

export default defineComponent({
  name: "App",
  components: {
    Formulario,
    Tarefa,
    Box,
  },
  data() {
    return {
      modoEscuro: false,
      tarefaSelecionada: null as ITarefa | null,
    };
  },
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
      this.store.dispatch(TipoAcoes.ADICIONA_TAREFA, tarefa);
    },
    atualizarTarefa(): void {
      this.store.dispatch(TipoAcoes.ATUALIZA_TAREFA, this.tarefaSelecionada);
      this.fecharModal();
    },
    alterarModo(modoEscuro: boolean): void {
      this.modoEscuro = modoEscuro;
    },
    abrirModal(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal() {
      this.tarefaSelecionada = null;
    },
  },
  computed: {
    semTarefas(): boolean {
      return this.tarefas.length == 0;
    },
  },
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch(TipoAcoes.LISTAR_PROJETOS);
      store.dispatch(TipoAcoes.LISTAR_TAREFAS);
    })
    return {
      store,
      projetos: computed(() => store.state.projetos),
      tarefas: computed(() => store.state.tarefas),
    };
  },
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