<template>
  <b-container class="inside area-details bg-gray">
    <Navrow />
    <Auth titulo="Registro" v-on:process="register($event)" :categorias="especialidades" />
  </b-container>
</template>


<script>
import {mapActions, mapState} from 'vuex';

  export default {
    data(){
        return{
          
        }
    },
    async fetch(){
      await this.obtenerCategorias();
    },
    methods:{
      ...mapActions({
        registro:"auth/register",
        obtenerCategorias:'admin/obtenerCategorias'
      }),
  async register(user){
       await this.registro(user);
      }
    },
    computed:{
      ...mapState({
        categorias:state => state.admin.categorias
      }),
      especialidades(){
        let especialidades = [{value: null, text: "Selecciona", disabled: true }]
        this.categorias.filter(item =>{
          especialidades.push({ value: item.uid, text: item.nombre })
        })
        return especialidades;
      }
    }
  }
</script>


<style scoped>
.container.inside{
  padding: 140px 12vw 100px 5vw;
}
.container {
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  text-align: center;
}
@media (max-width:768px){
  .container.inside{
    padding: 140px 5vw 100px;
  }
}
</style>