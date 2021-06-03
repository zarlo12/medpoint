<template>
  <div>
    <h2 style="position:relative;top:200px;">Hola {{admin.nombre}}</h2>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  async created(){
    setTimeout(() => {
      if(!this.isAdmin){
      this.$router.push('/')
      }
    }, 2000);
  },
  data() {
    return {};
  },
  methods: {

  },
  computed:{
    ...mapState({
      admin: state => state.auth.admin,
      isAdmin:state =>state.auth.isAdmin
    })
  }
};
</script>
