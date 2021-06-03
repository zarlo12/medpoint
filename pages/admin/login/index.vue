<template>
  <div>
    <b-container class="inside area-details bg-gray">
      <h2 class="text-center">Inicio de sesión administrador</h2>
      <Login v-on:process="login($event)" :isAdmin="true" />
    </b-container>
    
  </div>
</template>

<style scoped>
.container.inside h2{
  letter-spacing: 0.3rem;
  min-height: auto;
}
</style>

<script>
import { mapActions, mapState } from "vuex";
export default {
  methods: {
    ...mapActions({
      ingreso: "auth/ingresarUsuario",
    }),
    async login(user) {
      //console.log(user);
      await this.ingreso(user);
    },
  },
};
</script>