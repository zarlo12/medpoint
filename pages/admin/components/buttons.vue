<template>
  <div class="text-right">
    <b-dropdown
      variant="transparent"
      id="dropdown-1"
      text="Contenido"
      class="text-danger"
    >
      <b-dropdown-item>
        <nuxt-link class="text-danger px-2" to="/admin/contenidos/upload"
          >Subir contenido</nuxt-link
        >
      </b-dropdown-item>
      <b-dropdown-item>
        <nuxt-link class="text-danger px-2" to="/admin/contenidos"
          >Listado de contenido</nuxt-link
        >
      </b-dropdown-item>
    </b-dropdown>

    <nuxt-link class="text-danger px-2" to="/admin/users"
      >Listado de usuarios</nuxt-link
    >

    <b-dropdown
      variant="transparent"
      id="dropdown-1"
      text="Categorías"
      class="text-danger"
    >
      <b-dropdown-item>
        <b-button
          id="show-btn"
          v-if="show"
          @click="crearCategory"
          variant="link"
          class="text-danger px-2 py-0"
          pill
          >Crear categoría</b-button
        >
      </b-dropdown-item>
      <b-dropdown-item>
        <nuxt-link class="text-danger px-2" to="/admin/categorias"
          >Listado de categorías</nuxt-link
        >
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      create: false,
      show: false,
    };
  },
  mounted() {
    if (this.$route.path != "/admin/categorias") {
      this.show = false;
    }else{
      this.show = true;
    }
  },
  methods: {
    crearCategory(event) {
      event.preventDefault();
      this.create = true;
      this.$emit("process", this.create);
    },
  },
};
</script>