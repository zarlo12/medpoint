<template>
  <div>
    <Navrow />
    <b-container class="inside bg-gray area-details">
      <h2>{{ nombre_categoria }}</h2>
      <b-row align-h="center" align-v="end" class="content-wrap">
        <b-col lg="8" md="8" sm="7">
          <h3>{{ contenido.titulo }}</h3>
          <h5>{{ contenido.subtitulo }}</h5>
          <b-row align-h="between" align-v="center" class="info-details">
            <b-col md="9" cols="9" class="info">
              <span class="category">{{ nombre_categoria }}</span>
              <span class="like">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path class="st0" d="M17.9,10.2c-0.2-0.4-0.5-0.8-0.9-0.9c0.4-0.4,0.5-0.9,0.3-1.5c-0.2-0.6-0.8-1-1.5-1.1h-4.9l0,0
                    c0.3-0.9,0.5-1.9,0.5-2.9V2.9c0-1.2-0.9-2.1-2.1-2.1H8.7c-0.5,0-0.9,0.4-0.9,0.9v1.8c0,2-1.6,3.7-3.6,3.9V6.2c0-0.2-0.1-0.3-0.3-0.3
                    H0.3C0.1,5.9,0,6,0,6.2v10.8c0,0.2,0.1,0.3,0.3,0.3h3.6c0.2,0,0.3-0.1,0.3-0.3v-1l0.4,0.2c1,0.5,2.2,0.8,3.4,0.8h6.7
                    c0.8,0,1.5-0.7,1.5-1.5c0-0.4-0.1-0.7-0.4-1c0.2-0.1,0.4-0.2,0.5-0.3c0.5-0.5,0.6-1.4,0.1-2c0.4,0,0.8-0.2,1.1-0.4
                    C18,11.3,18.1,10.7,17.9,10.2z M3.6,16.6h-3V6.5h3V16.6z M16.8,11.5c-0.1,0-0.2,0-0.3,0h-1.2h-1.2c-0.2,0-0.3,0.1-0.3,0.3
                    s0.1,0.3,0.3,0.3h1.2c0.5,0,0.9,0.4,0.9,0.9s-0.4,0.9-0.9,0.9h-1.8c-0.2,0-0.3,0.1-0.3,0.3c0,0.2,0.1,0.3,0.3,0.3h1.2
                    c0.5,0,0.9,0.4,0.9,0.9c0,0.5-0.4,0.9-0.9,0.9H8c-1.1,0-2.1-0.3-3.1-0.7l-0.7-0.4V7.9c2.4-0.2,4.2-2.1,4.2-4.5V1.7
                    c0-0.2,0.1-0.3,0.3-0.3h0.6c0.8,0,1.5,0.7,1.5,1.5v0.9c0,0.9-0.2,1.9-0.4,2.8L10.2,7c-0.1,0.2,0,0.3,0.2,0.4c0,0,0.1,0,0.1,0h5.4
                    c0.4,0,0.7,0.3,0.9,0.6c0.2,0.5-0.1,1-0.6,1.1c-0.1,0-0.2,0-0.3,0h-1.5c-0.2,0-0.3,0.1-0.3,0.3c0,0.2,0.1,0.3,0.3,0.3h2.1
                    c0.4,0,0.7,0.3,0.9,0.6C17.5,10.8,17.3,11.4,16.8,11.5z" fill="#000000"/>
                </svg>
                <span>22</span>
              </span>
              <span class="time-read">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <defs>
                      <rect id="SVGID_1_" width="18" height="18"/>
                    </defs>
                    <clipPath id="SVGID_2_">
                      <use xlink:href="#SVGID_1_"  style="overflow:visible;"/>
                    </clipPath>
                    <g class="st0">
                      <path class="st1" d="M16.9,6.8H1.1C0.5,6.8,0,6.2,0,5.6V1.1C0,0.5,0.5,0,1.1,0h15.8C17.5,0,18,0.5,18,1.1v4.5
                        C18,6.2,17.5,6.8,16.9,6.8z M1.1,0.8c-0.2,0-0.4,0.2-0.4,0.4v4.5C0.8,5.8,0.9,6,1.1,6h15.8c0.2,0,0.4-0.2,0.4-0.4V1.1
                        c0-0.2-0.2-0.4-0.4-0.4H1.1z" fill="#333"/>
                      <path class="st1" d="M7.1,13.5h-6C0.5,13.5,0,13,0,12.4v-3c0-0.6,0.5-1.1,1.1-1.1h6c0.6,0,1.1,0.5,1.1,1.1v3
                        C8.2,13,7.7,13.5,7.1,13.5z M1.1,9C0.9,9,0.8,9.2,0.8,9.4v3c0,0.2,0.2,0.4,0.4,0.4h6c0.2,0,0.4-0.2,0.4-0.4v-3
                        C7.5,9.2,7.3,9,7.1,9H1.1z" fill="#333"/>
                      <path class="st1" d="M17.6,9h-7.5C9.9,9,9.8,8.8,9.8,8.6s0.2-0.4,0.4-0.4h7.5c0.2,0,0.4,0.2,0.4,0.4S17.8,9,17.6,9z" fill="#333"/>
                      <path class="st1" d="M17.6,11.2h-7.5c-0.2,0-0.4-0.2-0.4-0.4s0.2-0.4,0.4-0.4h7.5c0.2,0,0.4,0.2,0.4,0.4S17.8,11.2,17.6,11.2z" fill="#333"/>
                      <path class="st1" d="M17.6,13.5h-7.5c-0.2,0-0.4-0.2-0.4-0.4s0.2-0.4,0.4-0.4h7.5c0.2,0,0.4,0.2,0.4,0.4S17.8,13.5,17.6,13.5z" fill="#333"/>
                      <path class="st1" d="M17.6,15.8H0.4c-0.2,0-0.4-0.2-0.4-0.4S0.2,15,0.4,15h17.2c0.2,0,0.4,0.2,0.4,0.4S17.8,15.8,17.6,15.8z" fill="#333"/>
                      <path class="st1" d="M17.6,18H0.4C0.2,18,0,17.8,0,17.6s0.2-0.4,0.4-0.4h17.2c0.2,0,0.4,0.2,0.4,0.4S17.8,18,17.6,18z" fill="#333"/>
                    </g>
                  </g>
                </svg>
                <span>13 min</span>
              </span>
            </b-col>
            <b-col md="2" cols="3" class="obtain">
               <SocialHead :image="contenido.archivo.url" :contenido="contenido"/>
              <span class="download">
                <a :href="contenido.pdf.url" target="_blank">
                  <b-icon icon="download" class="text-dark" scale="1.5" aria-hidden="true"></b-icon>
                </a>
              </span>
            </b-col>
          </b-row>
          <div class="image-wrapper">
            <b-img-lazy
              v-if="contenido.url_video == null"
              :src="contenido.archivo.url"
              fluid
              alt="Responsive image"
            ></b-img-lazy>
            <b-embed
              v-if="contenido.url_video != null"
              type="iframe"
              aspect="16by9"
              :src="contenido.url_video"
              allowfullscreen
            ></b-embed>
            <b-icon  v-if="!agregado" @click="addFav(contenido)"  font-scale="2" icon="bookmark" aria-hidden="true" class="favorite"></b-icon>
            <b-icon  v-if="agregado" @click="addFav(contenido)" font-scale="2" icon="bookmark-fill" aria-hidden="true" class="favorite"></b-icon>
          </div>
        </b-col>
        <b-col lg="4" md="4" sm="5">
          <p>{{ tipo }} | x{{ etiquetas }}</p>
          <p v-html="contenido.descripcion">
          </p>
        </b-col>
      </b-row>
      <b-row align-h="center" align-v="start" class="content-wrap bottom-row">
        <b-col lg="8" md="8" sm="7">
          <p v-html="contenido.articulo">
          </p>
        </b-col>
        <b-col lg="4" md="4" sm="5">
          <div
            class="read-another"
            v-for="(item, index) in contenidos_array"
            :key="index"
          >
           <router-link :to="`/contenido/${convertirSlug(item.titulo)}`">
            <b-img-lazy
              :src="item.imagen_small.url"
              fluid
              alt="Responsive image"
            ></b-img-lazy>
           </router-link>
            <p v-html="item.descripcion"></p>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { CATEGORIA, CONTENIDO } from "~/constants";
import { convertirSlug } from "~/helpers";
export default {
  head: {
    title: 'medpoint',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      
    ],
  },
  props: {
    id:String,
  },
  data() {
    return {
      contenido: CONTENIDO,
      tipo: "",
      contenidos_array: [],
      categoria: CATEGORIA,
      contador: null,
      objeto: {
        id: "",
        visitas: 0,
      },
      etiquetas_array: [],
      categorias_array: [],
      user_contenido: {
        id: "",
        favoritos: [],
        visitas: {
          etiquetas: [],
          categorias: [],
        },
      },
      favoritos: [],
      agregado: false,
      url: "",
      titulo: "",
    };
  },
  methods: {
    ...mapActions({
      cargarContenidos: "contenido/obtenerContenidos",
      obtenerCategorias: "admin/obtenerCategorias",
      updateVisita: "contenido/updateVisita",
      cargarLocalStorage: "auth/cargarLocalStorage",
      updateVisitas: "auth/updateVisitas",
      addFavorito: "auth/addFavorito",
    }),
    convertirSlug,
    shuffle(array) {
      console.log(array);
      let j, x, i;
      for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
      }
    },
    borrarRepetidos(array1, array2) {
      array1.filter((item) => {
        if (array2.includes(item)) {
          for (let i = 0; i < array2.length; i++) {
            if (array2[i] == item) {
              array2.splice(i, 1);
            }
          }
        }
      });
      return array2;
    },
    async addFav(contenido) {
      delete this.user_contenido.visitas;
      if (this.logged) {
        if (this.agregado) {
          //  for(let i =0 ;i<this.favoritos.length; i++){
          //    if(this.favoritos[i] == contenido.uid){
          //      this.favoritos = this.favoritos.slice(i)
          //    }
          //  }
          this.favoritos = this.favoritos.filter(
            (item) => item != contenido.uid
          );
          this.agregado = false;
          this.user_contenido.favoritos = this.favoritos;
          await this.addFavorito(this.user_contenido);
        } else {
          this.favoritos = this.favoritos.concat([this.contenido.uid]);
          this.agregado = true;
          this.user_contenido.favoritos = this.favoritos;
          await this.addFavorito(this.user_contenido);
        }
      } else {
        alert("Inicia sesion o registrate");
      }
    },
  },
  computed: {
    ...mapState({
      contenidos: (state) => state.contenido.contenidos,
      categorias: (state) => state.admin.categorias,
      logged: (state) => state.auth.logged,
      user: (state) => state.auth.usuario,
      isAdmin: state => state.auth.isAdmin
    }),
    ...mapGetters({
      user_etiquetas: "auth/etiquetas",
      user_categorias: "auth/categorias",
      user_favoritos: "auth/favoritos",
    }),
    etiquetas() {
      let etiquetas = this.contenido.etiquetas;
      let regex = /,/g;
      etiquetas = etiquetas.replace(regex, " / ");
      return etiquetas;
    },
    nombre_categoria() {
      let nombre = this.categoria.nombre;
      return nombre;
    },
  },
  async created() {
    console.log(this.user_categorias, "user_cat");
    console.log(this.contador);
    await this.cargarLocalStorage();
    await this.cargarContenidos();
    await this.obtenerCategorias();
    console.log("🚀 ~ file: Detalle.vue ~ line 336 ~ created ~ contenidos", this.contenidos)

    this.contenido = this.contenidos.find((item) => this.convertirSlug(item.titulo) == this.id);
    console.log("🚀 ~ this.contenido", this.contenido)

    if(!this.contenido){
      this.$swal(
        "Página no encotrada",
        "",
        "error"
      );
      return this.$router.push('/')
    }


    this.contador = this.contenido.visitas;
    this.contador += 1;
    this.objeto.id = this.contenido.uid;
    this.objeto.visitas = this.contador;
    if (this.logged && this.isAdmin == null) {
      this.favoritos = this.user_favoritos;
      //console.log(this.favoritos, "favoritos user");
      this.user_contenido.id = this.user.uid;
      this.user_contenido.visitas.etiquetas = this.user.visitas.etiquetas;
      this.user_contenido.visitas.categorias = this.user.visitas.categorias;
      let array_etiquetas = this.contenido.etiquetas.split(",");
      this.etiquetas_array = array_etiquetas;
      this.etiquetas_array = this.borrarRepetidos(
        this.user_etiquetas,
        this.etiquetas_array
      );
      this.categorias_array.push(this.contenido.area_terapeutica);
      this.categorias_array = this.borrarRepetidos(
        this.user_categorias,
        this.categorias_array
      );
      //console.log(this.categorias_array);
      if (
        !this.user_etiquetas.includes(this.contenido.etiquetas) ||
        !this.user_categorias.includes(this.contenido.area_terapeutica)
      ) {
        if (this.user_etiquetas.length > 9) {
          let etiquetas = this.user_etiquetas.slice(3);
          this.user_etiquetas.length = 10;
          this.user_contenido.visitas.etiquetas = etiquetas.concat(
            this.etiquetas_array
          );
        } else {
          this.user_contenido.visitas.etiquetas = this.user_contenido.visitas.etiquetas.concat(
            this.etiquetas_array
          );
        }
        if (this.user_categorias.length > 10) {
          let categorias = this.user_categorias.slice(1);
          this.user_categorias.length = 10;
          //console.log(categorias);
          this.user_contenido.visitas.categorias = categorias.concat(
            this.categorias_array
          );
        } else {
          this.user_contenido.visitas.categorias = this.user_contenido.visitas.categorias.concat(
            this.categorias_array
          );
        }
        //console.log(this.user_contenido, "HOLA");
        await this.updateVisitas(this.user_contenido);

        if (this.user_favoritos.includes(this.contenido.uid)) {
          this.agregado = true;
        }
      }
    }
    await this.updateVisita(this.objeto);

    this.categoria = this.categorias.find(
      (item) => item.uid == this.contenido.area_terapeutica
    );
    this.tipo = this.contenido.tipo_contenido;
    this.tipo = this.tipo.toUpperCase();
    this.contenidos_array = this.contenidos.filter(
      (item) =>
        item.area_terapeutica == this.contenido.area_terapeutica &&
        item.uid != this.contenido.uid
    );
    this.shuffle(this.contenidos_array);
    this.contenidos_array = this.contenidos_array.slice(0, 2);
  },
};
</script>