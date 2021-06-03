<template>
  <div>
    <Update :id="$route.params.id" :modelo="modelo" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { CONTENIDO } from "~/constants";
import Update from "../components/Update";
export default {
  components: {
    Update,
  },
  methods: {
    ...mapActions({
      obtenerContenidos: "contenido/obtenerContenidos",
    }),
  },
  data() {
    return {
      modelo: CONTENIDO,
       editorOption: {
        // Some Quill options...
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
          ],
        },
      },
    }
  },
  async fetch() {
    setTimeout(() => {
      if (!this.isAdmin) {
        this.$router.push("/");
      }
    }, 2000);
    await this.obtenerContenidos();
    this.modelo = this.contenidos.find(
      (item) => item.uid == this.$route.params.id
    );
  },
  computed: {
    ...mapState({
      contenidos: (state) => state.contenido.contenidos,
      isAdmin: (state) => state.auth.isAdmin,
    }),
  },
};
</script>