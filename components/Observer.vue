<template>
  <div class="observer">
    <slot />
  </div>
</template>
<script>
export default {
  props: ["options"],
  data: () => ({
    observer: null,
    nextid: null,
    lastSection: null,
  }),
  mounted() {
    let options = {
      root: document.querySelector('#scrollArea'),
      rootMargin: '10px',
      threshold: 0.51
    }
    this.observer = new IntersectionObserver(([entry]) => {
      if(!entry.target.children[0]) return false;   //agregado por marco
      const id = entry.target.children[0].id;
      if (entry && entry.isIntersecting) {
        if( entry.target.nextSibling != null){
          //console.log(entry.target.nextElementSibling.children[0].id)
          if(!entry.target.nextElementSibling.children[0]) return false;  //agregado por marco
          this.nextid = entry.target.nextElementSibling.children[0].id;
          this.lastSection = false;
        }else{
          this.lastSection = true;
          this.nextid = entry.target.children[0].id;
        }
        document.querySelector(`.right-nav li.sections a[href="#${id}"]`).parentElement.classList.add('active');
        
        document.getElementById("next-section").children[0].setAttribute("href", `#${this.nextid}`);
      }else{
        document.querySelector(`.right-nav li.sections a[href="#${id}"]`).parentElement.classList.remove('active');
      }
    }, options);
    this.observer.observe(this.$el);
  },
  destroyed() {
    this.observer.disconnect();
  },
};
</script>