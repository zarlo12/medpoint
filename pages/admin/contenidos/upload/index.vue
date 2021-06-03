<template>
  <b-container class="container inside bg-gray">
    <Navrow />

    <b-row align-h="between" align-v="end" class="pb-4 content-wrap z2">
      <b-col lg="5" md="5">
        <h4>CONTENIDO</h4>
      </b-col>
      <b-col lg="7" md="7">
        <Buttons />
      </b-col>
    </b-row>

    <div class="form content-wrap">
      <div class="text-center" v-if="load">
        <b-spinner
          variant="primary"
          class="spin"
          label="Text Centered"
        ></b-spinner>
      </div>
      <b-form class="formulario" v-if="!load">
        <b-row align-h="start">
          <b-col md="5">
            <b-form-group>
              <p for="" class="text-left">* Contenido</p>
              <div class="d-flex justify-content-between">
                <b-form-radio
                  v-model="contenido.contenido"
                  name="some-radios"
                  value="paciente"
                  size="lg"
                  >Paciente</b-form-radio
                >
                <b-form-radio
                  v-model="contenido.contenido"
                  name="some-radios"
                  value="médico"
                  size="lg"
                  >Médico</b-form-radio
                >
              </div>
            </b-form-group>
            <b-form-group>
              <p for="" class="text-left">* Título de contenido</p>
              <b-form-input
                v-model="contenido.titulo"
                placeholder="Titulo de contenido"
                class="pill"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <p for="" class="text-left">* Subtítulo de contenido</p>
              <b-form-input
                v-model="contenido.subtitulo"
                placeholder="Subtitulo de contenido"
                class="pill"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <p for="" class="text-left">* Área Terapéutica</p>
              <b-form-select
                v-model="contenido.area_terapeutica"
                :options="categorias"
                class="pill"
              ></b-form-select>
            </b-form-group>
            <b-form-group>
              <p for="" class="text-left">* Tipo de contenido</p>
              <b-form-select
                @change="hideArticle"
                v-model="contenido.tipo_contenido"
                :options="tipos_contenido"
                class="pill"
              ></b-form-select>
            </b-form-group>
            <b-form-group>
              <p for="" class="text-left">* Plataforma</p>
              <b-form-select
                v-model="contenido.plataforma"
                :options="plataformas"
                class="pill"
              ></b-form-select>
            </b-form-group>
            <div>
              <b-form-group>
                <p for="" class="text-left">* Etiquetas (separadas por coma)</p>
                <b-form-input
                  v-model="contenido.etiquetas"
                  placeholder="Etiquetas"
                  class="pill"
                ></b-form-input>
              </b-form-group>
            </div>

            <div>
              <b-form-group>
                <p for="" class="text-left">
                  * Arrastra o selecciona la imagen pequeña
                </p>
                <b-form-file
                  accept="image/*"
                  v-model="file1"
                  ref="imagen"
                  class="pill dragdrop"
                  size="lg"
                  placeholder="o selecciona desde tu computadora"
                  :file-name-formatter="formatNames"
                ></b-form-file>
              </b-form-group>
            </div>
          </b-col>

          <b-col md="5" offset-md="1" align-self="stretch">
            <b-form-group>
              <p for="" class="text-left">
                * Arrastra o selecciona el elemento descargable
              </p>
              <b-form-file
                accept=".pdf"
                v-model="file2"
                ref="pdf"
                class="pill dragdrop"
                size="lg"
                placeholder="o selecciona desde tu computadora"
                :file-name-formatter="formatNames"
              ></b-form-file>
            </b-form-group>

            <b-form-group v-if="!showVideo">
              <p for="" class="text-left">
                * Arrastra o selecciona la imagen principal
              </p>
              <b-form-file
                accept="image/*"
                ref="archivo"
                v-model="file3"
                class="pill dragdrop"
                size="lg"
                placeholder="o selecciona desde tu computadora"
                :file-name-formatter="formatNames"
              ></b-form-file>
            </b-form-group>
            <b-form-group v-if="showVideo">
              <p for="" class="text-left">* Ingresa la url del video</p>
              <b-form-input
                v-model="contenido.url_video"
                placeholder="Enter your name"
                class="pill"
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <p for="" class="text-left">* Texto de artículo</p>
              <quill-editor
                v-model="contenido.articulo"
                :options="editorOption"
              />
            </b-form-group>
            <b-form-group>
              <p for="" class="text-left">* Descripción</p>
              <quill-editor
                @change="onEditorChange($event)"
                v-model="contenido.descripcion"
                :options="editorOption"
              />
            </b-form-group>

            <b-button
              pill
              :block="true"
              type="submit"
              variant="danger"
              size="lg"
              @click="uploadDoc"
              >Subir y guardar</b-button
            >
          </b-col>
        </b-row>
      </b-form>
    </div>
  </b-container>
</template>
<script>
import Buttons from "../../components/buttons";
import { mapActions, mapState } from "vuex";
export default {
  async fetch() {
    setTimeout(() => {
      if (!this.isAdmin) {
        this.$router.push("/");
      }
    }, 2000);
  },
  components: {
    Buttons,
  },
  data() {
    return {
      file1: null,
      file2: null,
      file3: null,
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
      tipos_contenido: [
        { value: null, text: "selecciona", disabled: true },
        { value: "Infografía", text: "Infografía" },
        { value: "Artículo", text: "Artículo" },
        { value: "Video", text: "Video" },
      ],

      plataformas: [
        { value: null, text: "selecciona", disabled: true },
        { value: "Medpoint", text: "MEDPOINT" },
      ],
      contenido: {
        contenido: "",
        titulo: "",
        subtitulo: "",
        area_terapeutica: null,
        tipo_contenido: null,
        plataforma: null,
        url_video: null,
        imagen_small: {
          nombre: "",
          url: "",
          ruta: "",
        },
        archivo: {
          nombre: "",
          url: "",
          ruta: "",
        },
        pdf: {
          nombre: "",
          url: "",
          ruta: "",
        },
        articulo: "",
        descripcion: "",
        etiquetas: "",
        articulo: "",
        visitas: 0,
      },
      text: "",
      showArticulo: false,
      subFile: null,
      showVideo: false,
      archivos: [],
      url_video: null,
    };
  },
  methods: {
    ...mapActions({
      subirArchivo: "contenido/subirArchivo",
      createArchivo: "contenido/crearContenido",
    }),
    formatNames(files) {
      return files.length === 1
        ? files[0].name
        : `${files.length} files selected`;
    },
    hideArticle() {
      if (this.contenido.tipo_contenido == "Artículo") {
        this.showArticulo = true;
        this.showVideo = false;
      } else if (this.contenido.tipo_contenido == "Video") {
        this.showVideo = true;
      }
    },
    async uploadDoc(event) {
      event.preventDefault();
      this.archivos = [this.file1, this.file2, this.file3];
      if (this.contenido.url_video != null) {
        this.contenido.url_video = this.url_video;
      }
      await this.subirArchivo([this.archivos, this.contenido]);
      this.contenido = {
        contenido: "",
        titulo: "",
        subtitulo: "",
        area_terapeutica: null,
        tipo_contenido: null,
        plataforma: null,
        url_video: null,
        imagen_small: {
          nombre: "",
          url: "",
          ruta: "",
        },
        archivo: {
          nombre: "",
          url: "",
          ruta: "",
        },
        pdf: {
          nombre: "",
          url: "",
          ruta: "",
        },
        articulo: "",
        descripcion: "",
        etiquetas: "",
        articulo: "",
        visitas: 0,
      };
    },
    onEditorChange({ quill, html, text }) {
      let textLength = text.length;
      let limit = 150;
      if (textLength > limit) {
        quill.deleteText(limit, textLength);
      }
    },
  },
  computed: {
    ...mapState({
      categorias_array: (state) => state.admin.categorias,
      isAdmin: (state) => state.auth.isAdmin,
      load: (state) => state.contenido.load,
    }),
    categorias() {
      let categorias = [{ value: null, text: "Selecciona", disabled: true }];

      this.categorias_array.filter((item) => {
        categorias.push({ value: item.uid, text: item.nombre });
      });
      return categorias;
    },
  },
  watch: {
    "contenido.url_video": function () {
      console.log(this.contenido.url_video);
      let cadena = this.contenido.url_video;
      if (cadena != null) {
        if (cadena.includes("www.youtube.com")) {
          cadena = cadena.slice(32);
          let youT = "https://www.youtube.com/embed/";
          youT += cadena;
          this.url_video = youT;
        } else {
          cadena = cadena.slice(18);
          let vim = "https://player.vimeo.com/video/";
          vim += cadena;
          console.log(vim);
          this.url_video = vim;
        }
      }
    },
    file1: function () {
      if (this.file1 != null) {
        if (this.archivos.length <= 3) {
          let fileSize = this.file1.size;
          let siezekiloByte = parseInt(fileSize / 1024);
          if (siezekiloByte > 512) {
            this.$swal({
              title: "¡No se puede agregar la imagen!",
              icon: "error",
              showCloseButton: true,
              closeButtonHtml: "Cerrar x",
              html: "La imagen debe ser menor o igual a 500KB",
              confirmButtonText: "Cerrar",
              confirmButtonColor: "#FF0000",
            }).then((result) => {
              if (result.value) {
                this.file1 = null;
              }
            });
            return false;
          }
          console.log(this.file1);
        }
      }
    },
    file2: function () {
      if (this.file2 != null) {
        if (this.archivos.length <= 3) {
          let fileSize = this.file2.size;
          let siezekiloByte = parseInt(fileSize / 1024);
          if (siezekiloByte > 5120) {
            this.$swal({
              title: "¡No se puede agregar el pdf!",
              icon: "error",
              showCloseButton: true,
              closeButtonHtml: "Cerrar x",
              html: "El documento debe ser menor o igual a 5MB",
              confirmButtonText: "Cerrar",
              confirmButtonColor: "#FF0000",
            }).then((result) => {
              if (result.value) {
                this.file2 = null;
              }
            });
            return false;
          }
          console.log(this.file2);
        }
      }
    },
    file3: function () {
      if (this.file3 != null) {
        if (this.archivos.length <= 3) {
          let fileSize = this.file3.size;
          let siezekiloByte = parseInt(fileSize / 1024);
          if (siezekiloByte > 512) {
            this.$swal({
              title: "¡No se puede agregar la imagen!",
              icon: "error",
              showCloseButton: true,
              closeButtonHtml: "Cerrar x",
              html: "La imagen debe ser menor o igual a 500KB",
              confirmButtonText: "Cerrar",
              confirmButtonColor: "#FF0000",
            }).then((result) => {
              if (result.value) {
                this.file3 = null;
              }
            });
            return false;
          }
          console.log(this.file3);
        }
      }
    },
    archivos: function () {
      console.log(this.archivos);
    },
  },
};
</script>
<style scoped>
h4 {
  min-height: auto !important;
  letter-spacing: 0.1em !important;
}
p,
a,
label {
  color: #716e6e;
}
p {
  margin-top: 10px;
  margin-bottom: 0;
}
.tabla {
  position: relative;
}
.spin {
  width: 10rem !important;
  height: 10rem !important;
}
</style>