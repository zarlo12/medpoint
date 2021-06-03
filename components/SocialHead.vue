<template>
  <b-dropdown variant="transparent" class="text-white">
    <template #button-content>
      <b-icon icon="share" aria-hidden="true"></b-icon>
    </template>
    <b-dropdown-item-button @click="sharedFB(contenido)">
      <b-icon icon="facebook" aria-hidden="true"></b-icon>
      Facebook <span class="sr-only"></span>
    </b-dropdown-item-button>
    <b-dropdown-item-button @click="sharedTW(contenido)">
      <b-icon icon="twitter" aria-hidden="true"></b-icon>
      Twitter <span class="sr-only"></span>
    </b-dropdown-item-button>
    <b-dropdown-item-button @click="copyLink(contenido)">
      <b-icon icon="paperclip" aria-hidden="true"></b-icon>
      Copiar link <span class="sr-only"></span>
    </b-dropdown-item-button>
  </b-dropdown>
</template>
<script>
import { CONTENIDO } from '~/constants';
// Test on: https://cards-dev.twitter.com/validator
// Test on: https://developers.facebook.com/tools/debug/
export default {
  props: {
    title: {
      type: String,
      default: "Medpoint",
    },
    image: {
      type: String,
      required: true,
    },
    contenido:CONTENIDO
  },

  head() {
    return {
      meta: [
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.title,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.image,
        },
        {
          hid: "og:image:secure_url",
          property: "og:image:secure_url",
          content: this.image,
        },
        {
          hid: "og:image:alt",
          property: "og:image:alt",
          content: this.title,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.contenido.titulo
        }
      ],
    };
  },
  methods: {
    sharedFB() {
      console.log(document.URL, "url vato");
      let url = document.URL;
      url = encodeURIComponent(url);
      window.open(`http://www.facebook.com/share.php?u=${url}`, "_blank");
    },
    sharedTW() {
      let url = document.URL;
      url = encodeURIComponent(url);
      let titulo = document.title;
      titulo = encodeURIComponent(titulo);
      window.open(
        `https://twitter.com/intent/tweet?text=${titulo}&url=${url}`,
        "_blank"
      );
    },
    copyLink() {
      let aux = document.createElement("input");
      aux.setAttribute("value", document.URL);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
    },
  },
};
</script>
