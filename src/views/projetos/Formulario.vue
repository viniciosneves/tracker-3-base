<template>
  <h1 class="title">
    {{ titulo }}
  </h1>
  <form @submit.prevent="salvar">
    <div class="field">
      <label class="label">Nome do projeto</label>
      <div class="control">
        <input
          class="input"
          v-model="nomeProjeto"
          type="text"
          placeholder="Digite aqui o nome do projeto"
          required
        />
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" type="submit">Salvar</button>
      </div>
      <div class="control">
        <router-link to="/projetos" class="button is-link is-light">
          Voltar
        </router-link>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/notificador/useNotificador";
import { TipoAcoes } from "@/store/tipos-acoes";

export default defineComponent({
  name: "ProjetosForm",
  props: {
    id: {
      type: Number,
    },
  },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find((p) => p.id == this.id);
      if (projeto) {
        this.nomeProjeto = projeto.nome;
      }
    }
  },
  data() {
    return {
      nomeProjeto: "",
    };
  },
  computed: {
    titulo(): string {
      return this.id ? "Editando projeto" : "Novo projeto";
    },
  },
  methods: {
    salvar(): void {
      if (this.id) {
        const projeto = {
          id: this.id,
          nome: this.nomeProjeto,
        };
        this.store.dispatch(TipoAcoes.ATUALIZA_PROJETO, projeto);
      } else {
        this.store.dispatch(TipoAcoes.ADICIONA_PROJETO, this.nomeProjeto);
      }
      this.nomeProjeto = "";
      this.notificar(TipoNotificacao.SUCESSO, 'Projeto adicionado com sucesso', ';)')

      this.$router.push("/projetos");
    },
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificador()
    return {
      store,
      notificar
    };
  },
});
</script>

<style>
.projetos {
  padding: 1.25rem;
}
</style>
