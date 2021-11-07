<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <Box v-if="semTarefas && !filtro">
      Você não está muito produtivo hoje
      <span class="has-text-weight-bold">:(</span>
    </Box>
    <div class="field">
      <input
        class="input"
        type="text"
        placeholder="Filtrar tarefas"
        v-model="filtro"
      />
    </div>
    <Tarefa
      v-for="(tarefa, index) in tarefas"
      :tarefa="tarefa"
      :key="index"
      @aoClicado="abrirModal(tarefa)"
    />
    <form @submit.prevent="atualizarTarefa" v-if="tarefaSelecionada">
      <TrackerModal :mostrar="tarefaSelecionada">
        <template v-slot:cabecalho>
          <p class="modal-card-title">Editando a tarefa</p>
          <button
            type="button"
            class="delete"
            aria-label="close"
            @click="fecharModal"
          ></button>
        </template>
        <template v-slot:corpo>
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
        </template>
        <template v-slot:rodape>
          <TrackerBtn
            @aoClicado="fecharModal"
            tipo="button"
            contexto="is-danger"
            texto="Cancelar"
          />
          <TrackerBtn contexto="is-success" texto="Salvar" />
        </template>
      </TrackerModal>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from "vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import Box from "../components/Box.vue";
import TrackerBtn from "../components/TrackerBtn.vue";
import TrackerModal from "../components/TrackerModal.vue";
import ITarefa from "../interfaces/ITarefa";
import { useStore } from "@/store";
import { TipoAcoes } from "@/store/tipos-acoes";

export default defineComponent({
  name: "App",
  components: {
    Formulario,
    Tarefa,
    Box,
    TrackerBtn,
    TrackerModal,
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
    const filtro = ref("");
    onMounted(() => {
      store.dispatch(TipoAcoes.LISTAR_PROJETOS);
      store.dispatch(TipoAcoes.LISTAR_TAREFAS);
    });

    const tarefas = computed(() =>
      store.state.tarefas.filter(
        (t) => !filtro.value || t.descricao.includes(filtro.value)
      )
    );
    return {
      store,
      filtro,
      projetos: computed(() => store.state.projetos),
      tarefas,
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