<template>
  <div class="formulario">
    <h6 v-if="errors.length" :class="!isAdmin ? 'text-light' : 'text-dark' ">
      <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
      <ul>
        <li v-for="(error,key) in errors" :key="key">{{ error }}</li>
      </ul>
    </h6>
    <b-card border-variant="transparent" class="bg-transparent">
      <b-form  autocomplete="off" class="d-flex flex-column justify-content-center" :class="!isAdmin ? 'text-light' : 'text-dark' ">
        <b-form-group id="credenciales">
          <div class="d-flex justify-content-center flex-column align-items-center">
            <div class="col-md-5">
              <label for="">Correo Electrónico</label>
                  <b-form-input
                    id="email"
                    class="pill"
                    v-model="form.email"
                    required
                    type="email" 
                  ></b-form-input>
            </div>
            <div class="col-md-5 mt-5">
                <label for="">Contraseña</label>
                <b-form-input
                id="password"
                class="pill"
                v-model="form.password"
                required
                type="password"
                ></b-form-input>
            </div>
          </div>
          <div class="col-md-5 mt-4 mx-auto">
            <nuxt-link to="/password-reset" :class="!isAdmin ? 'text-light' : 'text-dark' ">¿Olvidaste tu contraseña?</nuxt-link>
          </div>
        </b-form-group>
        <div class="col-md-5 mt-4 mx-auto">
            <b-button pill :block="true" @click="login" size="lg" variant="danger" class="text-white" :disabled="!desactivar">Entrar a mi cuenta</b-button>
        </div>
        <div class="col-md-5 mx-auto mt-2">
          <nuxt-link to="/register"><p class="card-text" :class="!isAdmin ? 'text-light' : 'text-dark' ">No tienes cuenta, registrate aquí</p></nuxt-link>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  props:{
    isAdmin:false
  },
  data() {
    return {
      errors: [],
      form: {
        email: "",
        password: "",
        admin:null
      },
    };
  },
  methods: {
    login(event) {
      event.preventDefault();

      this.errors = [];

      if (!this.form.email) {
        this.errors.push("El correo es obligatorio.");
      }
      if (!this.form.password) {
        this.errors.push("La contraseña es obligatoria.");
      }
      if (this.form.email && this.form.password) {
          this.form.admin = this.isAdmin;
          this.$emit("process", this.form);
      }
      setTimeout(()=>{
        this.errors = [];
      },3000)
      //console.log(this.errors);
    }
  },
  computed: {
    desactivar() {
      return this.form.password && this.form.email;
    },
  },
};
</script>
