<template>
  <div class="contenedor">
    <Navrow :seccion="secciones"/>
    <Observer @intersect="intersected">
      <div class="elementos2" id="asda">dddssd</div>
    </Observer>
    <Observer @intersect="segunda">
      <div class="elementos" id="asd">dddssd</div>
    </Observer>
    <Observer @intersect="segunda">
      <div class="elementos2" id="asde">dddssd</div>
    </Observer>
    <Observer @intersect="segunda">
      <div class="elementos" id="asdq">dddssd</div>
    </Observer>
    <Observer @intersect="segunda">
      <div class="elementos2" id="asdr">dddssd</div>
    </Observer>
  </div>
</template>
<script>
export default {
    data(){
        return{
            seccion:'',
            secciones: [
              {nombre: "asda"},
              {nombre: "asd"},
              {nombre: "asde"},
              {nombre: "asdq"},
              {nombre: "asdr"},
            ],
        }
    },
  methods: {
    intersected() {
      console.log("primera")
      this.seccion = "inicio"
    },
    segunda() {
        console.log("segunda")
       this.seccion = "inicio2"
    },
  },
};
</script>
<style scoped>
.contenedor {
  position: relative;
  top: 80px;
}
.elementos2 {
  display: block;
  width: 100%;
  height: 100vh;
  background-color: lightblue !important;
}
.elementos {
  display: block;
  width: 100%;
  height: 100vh;
  background-color: lightcyan !important;
}
</style>