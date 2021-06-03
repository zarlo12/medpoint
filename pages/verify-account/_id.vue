<template>
   <div class="container">
       <h2>Tu cuenta ha sido activada puedes iniciar sesion</h2>
   </div>
</template>

<script>
import { mapActions,mapState } from 'vuex'
export default {
    methods:{
        ...mapActions({
            verifiedAccount:"auth/verifiedAccount",
            cargarUsuario:"auth/cargarUsuario",
            cargarLocal:'auth/cargarLocalStorage'
        }),
    },
    computed:{
        ...mapState({
            logged:state=>state.auth.logged
        })
    },
   async created(){
        await this.verifiedAccount(this.$route.params.id)
        //
        if(this.logged){
            await this.cargarUsuario(this.$route.params.id)
            await this.cargarLocal();
           setTimeout(() => {
                this.$router.push('/home')
           }, 2000);
        }else{
             setTimeout(() => {
                this.$router.push('/')
           }, 2000);
        }
    }
}
</script>
<style scoped>
.container{
    position: relative;
    top: 250px;
    margin: 0 auto;
    width: 200px;
    height: 200px;
}
</style>