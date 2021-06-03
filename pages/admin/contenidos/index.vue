<template>
  <b-container class="inside bg-gray">
    <b-row align-h="between" align-v="end" class="pb-4 content-wrap z2">
      <b-col md="5">
        <h4>CONTENIDOS</h4>
      </b-col>
      <b-col md="7">
        <Buttons />
      </b-col>
    </b-row>

    <div class="content-wrap">
      <b-row align-h="end" align-v="center">
        <b-col md="4">
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
              <b-form-select
                v-model="selected"
                :options="list_contenidos"
                class="pill"
              ></b-form-select>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col lg="2" class="mb-0 right-sm">
          <b-form-group class="mb-0">
            <b-input-group>
              <b-button
                pill
                variant="link"
                class="text-gray"
                :disabled="!desactivar_delete"
                @click="deleteContent"
                ><b-icon icon="trash" aria-hidden="true"></b-icon
                >Borrar</b-button
              >
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-table
        responsive
        id="table-contenido"
        :per-page="perPage"
        :current-page="currentPage"
        :items="items"
        :fields="fields"
        :select-mode="selectMode"
        small
        ref="selectableTable"
        selectable
        no-select-on-click
        @row-selected="onRowSelected"
        @row-clicked="onRowClicked"
        class="content-wrap no-bg-selected"
      >
        <!-- Example scoped slot for select state illustrative purposes -->
        <template #head(selected)>
          <input type="checkbox" @change="selectAll" v-model="select" />
        </template>
        <template #cell(selected)="row">
          <Check
            :selectedAll="todo_seleccionado"
            :eliminarC="deleteC"
            :contenido="row.item"
            @datos="getDatos"
          />
        </template>
        <template #cell(fecha_registro)="row">
          {{ formatoFecha(row.item.fecha_registro) }}
        </template>

        <template #cell(area_terapeutica)="row">
          {{ obtenerArea(row.item) }}
        </template>
      </b-table>

      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        align="right"
        aria-controls="table-contenido"
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
import Buttons from "../components/buttons";
import Check from "./components/Check";
import { mapActions, mapState } from "vuex";
import { formatoFecha } from "@/helpers/index";
export default {
  components: {
    Buttons,
    Check,
  },
  async created() {
    setTimeout(() => {
      if(!this.isAdmin){
      this.$router.push('/')
      }
    }, 2000);
    await this.cargarContenidos();
    await this.cargarCategorias();
  },
  data() {
    return {
      fields: [
        { key: "selected", label: "", sortable: false },
        { key: "contenido", label: "Contenido", sortable: false },
        { key: "titulo", label: "Nombre del contenido", sortable: true },
        { key: "area_terapeutica", label: "Area terapeutica", sortable: true },
        { key: "plataforma", label: "Plataforma", sortable: true },
        { key: "tipo_contenido", label: "Tipo", sortable: true },
        { key: "fecha_registro", label: "Fecha", sortable: true },
      ],
      perPage: 10,
      currentPage: 1,
      select: false,
      selected: 'TODOS',
      filter: "",
      selectMode: "multi",
      selected_contenidos: [],
      todo_seleccionado: false,
      deleteC: false,
      lista_contenidos:[]
    };
  },
  methods: {
    ...mapActions({
      cargarContenidos: "contenido/obtenerContenidos",
      cargarCategorias: "admin/obtenerCategorias",
      eliminarContenidos:"contenido/eliminarContenidos",
      removeFile: "contenido/removeFile",
    }),
    onRowSelected(items) {
      this.selected_contenidos = items;
    },
    reemplazarDuplicado(value, index, self) {
      return self.indexOf(value) === index ? value : "";
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
     onRowClicked(item, index, event){
       this.$router.push(`/admin/contenidos/update/${item.uid}`);
    },
    formatoFecha,
    getDatos(datos) {
      if (datos.selected == true) {
        let cont_da = this.contenidos.filter((item) => item.uid == datos.id);
        this.selected_contenidos.push(cont_da[0]);
        console.log(this.selected_contenidos);
      } else {
        this.selected_contenidos = this.selected_contenidos.filter(
          (item) => item.uid !== datos.id
        );
        console.log(this.selected_contenidos);
      }
    },
    obtenerArea(categoria){
      let nombre = this.categorias.find(item => item.uid == categoria.area_terapeutica);
      nombre = nombre.nombre;
      return nombre;
    },
    async deleteContent() {
      this.selected_contenidos.filter(async (item) =>{
        await this.removeFile(item.imagen_small.ruta)
        await this.removeFile(item.pdf.ruta)
        if(item.url_video == null){
           await this.removeFile(item.archivo.ruta)
        }
      })
      await this.eliminarContenidos(this.selected_contenidos);
      this.selected_contenidos = [];
      this.deleteC = true;
      setTimeout(() => {
        this.deleteC = false;
      }, 1000);
    },
  },
  computed: {
    ...mapState({
      contenidos: (state) => state.contenido.contenidos,
      categorias: (state) => state.admin.categorias,
      isAdmin: (state) => state.auth.isAdmin,
    }),
    rows() {
      return this.contenidos.length;
    },
    items() {
      let contenidos = this.contenidos;
      if (this.filter) {
        let vjs = this;
        contenidos = contenidos.filter(function (item) {
          return item.titulo.toLowerCase().includes(vjs.filter.toLowerCase());
        });
      }

      if (this.selected) {
         let vjs = this;
        if(this.selected == 'TODOS'){
          contenidos = contenidos.filter(function (item) {
            return item.tipo_contenido
              .toLowerCase();
          });
        }else{
          contenidos = contenidos.filter(function (item) {
            return item.tipo_contenido
              .toLowerCase()
              .includes(vjs.selected.toLowerCase());
          });
        }
      }

      return contenidos;
    },
    list_contenidos() {
      let contenidos = ['TODOS'];
      this.contenidos.filter((item) => {
        //console.log(item.tipo_contenido)
        contenidos.push(item.tipo_contenido.toUpperCase());
      });
      contenidos = contenidos.map(this.reemplazarDuplicado);
      return contenidos.filter((item) => item !== "");
    },
    desactivar() {
      return this.selected_contenidos.length > 0;
    },
    desactivar_delete() {
      return this.selected_contenidos.length > 0;
    },
  },
};
</script>

<style scoped>
h4 {
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