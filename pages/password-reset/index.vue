<template>
  <div>
    <b-container class="inside area-details bg-gray">
      <h2 class="text-center">Restablecer contraseña</h2>
      <div class="col-lg-4 col-md-8 col-sm-12 mx-auto mt-4">
        <b-form @submit="send">
          <p for="text">Correo</p>
          <b-form-input
            type="email"
            class="pill"
            v-model="email"
            id="reset_password"
          ></b-form-input>
          <b-button pill block size="lg" type="submit" class="mt-3" variant="danger">Enviar</b-button>
        </b-form>
      </div>
    </b-container>
  </div>
</template>

<style scoped>
.container.inside h2{
  letter-spacing: 0.3rem;
  min-height: auto;
}
p{
  color: #716E6E;
  margin-bottom: 0;
}
</style>

<script>
import {mapActions} from 'vuex';
export default {
    data(){
        return {
            email:''
        }
    },
    methods:{
        ...mapActions({
            sendReset:'auth/recuperarPassword'
        }),
    async send(event){
        event.preventDefault();   
        await this.sendReset(this.email);
    }
    },
};
</script>