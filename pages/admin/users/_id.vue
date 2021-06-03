<template>
  <div class="container tabla">
    <div class="row">
        <nuxt-link class="btn btn-primary" to="/admin/users">Regresar</nuxt-link>
      <div class="col-12 my-3 pt-3 shadow">
        <h1>
          {{ usuario.nombre }} {{ usuario.apellido_paterno }}
          {{ usuario.apellido_materno }}
        </h1>
        <br />
        <div class="d-flex justify-content-between mb-3">
          <div class="row">
            <p class="col-6">Sexo: {{ usuario.sexo }}</p>
            <p class="col-6">Correo Electronico: {{ usuario.email }}</p>
            <p class="col-6">Cedula: {{ usuario.cedula }}</p>
            <p class="col-6">Especialidad: {{ usuario.especialidad }}</p>
            <p class="col-6">Estado: {{ usuario.estado }}</p>
            <p class="col-6">Teléfono: {{ usuario.telefono }}</p>
            <p class="col-6">Institución: {{ usuario.institucion }}</p>
            <p class="col-6">Tipo Consulta: {{ usuario.tipo_consulta }}</p>
          </div>
          ss
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      datosUser: "admin/cargarUsuario",
    }),
  },
  async mounted() {
    await this.datosUser(this.$route.params.id);
  },
  computed: {
    ...mapState({
      usuario: (state) => state.admin.usuario,
    }),
  },
};
</script>

<style scoped>
.tabla {
  position: relative;
  top: 100px;
}
</style>
