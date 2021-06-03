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
      <b-form class="formulario">
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
                  value="medico"
                  size="lg"
                  >Médico</b-form-radio
                >
              </div>
            </b-form-group>
            <b-form-group>
              <p for="" class="text-left">* Titulo de contenido</p>
              <b-form-input
                v-model="contenido.titulo"
                placeholder="Titulo de contenido"
                class="pill"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <p for="" class="text-left">* Subtitulo de contenido</p>
              <b-form-input
                v-model="contenido.subtitulo"
                placeholder="Subtitulo de contenido"
                class="pill"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <p for="" class="text-left">* Área Terapéutica</p>
              <b-form-select
                :options="categorys"
                v-model="area"
                class="pill"
              ></b-form-select>
            </b-form-group>
            <b-form-group>
              <p for="" class="text-left">* Tipo de contenido</p>
              <b-form-select
                @change="hideArticle"
                :options="tipos_contenidos"
                v-model="tipo"
                class="pill"
              ></b-form-select>
            </b-form-group>
            <b-form-group>
              <p for="" class="text-left">* Plataforma</p>
              <b-form-select
                v-model="plataforma"
                class="pill"
                :options="plataformas_array"
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
                  v-model="imagen_small"
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
                v-model="documento"
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
                v-model="imagen"
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
              <p for="" class="text-left">* Artículo</p>

              <quill-editor
                size="lg"
                class="pill"
                v-model="contenido.articulo"
                :options="editorOption"
                rows="6"
              />
            </b-form-group>
            <b-form-group>
              <p for="" class="text-left">* Descripción</p>

              <quill-editor
                size="lg"
                class="pill"
                @change="onEditorChange($event)"
                v-model="contenido.descripcion"
                :options="editorOption"
                rows="6"
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
import { CONTENIDO } from "~/constants";
import { mapActions, mapState } from "vuex";
export default {
  props: {
    id: null,
    modelo: {},
  },
  components: {
    Buttons,
  },
  data() {
    return {
      tipos_contenido: [],
      plataformas: [],
      contenido: CONTENIDO,
      upload: false,
      imagen_small: null,
      documento: null,
      imagen: null,
      showArticulo: false,
      showVideo: false,
      area: null,
      tipo: null,
      plataforma: null,
      url_video: null,
      categoria: {},
      archivo: {
        url: "",
        nombre: "",
        ruta: "",
      },
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
    };
  },
  methods: {
    ...mapActions({
      subirArchivo: "contenido/uploadArchivo",
      obtenerCategorias: "admin/obtenerCategorias",
      removerArchivo: "contenido/removeFile",
      createArchivo: "contenido/crearContenido",
      editContenido: "contenido/editContenido",
    }),
    formatNames(files) {
      return files.length === 1
        ? files[0].name
        : `${files.length} files selected`;
    },
    hideArticle() {},
    async uploadDoc(event) {
      event.preventDefault();
      this.area != null
        ? (this.contenido.area_terapeutica = this.area)
        : (this.contenido.area_terapeutica = this.contenido.area_terapeutica);
      this.plataforma != null
        ? (this.contenido.plataforma = this.plataforma)
        : (this.contenido.plataforma = this.contenido.plataforma);
      this.tipo != null
        ? (this.contenido.tipo_contenido = this.tipo)
        : (this.contenido.tipo_contenido = this.contenido.tipo_contenido);
      let file;
      let img_small;
      let doc;
      if (this.imagen != null) {
        if (this.contenido.archivo.url != "") {
          await this.removerArchivo(this.contenido.archivo.ruta);
        }
        file = await this.subirArchivo(this.imagen);
        this.contenido.archivo = file;
        this.contenido.url_video = null;
      }
      if (this.imagen_small != null) {
        await this.removerArchivo(this.contenido.imagen_small.ruta);
        img_small = await this.subirArchivo(this.imagen_small);
        this.contenido.imagen_small = img_small;
      }
      if (this.documento != null) {
        await this.removerArchivo(this.contenido.pdf.ruta);
        doc = await this.subirArchivo(this.documento);
        this.contenido.pdf = doc;
      }
      if (this.url_video != null) {
        if (this.contenido.archivo.url != null) {
          await this.removerArchivo(this.contenido.archivo.ruta);
          this.contenido.archivo = this.archivo;
        }

        this.contenido.url_video = this.url_video;
      }

      await this.editContenido(this.contenido);
    },

    hideArticle() {
      if (this.tipo == "Video") {
        this.showVideo = true;
      } else {
        this.showVideo = false;
      }
    },
    onEditorChange({ quill, html, text }) {
      let textLength = text.length;
      let limit = 150;
      if (textLength > limit) {
        quill.deleteText(limit, textLength);
      }
    },
  },
  watch: {
    modelo: function () {
      if (this.modelo.url_video != null) {
        this.showVideo = true;
      }
      this.contenido.uid = this.modelo.uid;
      this.contenido.contenido = this.modelo.contenido;
      this.contenido.titulo = this.modelo.titulo;
      this.contenido.subtitulo = this.modelo.subtitulo;
      this.categoria = this.categorias.find(
        (item) => item.uid == this.modelo.area_terapeutica
      );
      this.contenido.area_terapeutica = this.modelo.area_terapeutica;
      this.contenido.tipo_contenido = this.modelo.tipo_contenido;
      this.contenido.plataforma = this.modelo.plataforma;
      this.contenido.etiquetas = this.modelo.etiquetas;
      this.contenido.articulo = this.modelo.articulo;
      this.contenido.descripcion = this.modelo.descripcion;
      this.contenido.imagen_small = this.modelo.imagen_small;
      this.contenido.pdf = this.modelo.pdf;
      if (this.modelo.archivo.url != "") {
        this.contenido.archivo = this.modelo.archivo;
      } else {
        this.contenido.url_video = this.modelo.url_video;
      }
    },
    "contenido.url_video": function () {
      console.log(this.contenido.url_video);
      let cadena = this.contenido.url_video;
      if (cadena != null) {
        if (cadena.includes("www.youtube.com")) {
          if (!cadena.includes("embed")) {
            cadena = cadena.slice(32);
            let youT = "https://www.youtube.com/embed/";
            youT += cadena;
            this.url_video = youT;
            console.log(youT);
          }
        }

        if (cadena.includes("www.vimeo.com")) {
          if (!cadena.includes("player")) {
            cadena = cadena.slice(18);
            let vim = "https://player.vimeo.com/video/";
            vim += cadena;
            console.log(vim);
            this.url_video = vim;
          }
        }
      }
    },
    imagen: function () {},
  },
  computed: {
    ...mapState({
      categorias: (state) => state.admin.categorias,
    }),
    categorys() {
      let categorias = [
        { value: null, text: this.categoria.nombre, disabled: false },
      ];

      this.categorias.filter((item) => {
        if (item.uid != this.modelo.area_terapeutica) {
          categorias.push({ value: item.uid, text: item.nombre });
        }
      });
      return categorias;
    },
    tipos_contenidos() {
      let contenidos;
      if (this.modelo.tipo_contenido == "Video") {
        contenidos = [
          { value: null, text: this.modelo.tipo_contenido, disabled: true },
          { value: "Infografía", text: "Infografía" },
          { value: "Artículo", text: "Artículo" },
        ];
      } else if (this.modelo.tipo_contenido == "Artículo") {
        contenidos = [
          { value: null, text: this.modelo.tipo_contenido, disabled: true },
          { value: "Infografía", text: "Infografía" },
          { value: "Video", text: "Video" },
        ];
      } else {
        contenidos = [
          { value: null, text: this.modelo.tipo_contenido, disabled: true },
          { value: "Video", text: "Video" },
          { value: "Artículo", text: "Artículo" },
        ];
      }
      return contenidos;
    },
    plataformas_array() {
      let plataformas;
      if (this.modelo.plataforma == "Medpoint") {
        plataformas = [
          { value: null, text: this.modelo.plataforma, disabled: true },
        ];
      }
      return plataformas;
    },
  },
  async fetch() {
    await this.obtenerCategorias();
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