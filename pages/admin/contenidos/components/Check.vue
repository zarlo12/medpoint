<template>
  <div>
    <b-form-group>
      <input type="checkbox" v-model="select" @change="enviarDatos" />
    </b-form-group>
  </div>
</template>

<script>
export default {
  props:['selectedAll','eliminarC','contenido'],
  data(){
    return{
      datos_contenido:{},
      select:false
    }
  },
  computed:{
   
  },
  mounted(){
    this.datos_contenido = this.contenido
  },
  methods:{
    enviarDatos(){
      console.log(this.contenido)
      let contenido = {
        id:this.contenido.uid,
        selected:this.select
      }
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