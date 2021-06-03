<template>
  <div>
    <b-form-group>
      <input type="checkbox" v-model="select" @change="enviarDatos" />
    </b-form-group>
  </div>
</template>

<script>
export default {
  props:['user','selectedAll','eliminarU'],
  data(){
    return{
      datos_user:{},
      select:false
    }
  },
  computed:{
    usuario(){
      this.datos_user = this.user;
      return this.datos_user;
    },
  },
  mounted(){
    this.datos_user = this.user
  },
  methods:{
    enviarDatos(){
      let usuario = {
        id:this.user.uid,
        selected:this.select
      }
      this.$emit('datos', usuario);
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
    eliminarU:function(){
      this.select = false;
    }
  }
}
</script>