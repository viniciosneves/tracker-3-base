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
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "@/store";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/notificador/useNotificador";
import { TipoAcoes } from "@/store/tipos-acoes";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "ProjetosForm",
  computed: {
    titulo(): string {
      return this.$route.params.id ? "Editando projeto" : "Novo projeto";
    },
  },
  setup() {
    const store = useStore();
    const route = useRoute()
    const router = useRouter();
    const { notificar } = useNotificador()
    const nomeProjeto = ref('')
    const id = route.params.id as string
    
    onMounted(() => {
      if (id) {
        const projeto = store.state.projetos.find((p) => p.id == parseInt(id));
        if (projeto) {
          nomeProjeto.value = projeto.nome;
        }
      }
    })

    const salvar = () => {
      if (id) {
        const projeto = {
          id: id,
          nome: nomeProjeto.value,
        };
        store.dispatch(TipoAcoes.ATUALIZA_PROJETO, projeto);
      } else {
        store.dispatch(TipoAcoes.ADICIONA_PROJETO, nomeProjeto.value);
      }
      nomeProjeto.value = "";
      notificar(TipoNotificacao.SUCESSO, 'Projeto adicionado com sucesso', ';)')

      router.push("/projetos");
    }

    return {
      nomeProjeto,
      store,
      notificar,
      salvar
    };
  },
});
</script>

<style>
.projetos {
  padding: 1.25rem;
}
</style>
