<template>
  <b-container class="tabla inside bg-gray">
    <b-row align-h="between" align-v="end" class="pb-4 content-wrap z2">
      <b-col lg="5" md="5">
        <h4>USUARIOS</h4>
      </b-col>
      <b-col lg="7" md="7">
        <Buttons />
      </b-col>
    </b-row>

    <div class="content-wrap">
      <div class="text-center">
        <b-spinner
          v-if="isActive"
          variant="primary"
          class="spin"
          label="Text Centered"
        ></b-spinner>
      </div>
      <div v-if="showTable">
        <b-row align-h="end" align-v="center">
          <b-col lg="4" md="5">
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
          <b-col lg="2" md="3" class="mb-0">
            <b-form-group class="mb-0">
              <b-input-group>
                <b-form-select
                  v-model="selected"
                  :options="especialidades"
                  class="pill"
                ></b-form-select>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col lg="2" md="3" class="mb-0 right-sm">
            <b-form-group class="mb-0">
              <b-input-group>
                <b-button
                  pill
                  variant="link"
                  class="text-gray"
                  :disabled="!desactivar_delete"
                  @click="deleteUser"
                  ><b-icon icon="trash" aria-hidden="true"></b-icon
                  >Borrar</b-button
                >
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>

        <b-table
          responsive
          v-if="showTable"
          id="my-table"
          :items="items"
          :per-page="perPage"
          :current-page="currentPage"
          small
          :fields="fields"
          select-mode="multi"
          @row-selected="onRowSelected"
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
              :eliminarU="deleteU"
              :user="row.item"
              @datos="getDatos"
            />
          </template>
          <template #cell(nombre)="row">
            {{ row.item.nombre }} {{ row.item.apellido_paterno }}
            {{ row.item.apellido_materno }}
          </template>
          <template #cell(especialidad)="row">
            {{ obtenerArea(row.item.especialidad) }}
          </template>
        </b-table>

        <!-- <template slot="cell(action)" slot-scope="data">
                <b-button size="sm" variant="primary">
                  Editar
                </b-button>
                <b-button size="sm" variant="danger">
                  Eliminar
                </b-button>

             </template> -->
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          align="right"
          aria-controls="my-table"
          :disabled="desactivar"
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
    </div>
  </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Check from "./components/Check";
import Buttons from "../components/buttons";
import { nombreCategoria } from "~/helpers";
export default {
  components: {
    Check,
    Buttons,
  },
  data() {
    return {
      fields: [
        { key: "selected", label: "", sortable: false },
        { key: "cedula", label: "Cédula", sortable: true },
        { key: "nombre", label: "Nombre", sortable: true },
        { key: "email", label: "E-mail", sortable: true },
        { key: "especialidad", label: "Especialidad", sortable: true },
      ],
      perPage: 10,
      currentPage: 1,
      showTable: false,
      isActive: true,
      filter: "",
      selected: 'TODOS',
      selectMode: "multi",
      selected_users: [],
      select: false,
      todo_seleccionado: false,
      deleteU: false,
    };
  },
  methods: {
    ...mapActions({
      cargarUsers: "admin/usersLoad",
      eliminarUsuario: "admin/deleteUsuario",
      obtenerCategorias: "admin/obtenerCategorias",
    }),
    nombreCategoria,
    reemplazarDuplicado(value, index, self) {
      return self.indexOf(value) === index ? value : "";
    },
    onRowSelected(items) {
      this.selected_users = items;
      console.log(this.selected_users);
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
        let user_da = this.usuarios.filter((item) => item.uid == datos.id);
        this.selected_users.push(user_da[0]);
        console.log(this.selected_users);
      } else {
        this.selected_users = this.selected_users.filter(
          (item) => item.uid !== datos.id
        );
        console.log(this.selected_users);
      }
    },
    obtenerArea(id) {
      let nombre = this.categorias.find((item) => item.uid == id);
      return nombre.nombre;
    },
    async deleteUser() {
      await this.eliminarUsuario(this.selected_users);
      this.selected_users = [];
      this.deleteU = true;
      setTimeout(() => {
        this.deleteU = false;
      }, 1000);
    },
  },
  async created() {
    await this.cargarUsers();
    await this.obtenerCategorias();
    setTimeout(() => {
      this.showTable = true;
      this.isActive = false;
      if (!this.isAdmin) {
        this.$router.push("/");
      }
    }, 2000);
  },
  computed: {
    selected_users_rows() {
      return this.selected_users.length;
    },
    rows() {
      return this.usuarios.length;
    },
    ...mapState({
      isAdmin: (state) => state.auth.isAdmin,
      usuario: (state) => state.auth.usuario,
      usuarios: (state) => state.admin.usuarios,
      categorias: (state) => state.admin.categorias,
    }),
    items() {
      let usuarios = this.usuarios;
      if (this.filter) {
        let vjs = this;
        usuarios = usuarios.filter(function (item) {
          return (
            item.nombre.toLowerCase().includes(vjs.filter.toLowerCase()) ||
            item.apellido_paterno
              .toLowerCase()
              .includes(vjs.filter.toLowerCase()) ||
            item.apellido_materno
              .toLowerCase()
              .includes(vjs.filter.toLowerCase())
          );
        });
      }
      if (this.selected) {
         let categoria = this.categorias.find(
            (item) => item.nombre == this.selected
          );
        if (this.selected == "TODOS") {
          //console.log("esta es la categoria",categoria)
          usuarios = usuarios.filter(function (item) {
            return item.especialidad;
          });
        } else {
          //console.log("esta es la categoria",categoria)
          usuarios = usuarios.filter(function (item) {
            return item.especialidad.includes(categoria.uid);
          });
        }
      }

      return usuarios.filter((item) => item.activo === true);
      // return this.filter
      //   ? this.usuarios.filter(
      //       (item) =>
      //         item.nombre.toLowerCase().includes(this.filter.toLowerCase()) ||
      //         item.apellido_paterno
      //           .toLowerCase()
      //           .includes(this.filter.toLowerCase()) ||
      //         item.apellido_materno
      //           .toLowerCase()
      //           .includes(this.filter.toLowerCase()) || item.especialidad
      //           .toLowerCase()
      //           .includes(this.filter.toLowerCase())
      //     )
      //   : this.usuarios;
    },
    especialidades() {
      let especialidades = [];
      this.usuarios.filter((item) => {
        especialidades.push(item.especialidad);
      });
      let array = ["TODOS"];
      especialidades.forEach((item) => {
        array.push(this.obtenerArea(item));
      });
      array = array.map(this.reemplazarDuplicado);
      return array.filter((item) => item !== "");
    },

    desactivar() {
      return this.selected_users.length > 0;
    },
    desactivar_delete() {
      return this.selected_users.length > 0;
    },
  },
  watch: {
    selected_users: function () {
      if (this.selected_users.length < this.items.length) {
        this.select = false;
      } else if (this.selected_users.length == this.items.length) {
        this.select = true;
      }
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