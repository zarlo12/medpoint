<template>
  <b-container class="inside bg-gray">
    <b-row align-h="between" align-v="end" class="pb-4 content-wrap z2">
      <b-col md="5">
        <h4>CATEGORÍAS</h4>
      </b-col>
      <b-col md="7">
        <Buttons v-on:process="crearCategory($event)" />
      </b-col>
    </b-row>

    <div class="m-5"></div>
    <Modal :opcion="option" :modelo="model" />
    <b-row align-h="around" align-v="center">
      <b-col md="4" offset-md="2">
        <b-form-group class="mb-0">
          <b-input-group>
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Buscar por nombre"
              class="pill"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col md="2" class="mb-0">
        <b-form-group class="mb-0">
          <b-input-group>
            <b-button
              pill
              variant="link"
              class="text-gray"
              :disabled="!desactivar_delete"
              @click="eliminarCategory"
              ><b-icon icon="trash" aria-hidden="true"></b-icon>Borrar</b-button
            >
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <div class="overflow-auto" v-if="rows > 0">
      <b-table
        responsive
        id="my-table"
        :items="items"
        :per-page="perPage"
        :current-page="currentPage"
        small
        :fields="fields"
        select-mode="multi"
        @row-selected="onRowSelected"
        @row-clicked="onRowClicked"
        selectable
        no-select-on-click
        ref="selectableTable"
        class="content-wrap no-bg-selected"
      >
        <template #head(selected)>
          <input type="checkbox" @change="selectAll" v-model="select" />
        </template>
        <template #cell(selected)="row">
          <Check
            :selectedAll="todo_seleccionado"
            :eliminarC="deleteC"
            :categoria="row.item"
            @datos="getDatos"
          />
        </template>
        <template #cell(imagen)="row">
          <img :src="row.item.imagen.url" style="width: 100px" alt="" />
        </template>
      </b-table>

      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
        align="right"
        class="content-wrap buttons-outline no-numbers"
      >
        <template #prev-text
          ><span class="text-danger">&lt; Anteriores</span></template
        >
        <template #next-text
          ><span class="text-danger">Siguientes ></span></template
        >
      </b-pagination>
    </div>
  </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Buttons from "../components/buttons";
import Modal from "./components/Modal";
import Check from "./components/Check";
export default {
  components: {
    Buttons,
    Modal,
    Check,
  },
  data() {
    return {
      fields: [
        { key: "selected", label: "", sortable: false },
        { key: "nombre", label: "Nombre" },
        { key: "imagen", label: "Imagen" },
      ],
      perPage: 10,
      currentPage: 1,
      filter: "",
      selectMode: "multi",
      selected_categorias: [],
      todo_seleccionado: false,
      deleteC: false,
      select: false,
      selected: null,
      lista_categorias: [],
      model: {
        uid: "",
        nombre: "",
        imagen: {
          url: "",
          nombre: "",
          ruta: "",
        },
      },
      option: "",
    };
  },
  methods: {
    ...mapActions({
      crearCategoria: "admin/crearCategoria",
      cargarCategorias: "admin/obtenerCategorias",
      eliminarCategoria: "admin/deleteCategoria",
      removeFile: "contenido/removeFile",
    }),
    reemplazarDuplicado(value, index, self) {
      return self.indexOf(value) === index ? value : "";
    },
    crearCategory(create) {
      if (create) {
        this.model = {
          uid: "",
          nombre: "",
          imagen: {
            url: "",
            nombre: "",
            ruta: "",
          },
        };
        this.$bvModal.show("bv-modal-example");
        this.option = "create";
      }
    },
    onRowClicked(item, index, event) {
      this.$bvModal.show("bv-modal-example");
      this.model = item;
      this.option = "edit";
    },
    async eliminarCategory() {
      this.selected_categorias.filter(async (item) => {
       await this.removeFile(item.imagen.ruta);
      });
      setTimeout(async() => {
        await this.eliminarCategoria(this.selected_categorias);
        this.selected_categorias = [];
      }, 1000);
      this.deleteC = true;
      setTimeout(() => {
        this.deleteC = false;
      }, 1000);
      this.$swal(
        "Categoría eliminada",
        "¡Su categoría se ha elimado correctamente!",
        "success"
      );
    },
    onRowSelected(items) {
      this.selected_categorias = items;
      console.log(this.selected_categorias);
    },
    selectAll() {
      if (this.select) {
        this.$refs.selectableTable.selectAllRows();
        this.todo_seleccionado = true;
      } else {
        this.todo_seleccionado = false;
        this.$refs.selectableTable.clearSelected();
      }
    },
    getDatos(datos) {
      if (datos.selected == true) {
        let categoria_da = this.categorias.find(
          (item) => item.uid == datos.id
        );
        this.selected_categorias.push(categoria_da);
        console.log(this.selected_categorias);
      } else {
        this.selected_categorias = this.selected_categorias.filter(
          (item) => item.uid !== datos.id
        );
        console.log(this.selected_categorias);
      }
    },
  },
  async created() {
    setTimeout(() => {
      if (!this.isAdmin) {
        this.$router.push("/");
      }
    }, 2000);
    await this.cargarCategorias();
  },
  computed: {
    selected_users_rows() {
      return this.selected_users.length;
    },
    rows() {
      return this.categorias.length;
    },
    items() {
      let categorias = this.categorias;
      if (this.filter) {
        let vjs = this;
        categorias = categorias.filter((item) => {
          return item.nombre.toLowerCase().includes(vjs.filter.toLowerCase());
        });
      }

      return categorias;
    },
    desactivar_delete() {
      return this.selected_categorias.length > 0;
    },
    ...mapState({
      usuario: (state) => state.auth.usuario,
      categorias: (state) => state.admin.categorias,
      isAdmin: (state) => state.auth.isAdmin,
    }),
  },
  watch: {
    selected_categorias: function () {
      if (this.selected_categorias.length < this.items.length) {
        this.select = false;
      } else if (this.selected_categorias.length == this.items.length) {
        this.select = true;
      }
    },
  },
};
</script>
<style scoped>
h4{
  min-height: auto !important;
  letter-spacing: 0.1em !important;
}
.tabla {
  position: relative;
}
.spin {
  width: 10rem !important;
  height: 10rem !important;
}
</style>