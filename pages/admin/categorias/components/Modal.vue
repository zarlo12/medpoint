<template>
  <div>
    <b-modal id="bv-modal-example" hide-footer centered hide-header>
      
      <div class="d-block text-center">
        <div>
          <b-form inline>
            <div class="d-flex">
              <div class="row">
                <div class="col-12" v-if="!load">
                  <label class="sr-only" for="inline-form-input-name"
                    >Nombre categoria</label
                  >
                  <b-form-input
                    id="inline-form-input-name"
                    class="mb-2 pill"
                    size="lg"
                    placeholder="Nombre de categoría"
                    v-model="categoria.nombre"
                    block
                  ></b-form-input>
                  <b-form-file
                    v-model="file"
                    @change="onFileChange"
                    placeholder="Escoge un archivo y arrastralo aquí..."
                    drop-placeholder="Arrastralo aquí..."
                    class="pill"
                  ></b-form-file>
                  <img
                    v-if="url != null"
                    :src="url"
                    width="250px"
                    height="250px"
                    alt=""
                  />
                </div>
                <div class="text-center" v-if="load">
                  <b-spinner
                    variant="primary"
                    class="spin"
                    label="Text Centered"
                  ></b-spinner>
                </div>
              </div>
            </div>
          </b-form>
        </div>
      </div>
      <div v-if="!load">
        <b-button
          class="mt-3"
          @click="$bvModal.hide('bv-modal-example')"
          variant="outline-danger"
          pill
          >Cancelar</b-button
        >
        <b-button
          class="mt-3"
          v-if="opcion == 'create'"
          @click="createCategory"
          variant="danger"
          pill
          >Guardar</b-button
        >
        <b-button
          class="mt-3"
          v-if="opcion == 'edit'"
          @click="editCategory"
          variant="danger"
          >Editar</b-button
        >
      </div>
    </b-modal>
  </div>
</template>

<style scoped>
.form-inline .form-control{
  width: 100%;
}
</style>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    modelo: {
      uid: "",
      nombre: "",
      imagen: {
        url: "",
        nombre: "",
        ruta: "",
      },
    },
    opcion: "",
  },
  data() {
    return {
      categoria: {
        uid: "",
        nombre: "",
        imagen: {
          url: "",
          nombre: "",
          ruta: "",
        },
      },
      file: null,
      url: null,
      file_upload: false,
      nombre: "",
    };
  },
  methods: {
    async createCategory() {
      this.url = null;
      const respuesta = await this.subirArchivo(this.file);
      this.categoria.imagen = respuesta;
      await this.crearCategoria(this.categoria);
      this.$swal(
        "Categoría agregada",
        "¡Su categoría se ha agregado correctamente!",
        "success"
      ).then((result) => {
        if (result.value) {
          this.$bvModal.hide("bv-modal-example");
          this.categoria.nombre = "";
          this.file = null;
        }
      });
    },
    async editCategory() {
      this.url = null;
      if (this.file_upload) {
        await this.removeFile(this.categoria.imagen.ruta);
        const response = await this.subirArchivo(this.file);
        this.categoria.imagen = response;
      }
      await this.editarCategoria(this.categoria);

      this.$swal(
        "Categoría editada",
        "¡Su categoría se ha editado correctamente!",
        "success"
      ).then((result) => {
        if (result.value) {
          this.$bvModal.hide("bv-modal-example");
          this.categoria.nombre = "";
          this.file = null;
        }
      });
    },
    onFileChange(e) {
      this.file = e.target.files[0];
      this.url = URL.createObjectURL(this.file);
      console.log(this.file);
      console.log(this.load);
      this.file_upload = true;
    },
    ...mapActions({
      crearCategoria: "admin/crearCategoria",
      cargarCategorias: "admin/obtenerCategorias",
      editarCategoria: "admin/editCategoria",
      subirArchivo: "contenido/uploadArchivo",
      removeFile: "contenido/removeFile",
    }),
  },
  computed: {
    ...mapState({
      load: (state) => state.contenido.load,
      categorias: (state) => state.admin.categorias,
    }),
  },
  watch: {
    "modelo.nombre": function () {
      console.log(this.modelo);
      this.categoria.nombre = this.modelo.nombre;
      this.categoria.imagen = this.modelo.imagen
      if (this.categoria.imagen.url != "") {
        this.url = this.categoria.imagen.url;
      } else {
        this.url = null;
      }
    },
    "modelo.uid": function () {
      console.log(this.modelo);
      this.categoria.uid = this.modelo.uid;
      this.categoria.nombre = this.modelo.nombre
      this.categoria.imagen = this.modelo.imagen
      if (this.categoria.imagen.url != "") {
        this.url = this.categoria.imagen.url;
      } else {
        this.url = null;
      }
    },
  },
};
</script>

<style scoped>
.spinner-border {
  width: 10rem !important;
  height: 10rem !important;
  position: relative;
  left: 150px;
}
</style>