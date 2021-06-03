<template>
  <div>
    <b-collapse :id="id" class="">
      <b-card>
        <b-button @click="removeClass" v-b-toggle="id" variant="faded" class="p-0 toggle-inside">
          <svg
            width="45"
            height="45"
            viewBox="0 0 45 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M38.4099 6.59004C34.1602 2.34035 28.5099 0 22.5 0C16.4901 0 10.8398 2.34035 6.59013 6.59013C2.34044 10.8398 0 16.49 0 22.5001C0 28.51 2.34035 34.1604 6.59004 38.41C10.8397 42.6596 16.49 45 22.4999 45C28.5099 45 34.1602 42.6596 38.4099 38.41C42.6596 34.1602 45 28.51 45 22.5C45 16.49 42.6596 10.8398 38.4099 6.59004ZM36.5454 36.5455C32.7938 40.2971 27.8056 42.3633 22.4999 42.3633C17.1942 42.3633 12.2061 40.2971 8.45446 36.5455C4.70276 32.7938 2.63672 27.8058 2.63672 22.5001C2.63672 17.1944 4.70294 12.2063 8.45455 8.45455C12.2063 4.70285 17.1943 2.63672 22.5 2.63672C27.8057 2.63672 32.7938 4.70285 36.5455 8.45446C44.29 16.1992 44.29 28.8008 36.5454 36.5455Z"
              fill="white"
            />
            <path
              d="M32.4188 30.5545L24.3644 22.5001L32.4188 14.4457C32.9336 13.9308 32.9336 13.0961 32.4187 12.5814C31.904 12.0665 31.0692 12.0665 30.5543 12.5814L22.5 20.6357L14.4456 12.5813C13.9309 12.0664 13.0961 12.0664 12.5812 12.5813C12.0664 13.0961 12.0664 13.9308 12.5812 14.4457L20.6356 22.5001L12.5812 30.5545C12.0664 31.0693 12.0664 31.904 12.5812 32.4189C12.8386 32.6763 13.1761 32.805 13.5134 32.805C13.8508 32.805 14.1882 32.6763 14.4456 32.4189L22.5 24.3645L30.5544 32.4189C30.8118 32.6763 31.1493 32.805 31.4867 32.805C31.8241 32.805 32.1615 32.6763 32.4188 32.4189C32.9337 31.904 32.9337 31.0693 32.4188 30.5545Z"
              fill="white"
            />
          </svg>
        </b-button>
        <b-row align-h="center">
          <b-col lg="7" md="10" sm="10" class="focus-read">
            <h3 class="title-focus">{{ contenido.titulo }}</h3>
            <h5 class="subtitle-focus">{{ contenido.subtitulo }}</h5>
            <br />
            <b-row align-h="between" class="pb-3 text-above-image">
              <b-col lg="5" md="6" class="info-focus">
                <span class="category">{{ categoria.nombre }}</span>
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
                      c0.4,0,0.7,0.3,0.9,0.6C17.5,10.8,17.3,11.4,16.8,11.5z" fill="#fff"/>
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
                          c0-0.2-0.2-0.4-0.4-0.4H1.1z" fill="#fff"/>
                        <path class="st1" d="M7.1,13.5h-6C0.5,13.5,0,13,0,12.4v-3c0-0.6,0.5-1.1,1.1-1.1h6c0.6,0,1.1,0.5,1.1,1.1v3
                          C8.2,13,7.7,13.5,7.1,13.5z M1.1,9C0.9,9,0.8,9.2,0.8,9.4v3c0,0.2,0.2,0.4,0.4,0.4h6c0.2,0,0.4-0.2,0.4-0.4v-3
                          C7.5,9.2,7.3,9,7.1,9H1.1z" fill="#fff"/>
                        <path class="st1" d="M17.6,9h-7.5C9.9,9,9.8,8.8,9.8,8.6s0.2-0.4,0.4-0.4h7.5c0.2,0,0.4,0.2,0.4,0.4S17.8,9,17.6,9z" fill="#fff"/>
                        <path class="st1" d="M17.6,11.2h-7.5c-0.2,0-0.4-0.2-0.4-0.4s0.2-0.4,0.4-0.4h7.5c0.2,0,0.4,0.2,0.4,0.4S17.8,11.2,17.6,11.2z" fill="#fff"/>
                        <path class="st1" d="M17.6,13.5h-7.5c-0.2,0-0.4-0.2-0.4-0.4s0.2-0.4,0.4-0.4h7.5c0.2,0,0.4,0.2,0.4,0.4S17.8,13.5,17.6,13.5z" fill="#fff"/>
                        <path class="st1" d="M17.6,15.8H0.4c-0.2,0-0.4-0.2-0.4-0.4S0.2,15,0.4,15h17.2c0.2,0,0.4,0.2,0.4,0.4S17.8,15.8,17.6,15.8z" fill="#fff"/>
                        <path class="st1" d="M17.6,18H0.4C0.2,18,0,17.8,0,17.6s0.2-0.4,0.4-0.4h17.2c0.2,0,0.4,0.2,0.4,0.4S17.8,18,17.6,18z" fill="#fff"/>
                      </g>
                    </g>
                  </svg>
                  <span>13 min</span>
                </span>
              </b-col>
              <b-col lg="2" md="4" class="obtain">
               <b-dropdown variant="transparent" class="text-white">
                  <template #button-content>
                    <b-icon icon="share" aria-hidden="true"></b-icon>
                  </template>
                  <b-dropdown-item-button @click="sharedFB(contenido)">
                    <b-icon icon="facebook" aria-hidden="true"></b-icon>
                    Facebook <span class="sr-only"></span>
                  </b-dropdown-item-button>
                  <b-dropdown-item-button @click="sharedTW(contenido)">
                    <b-icon icon="twitter" aria-hidden="true"></b-icon>
                    Twitter <span class="sr-only"></span>
                  </b-dropdown-item-button>
                  <b-dropdown-item-button @click="copyLink(contenido)">
                    <b-icon icon="paperclip" aria-hidden="true"></b-icon>
                    Copiar link <span class="sr-only"></span>
                  </b-dropdown-item-button>
                </b-dropdown>
                <span class="download">
                  <a :href="contenido.pdf.url" target="_blank">
                    <b-icon icon="download" class="text-white" scale="2" aria-hidden="true"></b-icon>
                  </a>
                </span>
              </b-col>
            </b-row>
            <div class="image-wrapper">
              <b-icon
                v-if="!agregado"
                @click="addFav(contenido)"
                font-scale="2"
                icon="bookmark"
                aria-hidden="true"
                class="favorite"
              ></b-icon>
              <b-icon
                v-if="agregado"
                @click="addFav(contenido)"
                font-scale="2"
                icon="bookmark-fill"
                aria-hidden="true"
                class="favorite"
              ></b-icon>
              <b-img-lazy
                v-if="contenido.url_video == null"
                :src="contenido.archivo.url"
                fluid
                alt="Responsive image"
                class="focus-img"
              ></b-img-lazy>
              <b-embed
                v-if="contenido.url_video != null"
                type="iframe"
                aspect="16by9"
                :src="contenido.url_video"
                allowfullscreen
              ></b-embed>
            </div>
            <div class="pt-4 text-below-image">
              <p>{{ tipo }} | {{ etiquetas }}</p>
              <br class="sm-hide" />
              <p v-html="contenido.descripcion"></p>
            </div>
            <div class="nav-arrow right" @click="removeClass">
              <!-- <router-link  :to="`/contenido/${contenido.uid}#${contenido.titulo}${contenido.subtitulo}`"> -->
              <router-link  :to="`/contenido/${convertirSlug(contenido.titulo)}`">
                <p class="vermas">Ver más
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
            
                    <path
                      d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z"
                      fill="white"
                    />
                  </svg>
                </p>
              </router-link>
            </div>
          </b-col>
          <b-col lg="5" md="10" class="similar-read">
            <h4>MÁS COMO ESTO</h4>
            <b-row class="pb-2" align-h="start">
              <b-col
                lg="6"
                md="5"
                sm="12"
                class="similar-wrap"
                v-for="(item, index) in contenidos_array"
                :key="index"
              >
               <router-link :to="`/contenido/${convertirSlug(item.titulo)}`" >
               <div  @click="removeClass">
                  <b-img-lazy
                 
                  :src="item.imagen_small.url"
                  fluid
                  alt="Responsive image"
                ></b-img-lazy></div>
               </router-link>
                <h5 class="title-similar">
                  {{ item.titulo }}
                </h5>
                <p class="info-similar" v-html="item.descripcion">
                </p>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-card>
    </b-collapse>
  </div>
</template>
<script>
import { CATEGORIA, CONTENIDO } from "~/constants";
import { nombreCategoria, convertirSlug } from "~/helpers";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  props: {
    id: "",
    modelo: CONTENIDO,
  },
  data() {
    return {
      contenido: CONTENIDO,
      categoria: CATEGORIA,
      tipo: "",
      contenidos_array: [],
      agregado: false,
      favoritos: [],
      user_contenido: {
        id: "",
        favoritos: [],
      },
    };
  },
  methods: {
    ...mapActions({
      cargarContenidos: "contenido/obtenerContenidos",
      obtenerCategorias: "admin/obtenerCategorias",
      cargarLocalStorage: "auth/cargarLocalStorage",
      addFavorito: "auth/addFavorito",
    }),
    nombreCategoria,
    convertirSlug,
    shuffle(array) {
      //console.log(array);
      let j, x, i;
      for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
      }
    },
    //:to="`/contenido/${convertirSlug(contenido.titulo)}`"
    sharedFB(item) {
      let url = `https://proyectoshm.com/medpoint/contenido/${this.convertirSlug(item.titulo)}`;
      url = encodeURIComponent(url);
      window.open(`http://www.facebook.com/share.php?u=${url}`, "_blank");
    },
    sharedTW(item) {
      let url = `https://proyectoshm.com/medpoint/contenido/${this.convertirSlug(item.titulo)}`;
      url = encodeURIComponent(url);
      let titulo = document.title;
      titulo = encodeURIComponent(titulo);
      window.open(
        `https://twitter.com/intent/tweet?text=${titulo}&url=${url}`,
        "_blank"
      );
    },
    copyLink(item) {
      let aux = document.createElement("input");
      let url = `https://proyectoshm.com/medpoint/contenido/${this.convertirSlug(item.titulo)}`;
      aux.setAttribute("value", url);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
    },
    async addFav(contenido) {
      if (this.logged) {
        if (this.agregado) {
          this.favoritos = this.favoritos.filter(
            (item) => item != contenido.uid
          );

          this.user_contenido.favoritos = this.favoritos;
          await this.addFavorito(this.user_contenido);
          this.agregado = false;
          //console.log(this.user_contenido)
        } else {
          this.favoritos = this.favoritos.concat([this.contenido.uid]);
          this.user_contenido.favoritos = this.favoritos;
          //console.log(this.user_contenido)
          await this.addFavorito(this.user_contenido);
          this.agregado = true;
        }
      } else {
        alert("Inicia sesion o registrate");
      }
    },
    removeClass(){
      document.querySelector('#__layout').classList.remove('modalOpen');
    }
  },
  async fetch() {
    await this.cargarLocalStorage();
    await this.obtenerCategorias();
    await this.cargarContenidos();
    if (this.logged) {
      this.favoritos = this.user_favoritos;
      this.user_contenido.id = this.user.uid;
    } else {
      console.log("no logueado");
    }
  },
  computed: {
    ...mapState({
      contenidos: (state) => state.contenido.contenidos,
      categorias: (state) => state.admin.categorias,
      logged: (state) => state.auth.logged,
      user: (state) => state.auth.usuario,
    }),
    etiquetas() {
      let etiquetas = this.contenido.etiquetas;
      let regex = /,/g;
      etiquetas = etiquetas.replace(regex, " / ");
      return etiquetas;
    },
    ...mapGetters({
      user_favoritos: "auth/favoritos",
    }),
  },
  watch: {
    modelo: function () {
      this.contenido = {};
      this.contenido = this.modelo;
      console.log(this.contenido);
      this.categoria = this.categorias.find(
        (item) => item.uid == this.contenido.area_terapeutica
      );
      this.tipo = this.contenido.tipo_contenido.toUpperCase();
      this.contenidos_array = this.contenidos.filter(
        (item) =>
          item.area_terapeutica == this.contenido.area_terapeutica &&
          item.uid != this.contenido.uid
      );
      this.shuffle(this.contenidos_array);
      this.contenidos_array = this.contenidos_array.slice(0, 4);
      if (this.user_favoritos.includes(this.contenido.uid)) {
        this.agregado = true;
      }
      document.querySelector('#__layout').classList.add('modalOpen');
    },
  },
};
</script>