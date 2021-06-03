<template>
  <div :style="{ transform: `translate3d(0, ${offset}px, 0)`, transition: `all 2.5s cubic-bezier(0, 0, 0.28, 1.01) 0s`}" class="ParallaxElement">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'ParallaxElement',
  inject: ['parallaxContainer'],
  props: {
    factor: {
      default: 0.25,
      type: Number,
    },
  },
  computed: {
    offset() {
      const { height, scrollFactor } = this.parallaxContainer;
      // The offset is relative to the height of
      // the element. This means, if the factor is
      // 0.5, the element is moved half its height
      // over the full scroll distance of the viewport.
      return scrollFactor * height * this.factor * 3;
    },
  },
};
</script>