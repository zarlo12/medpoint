<template>
  <div>
    <b-navbar toggleable="lg" type="" variant="faded" class="bg-gray" id="header">
      <b-navbar-brand  @click="$router.push('/')" style="cursor:pointer">
        <b-img-lazy
          :src="require('../assets/img/logo.png')"
          fluid
          rounded
          alt="Responsive image"
        ></b-img-lazy>
      </b-navbar-brand>
      
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="#tendencias">Tendencias</b-nav-item>
        <b-nav-item href="#recomendado">Recomendado</b-nav-item>
        <b-nav-item href="#mas-nuevo">Lo más nuevo</b-nav-item>
        <b-nav-item href="#" class="collapsable">
          <b-button v-b-toggle.header-collapse variant="faded" class="p-0">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8 21.3333V16H56V21.3333H8ZM8 34.6667H56V29.3333H8V34.6667ZM8 48H56V42.6667H8V48Z"
                fill="#333333"
              />
            </svg>
          </b-button>
          <b-collapse id="header-collapse" v-model="showCollapse">
            <b-card>
              <b-button v-b-toggle.header-collapse variant="faded" class="p-0 toggle-inside red-x" >
                <svg width="53" height="66" viewBox="0 0 53 66" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42.92 66L26 39.6L9.68 66H0.8L21.92 33.24L1.04 0.48H10.52L27.2 26.52L43.4 0.48H52.16L31.28 32.88L52.4 66H42.92Z" fill="#FF0000"/></svg>
              </b-button>
              <div v-if="autenticado">
                <nuxt-link to="/home"><h3 class="card-text">Mi perfil</h3></nuxt-link>
                <b-button @click="logout" class="transparent px-0">
                  <h3 class="card-text">Cerrar Sesion</h3>
                </b-button>
              </div>
              <div v-else-if="!autenticado">
                <b-button v-b-toggle.login-collapse class="transparent px-0"><h3 class="card-text">Log In</h3></b-button>
                <b-collapse id="login-collapse" v-model="showCollapse1">
                  <b-button v-b-toggle.login-collapse variant="faded" class="p-0 toggle-inside red-x" >
                    <svg width="53" height="66" viewBox="0 0 53 66" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42.92 66L26 39.6L9.68 66H0.8L21.92 33.24L1.04 0.48H10.52L27.2 26.52L43.4 0.48H52.16L31.28 32.88L52.4 66H42.92Z" fill="#FF0000"/></svg>
                  </b-button>
                  <b-card><Login v-on:process="login($event)" :isAdmin="false" /></b-card>
                </b-collapse>
                <nuxt-link to="/register"><h3 class="card-text">REGISTRARSE</h3></nuxt-link>
                
              </div>
            </b-card>
          </b-collapse>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      showCollapse: false,
      showCollapse1: false,
    };
  },
  methods: {
    ...mapActions({
      ingreso: "auth/ingresarUsuario",
      cerrarSesion: "auth/logginOut",
    }),
    async login(user) {
      //console.log(user);
      await this.ingreso(user);
    },
    async logout() {
      await this.cerrarSesion();
    },
  },
  watch: {
    $route() {
      this.showCollapse = false;
      this.showCollapse1 = false;
    },
  },
  computed: {
    ...mapState({
      autenticado: (state) => state.auth.logged,
    }),
  },
};
</script>
