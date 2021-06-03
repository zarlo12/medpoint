<template>
  <div class="formulario">
    <b-card :title="titulo" class="no-border bg-transparent">
      <ValidationObserver ref="form">
        <b-form @submit="onSubmit" autocomplete="off">
          <b-form-group id="sexo" v-if="titulo == 'Registro'">
            <div class="col-lg-5 col-md-6">
              <ValidationProvider
                  name="confirm"
                  rules="required"
                  v-slot="{ valid }"
                >
              <p for="" class="text-left">* Sexo</p>
              <div class="d-flex flex-wrap justify-content-between">
                <b-form-radio
                  v-model="form.sexo"
                  :state="!valid && validarForm ? false : null"
                  class="mr-2 justify-content-start"
                  size="lg"
                  name="some-radios2"
                  value="Hombre"
                  >Hombre</b-form-radio
                >
                <b-form-radio
                  v-model="form.sexo"
                  class="d-flex justify-content-end"
                  size="lg"
                  name="some-radios2"
                  value="Mujer"
                  >Mujer</b-form-radio
                >
              </div>
                </ValidationProvider>
            </div>
          </b-form-group>

          <b-form-group id="datos_personales">
            <div class="d-flex flex-wrap justify-content-between">
              <div class="col-lg-5 col-md-6">
                <p for="" class="text-left">* Nombres(s)</p>
                <ValidationProvider rules="required" v-slot="{ valid }">
                  <b-form-input
                    id="nombre"
                    class="pill"
                    :state="!valid && validarForm ? false : null"
                    v-model="form.nombre"
                  ></b-form-input>
                
                </ValidationProvider>
              </div>
              <div class="col-lg-5 col-md-6">
                <ValidationProvider rules="required" v-slot="{  valid }">
                  <p for="" class="text-left">* Apellido Paterno</p>
                  <b-form-input
                    id="apellido_pa"
                    class="pill"
                    v-model="form.apellido_paterno"
                    :state="!valid && validarForm ? false : null"
                    type="text"
                  ></b-form-input>
                  
                </ValidationProvider>
              </div>
            </div>
            <div class="d-flex flex-wrap justify-content-between">
              <div class="col-lg-5 col-md-6">
                <ValidationProvider rules="required" v-slot="{  valid }">
                  <p for="" class="text-left">* Apellido Materno</p>
                  <b-form-input
                    id="apellido_ma"
                    class="pill"
                    v-model="form.apellido_materno"
                    :state="!valid && validarForm ? false : null"
                    type="text"
                  ></b-form-input>
                 
                </ValidationProvider>
              </div>
            </div>
          </b-form-group>

          <b-form-group id="credenciales">
            <div class="d-flex flex-wrap justify-content-between">
              <div class="col-lg-5 col-md-6">
                <ValidationProvider
                  rules="required|email|email_confirmation:@correo_confirm"
                  v-slot="{  valid }"
                >
                  <p for="" class="text-left">* Correo Electronico</p>
                  <b-form-input
                    id="email"
                    class="pill"
                    :state="!valid && validarForm ? false : null"
                    ref="correo"
                    v-model="form.email"
                    type="text"
                  ></b-form-input>
                  
                </ValidationProvider>
              </div>
              <div class="col-lg-5 col-md-6">
                <ValidationProvider
                  name="correo_confirm"
                  rules="required|email"
                  v-slot="{  valid }"
                >
                  <p for="" class="text-left">* Confirmar Correo Electronico</p>
                  <b-form-input
                    ref="correo_confirm"
                    :state="!valid && validarForm ? false : null"
                    id="email_confirmation"
                    class="pill"
                    v-model="form.email_confirmation"
                    type="text"
                  ></b-form-input>
                  
                </ValidationProvider>
              </div>
            </div>
            <div class="d-flex flex-wrap justify-content-between">
              <div class="col-lg-5 col-md-6">
                <ValidationProvider
                  rules="required|password:@password_confirm"
                  v-slot="{  valid }"
                >
                  <p for="" class="text-left">* Contraseña</p>
                  <b-form-input
                    id="password"
                    class="pill"
                    :state="!valid && validarForm ? false : null"
                    v-model="form.password"
                    type="password"
                  ></b-form-input>
                  
                </ValidationProvider>
              </div>
              <div class="col-lg-5 col-md-6">
                <ValidationProvider
                  name="password_confirm"
                  rules="required"
                  v-slot="{  valid }"
                >
                  <p for="" class="text-left">* Repetir Contraseña</p>
                  <b-form-input
                    id="password_confirmation"
                    class="pill"
                    ref="password_confirm"
                    :state="!valid && validarForm ? false : null"
                    v-model="form.password_confirmation"
                    type="password"
                  ></b-form-input>
                 
                </ValidationProvider>
              </div>
            </div>
          </b-form-group>

          <b-form-group id="domicilio">
            <div class="d-flex flex-wrap justify-content-between">
              <div class="col-lg-5 col-md-6">
                <ValidationProvider
                  name="confirm"
                  rules="required"
                  v-slot="{  valid }"
                >
                  <p for="" class="text-left">* Estado</p>
                  <b-form-input
                    id="estado"
                    class="pill"
                    v-model="form.estado"
                    :state="!valid && validarForm ? false : null"
                    type="text"
                  ></b-form-input>
                 
                </ValidationProvider>
              </div>
              <div class="col-lg-5 col-md-6">
                <ValidationProvider
                  name="confirm"
                  rules="required"
                  v-slot="{  valid }"
                >
                  <p for="" class="text-left">* Telefono Celular</p>
                  <b-form-input
                    id="telefono"
                    class="pill"
                    v-model="form.telefono"
                    :state="!valid && validarForm ? false : null"
                    type="text"
                  ></b-form-input>
                 
                </ValidationProvider>
              </div>
            </div>

            <div class="d-flex flex-wrap justify-content-between">
              <div class="col-lg-5 col-md-6">
                <ValidationProvider
                  name="confirm"
                  rules="required"
                  v-slot="{  valid }"
                >
                  <p for="" class="text-left">* Cedula Profesional</p>
                  <b-form-input
                    id="cedula"
                    class="pill"
                    v-model="form.cedula"
                    :state="!valid && validarForm ? false : null"
                    type="text"
                  ></b-form-input>
                
                </ValidationProvider>
              </div>
              <div class="col-lg-5 col-md-6">
                <ValidationProvider
                  name="confirm"
                  rules="required"
                  v-slot="{  valid }"
                >
                  <p for="" class="text-left">* Especialidad</p>
                  <b-form-select
                  v-model="form.especialidad"
                  :options="categorias"
                  :state="!valid && validarForm ? false : null"
                  class="pill"
                  ></b-form-select>
                </ValidationProvider>
              </div>
            </div>
          </b-form-group>

          <b-form-group id="consulta">
            <div class="d-flex flex-wrap justify-content-between">
              <div class="col-lg-5 col-md-8 mt-1">
                <ValidationProvider
                  name="confirm"
                  rules="required"
                  v-slot="{  valid }"
                >
                <p for="" class="text-left">* Tipo Consulta médica</p>
                <div class="d-flex flex-wrap justify-content-between">
                  <b-form-radio
                    v-model="form.tipo_consulta"
                    :state="!valid && validarForm ? false : null"
                    class="mr-2 vertical-radio"
                    size="lg"
                    name="some-radios"
                    value="publica"
                    >Pública</b-form-radio
                  >
                  <b-form-radio
                    v-model="form.tipo_consulta"
                    class="mr-2 vertical-radio"
                    :inline="true"
                    size="lg"
                    name="some-radios"
                    value="privada"
                    >Privada</b-form-radio
                  >
                  <b-form-radio
                    v-model="form.tipo_consulta"
                    class="mr-2 vertical-radio"
                    size="lg"
                    name="some-radios"
                    value="mixta"
                    >Mixta</b-form-radio
                  >
                </div>
                
                </ValidationProvider>
              </div>
              <div class="col-lg-5 col-md-4">
                <ValidationProvider
                  name="confirm"
                  rules="required"
                  v-slot="{  valid }"
                >
                  <p for="" class="text-left">* Institución</p>
                  <b-form-input
                    id="institucion"
                    class="pill"
                    v-model="form.institucion"
                    :state="!valid && validarForm ? false : null"
                    type="text"
                  ></b-form-input>
                  
                </ValidationProvider>
              </div>
            </div>
          </b-form-group>
          <b-form-group id="avisos" v-if="titulo == 'Registro'">
            <div class="d-flex justify-content-start">
              <b-form-checkbox
                id="aviso_privacidad"
                size="lg"
                v-model="aviso_privacidad"
                name="checkbox-1"
                value="accepted"
                unchecked-value="not_accepted"
              >
                He leído y acepto el
                <nuxt-link to="">aviso de privacidad</nuxt-link>
              </b-form-checkbox>
            </div>
            <div class="d-flex justify-content-start">
              <b-form-checkbox
                id="terminos_uso"
                size="lg"
                v-model="terminos_uso"
                name="checkbox-1"
                value="accepted"
                unchecked-value="not_accepted"
              >
                He leído y acepto los
                <nuxt-link to="">términos de uso</nuxt-link>
              </b-form-checkbox>
            </div>
            <div class="d-flex justify-content-start">
              <b-form-checkbox
                id="aviso_compliance"
                size="lg"
                v-model="aviso_compliance"
                name="checkbox-1"
                value="accepted"
                unchecked-value="not_accepted"
              >
                He leído y acepto el
                <nuxt-link to="">aviso de compliance</nuxt-link>
              </b-form-checkbox>
            </div>
          </b-form-group>
          <b-row align-h="between" class="mx-0">
            <b-col md="5"></b-col>
            <b-col md="5">
              <b-button pill :block="true" type="submit" variant="danger" size="lg" :disabled="!desactivar">Registrar</b-button>
            </b-col>
          </b-row>
        </b-form>
      </ValidationObserver>
    </b-card>
  </div>
</template>


<style scoped>
fieldset{
  margin-bottom: 60px;
}
fieldset div.d-flex{
  margin-bottom: 40px;
}
fieldset div.d-flex:last-child{
  margin-bottom: 0;
}
p, a, label{
  color: #716E6E;
}
p{
  margin-top: 10px;
  margin-bottom: 0;
}
a{
  text-decoration: underline;
}
@media (max-width: 768px) {
  fieldset div.d-flex, fieldset{
    margin-bottom: 0;
  }
}
</style>


<script>
import { ValidationProvider } from "vee-validate";
import { mapActions } from 'vuex';

export default {
  props: {
    titulo: "",
    btn: "",
    categorias:{}
  },
  components: {
    ValidationProvider,
  },
  data() {
    return {
      aviso_privacidad: "not_accepted",
      terminos_uso: "not_accepted",
      aviso_compliance: "not_accepted",
      form: {
        sexo: "",
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        email: "",
        email_confirmation: "",
        password: "",
        password_confirmation: "",
        estado: "",
        telefono: "",
        cedula: "",
        especialidad: null,
        tipo_consulta: "",
        institucion: "",
      },
      validarForm: false,
    };
  },
   async fetch(){
      await this.obtenerCategorias();
    },
  methods: {
    ...mapActions({
      obtenerCategorias:'admin/obtenerCategorias'
    }),
  async  onSubmit(event) {
      event.preventDefault();
      this.validarForm = true;

      const valid = await this.$refs.form.validate();
      if (!valid) return false;

      this.$emit("process", this.form);
      //console.log(this.errors);
    },
  },
  computed:{
    desactivar(){
      return this.aviso_compliance === 'accepted' && this.terminos_uso === 'accepted' && this.aviso_privacidad === 'accepted';
    }
  }
};
</script>

