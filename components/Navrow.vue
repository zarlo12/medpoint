<template>
  <div>
    <b-container class="right-nav">
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="7.5" cy="7.5" r="7.5" fill="#FF0000"/>
      </svg>
      <svg width="2" height="240" viewBox="0 0 2 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.00001 240L1 0" stroke="#FF0000"/>
      </svg>
      <ul>
        <li v-for="(item, index) in seccion" :key="index" class="sections displayed">
          <a :href="`#${item.idSection}`">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="7.5" cy="7.5" r="7.5" fill="#FF0000"/>
            </svg>
            <p class="name-section text-dark">{{item.nombre}}</p>
          </a>
        </li>
        <li id="next-section" class=" displayed">
          <a href="">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle class="st0" cx="20" cy="20" r="19.5" fill="#FF0000" stroke="#FF0000"/>
              <path class="st1" d="M19.5,24.9l-8.8-8.8c-0.3-0.3-0.3-0.8,0-1c0.3-0.3,0.8-0.3,1,0l8.3,8.3l8.3-8.3c0.3-0.3,0.8-0.3,1,0
                c0.1,0.1,0.2,0.3,0.2,0.5s-0.1,0.4-0.2,0.5l-8.8,8.8c-0.1,0.1-0.3,0.2-0.5,0.2C19.8,25.2,19.6,25.1,19.5,24.9z" fill="white"/>
            </svg>
          </a>
        </li>
      </ul>
      
    </b-container>
  </div>
</template>

<script>
export default {
    props:['seccion'],
  data() {
    return { 
      lista: [
        { texto: "hsadhlashjdkdas" },
        { texto: "hsadhlashjdkdas" },
        { texto: "hsadhlashjdkdas" },
        { texto: "hsadhlashjdkdas" },
        { texto: "hsadhlashjdkdas" },
      ],
      color1:'rojo',
      color2:false,
      element:null
    };
  },
};
</script>
