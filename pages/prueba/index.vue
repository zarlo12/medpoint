<template>
  <div class="cont">
    <header></header>
    <div class="elementos"></div>
    <div class="elementos"></div>
    <Observer @intersect="segunda">
      <b-container id="video-banner" class="section-wrap bg-gray">
        <video autoplay muted loop id="myVideo">
          <source src="../../assets/videos/medPoint_20210414.mp4" type="video/mp4">
        </video>
      </b-container>
    </Observer>
    <div class="elementos"></div>
    <div class="elementos"></div>
    <div class="elementos"></div>
    <Observer @intersect="intersected">
      <div class="elementos2">dddssd</div>
    </Observer>
    <div class="elementos">sdssdsd</div>
  </div>
</template>
<script>
export default {
  methods: {
    intersected() {
      console.log("interceptado");
    },
    segunda() {
      console.log("inter");
    },
  },
};
</script>
<style scoped>
header {
  height: 900px;
  display: block;
  width: 100%;
  background-color: red;
}
.cont {
  display: flex;
  flex-wrap: wrap;
}
.elementos {
  display: block;
  width: 100%;
  margin: 2rem auto;
  height: 400px;
  background-color: aqua;
}
.elementos2 {
  display: block;
  width: 100%;
  margin: 2rem auto;
  height: 400px;
  background-color: rebeccapurple !important;
}
</style>