<template>
  <div>
    <b-form-group>
      <input type="checkbox" v-model="select" @change="enviarDatos" />
    </b-form-group>
  </div>
</template>

<script>
export default {
  props:['selectedAll','eliminarC','categoria'],
  data(){
    return{
      datos_contenido:{},
      select:false
    }
  },
  computed:{
   
  },
  mounted(){
    this.datos_contenido = this.categoria
  },
  methods:{
    enviarDatos(){
      //console.log(this.datos_contenido)
      let contenido = {
        id:this.categoria.uid,
        selected:this.select
      }
      //console.log(contenido)
      this.$emit('datos', contenido);
    }
  },
  watch:{
    selectedAll:function(){
      console.log(this.selectedAll)
      if(this.selectedAll){
        this.select = true;
      }else{
        this.select = false;
      }
    },
    eliminarC:function(){
      this.select = false;
    }
  }
}
</script>