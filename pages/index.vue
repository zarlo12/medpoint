
<template>
  <div>
    <b-container class="rectangle-border"></b-container>

    <Navrow :seccion="secciones" />

    <Observer @intersect="segunda">
      <b-container id="video-banner" class="section-wrap bg-gray px-0">
        <video autoplay muted loop id="myVideo">
          <source src="../assets/videos/medPoint_20210414.mp4" type="video/mp4">
        </video>
      </b-container>
    </Observer>

    <Observer @intersect="intersected">
      <b-container id="areas-terapeuticas" class="section-wrap">
        <b-row align-v="stretch" align-h="center">
          <b-col lg="12" md="12" sm="12">
            <ParallaxContainer>
              <ParallaxElement :factor="0.08" class="" >
                <h2 class="title-section">ÁREAS TERAPÉUTICAS</h2>
              </ParallaxElement>
            </ParallaxContainer>
          </b-col>
          <b-row class="row-inner">
            <b-col lg="3" md="4" sm="6" v-for="(item, index) in categorias" :key="index">
              <ParallaxContainer>
                <router-link :to="`/area/${convertirSlug(item.nombre)}`">
                  <ParallaxElement :factor="0.1" class="" >
                    <b-img-lazy
                      :src="item.imagen.url"
                      fluid
                      alt="Responsive image"
                    ></b-img-lazy>
                  </ParallaxElement>
                  <ParallaxElement :factor="0.11" class="" >
                    <h3 class="title-image">{{ item.nombre }}</h3>
                  </ParallaxElement>
                </router-link>
              </ParallaxContainer>
            </b-col>
          </b-row>
        </b-row>
      </b-container>
    </Observer>
    
    <Observer @intersect="segunda">
      <b-container class="section-wrap bg-gray" id="tendencias" v-if="showTendencia">
        <b-row align-v="stretch" align-h="center">
          <b-col lg="12" md="12" sm="12">
            <ParallaxContainer>
              <ParallaxElement :factor="0.08" class="" >
                <h2 class="title-section">TENDENCIAS</h2>
              </ParallaxElement>
            </ParallaxContainer>
          </b-col>
          <b-col lg="5" md="10" sm="12" align-self="start">
            <b-row
              class="focus-col py-2"
              align-v="stretch"
              @click="mostrarContenido(principal)"
              v-b-toggle="`tendencias`"
            >
              <b-col align-self="stretch">
                <ParallaxContainer>
                  <ParallaxElement :factor="0.05" class="" >
                    <b-img-lazy
                      :src="principal.imagen_small.url"
                      fluid
                      alt="Responsive image"
                    ></b-img-lazy>
                  </ParallaxElement>

                  <b-row align-content="stretch" align-v="center" align-h="between">
                    <b-col lg="8" md="7" sm="12">
                      <ParallaxElement :factor="0.04" class="" >
                        <h3 class="title-image">{{ principal.titulo }}</h3>
                        <h5 class="text-image" v-html="principal.descripcion">
                        </h5>
                      </ParallaxElement>
                    </b-col>
                    <b-col lg="4" md="5" sm="12" class="text-right">
                      <ParallaxElement :factor="0.01" class="" >
                        <span class="like">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.9549 6.80114C11.8518 6.51179 11.6267 6.2824 11.3393 6.17398C11.5791 5.91112 11.6616 5.5408 11.5559 5.20104C11.4021 4.78702 11.0109 4.50906 10.5693 4.50009H7.27695L7.28134 4.48709C7.49231 3.855 7.59975 3.19297 7.59952 2.52661V1.90025C7.59865 1.12747 6.97239 0.501211 6.19961 0.500336H5.79964C5.46828 0.500336 5.19968 0.768944 5.19968 1.1003V2.30022C5.1975 3.65721 4.15272 4.78462 2.79982 4.88986V4.10011C2.79982 3.98967 2.71028 3.90012 2.59984 3.90012H0.199988C0.0895444 3.90012 0 3.98967 0 4.10011V11.2997C0 11.4101 0.0895444 11.4996 0.199988 11.4996H2.59984C2.71028 11.4996 2.79982 11.4101 2.79982 11.2997V10.6237L3.08841 10.7687C3.78461 11.117 4.55222 11.2987 5.33067 11.2997H9.79939C10.3516 11.2992 10.799 10.8512 10.7986 10.299C10.7984 10.0552 10.7092 9.81995 10.5477 9.63737C10.6827 9.58649 10.8053 9.5077 10.9077 9.40618C11.2588 9.05408 11.2978 8.49751 10.9993 8.09986C11.265 8.09971 11.5198 7.99412 11.7077 7.80628C11.97 7.54292 12.0651 7.1561 11.9549 6.80114ZM2.39985 11.0997H0.399975V4.3001H2.39985V11.0997ZM11.1852 7.67084C11.1251 7.69024 11.0624 7.70004 10.9993 7.69986H10.1994H9.39941C9.28897 7.69986 9.19942 7.78941 9.19942 7.89985C9.19942 8.01029 9.28897 8.09984 9.39941 8.09984H10.1994C10.5307 8.09984 10.7993 8.36844 10.7993 8.6998C10.7993 9.03115 10.5307 9.29976 10.1994 9.29976H8.99944C8.88899 9.29976 8.79945 9.38931 8.79945 9.49975C8.79945 9.61019 8.88899 9.69974 8.99944 9.69974H9.79939C10.1307 9.69974 10.3994 9.96835 10.3994 10.2997C10.3994 10.6311 10.1307 10.8997 9.79939 10.8997H5.33067C4.61451 10.8988 3.90836 10.7316 3.2678 10.4113L2.79982 10.1763V5.29344C4.3745 5.18617 5.59763 3.87855 5.59965 2.30022V1.1003C5.59965 0.989855 5.68919 0.900311 5.79964 0.900311H6.19961C6.75158 0.900961 7.1989 1.34828 7.19955 1.90025V2.52661C7.1998 3.14995 7.09931 3.76923 6.90197 4.36049L6.80977 4.63688C6.77488 4.74167 6.83152 4.85491 6.93632 4.88981C6.95672 4.89661 6.97806 4.90006 6.99956 4.90006H10.5693C10.8338 4.90986 11.0687 5.07188 11.1717 5.31564C11.2735 5.63094 11.1005 5.96912 10.7852 6.07096C10.7252 6.09036 10.6624 6.10016 10.5993 6.09999H9.5994C9.48896 6.09999 9.39941 6.18953 9.39941 6.29997C9.39941 6.41042 9.48896 6.49996 9.5994 6.49996H10.9693C11.2338 6.50976 11.4686 6.67178 11.5717 6.91554C11.6735 7.23084 11.5005 7.56902 11.1852 7.67084Z"
                              fill="#333333"
                            />
                            <path
                              d="M1.39989 9.69977C1.06853 9.69977 0.799927 9.96838 0.799927 10.2997C0.799927 10.6311 1.06853 10.8997 1.39989 10.8997C1.73124 10.8997 1.99985 10.6311 1.99985 10.2997C1.99985 9.96838 1.73124 9.69977 1.39989 9.69977ZM1.39989 10.4997C1.28945 10.4997 1.1999 10.4102 1.1999 10.2997C1.1999 10.1893 1.28945 10.0997 1.39989 10.0997C1.51033 10.0997 1.59988 10.1893 1.59988 10.2997C1.59988 10.4102 1.51033 10.4997 1.39989 10.4997Z"
                              fill="#333333"
                            />
                          </svg>
                          <span>22</span>
                        </span>

                        <span class="time-read">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0)">
                              <path
                                d="M11.25 4.5H0.75C0.3365 4.5 0 4.1635 0 3.75V0.75C0 0.3365 0.3365 0 0.75 0H11.25C11.6635 0 12 0.3365 12 0.75V3.75C12 4.1635 11.6635 4.5 11.25 4.5ZM0.75 0.5C0.6125 0.5 0.5 0.612 0.5 0.75V3.75C0.5 3.888 0.6125 4 0.75 4H11.25C11.3875 4 11.5 3.888 11.5 3.75V0.75C11.5 0.612 11.3875 0.5 11.25 0.5H0.75Z"
                                fill="#333333"
                              />
                              <path
                                d="M4.75 9H0.75C0.3365 9 0 8.6635 0 8.25V6.25C0 5.8365 0.3365 5.5 0.75 5.5H4.75C5.1635 5.5 5.5 5.8365 5.5 6.25V8.25C5.5 8.6635 5.1635 9 4.75 9ZM0.75 6C0.6125 6 0.5 6.112 0.5 6.25V8.25C0.5 8.388 0.6125 8.5 0.75 8.5H4.75C4.8875 8.5 5 8.388 5 8.25V6.25C5 6.112 4.8875 6 4.75 6H0.75Z"
                                fill="#333333"
                              />
                              <path
                                d="M11.7498 6H6.74976C6.61176 6 6.49976 5.888 6.49976 5.75C6.49976 5.612 6.61176 5.5 6.74976 5.5H11.7498C11.8878 5.5 11.9998 5.612 11.9998 5.75C11.9998 5.888 11.8878 6 11.7498 6Z"
                                fill="#333333"
                              />
                              <path
                                d="M11.7498 7.5H6.74976C6.61176 7.5 6.49976 7.388 6.49976 7.25C6.49976 7.112 6.61176 7 6.74976 7H11.7498C11.8878 7 11.9998 7.112 11.9998 7.25C11.9998 7.388 11.8878 7.5 11.7498 7.5Z"
                                fill="#333333"
                              />
                              <path
                                d="M11.7498 9H6.74976C6.61176 9 6.49976 8.888 6.49976 8.75C6.49976 8.612 6.61176 8.5 6.74976 8.5H11.7498C11.8878 8.5 11.9998 8.612 11.9998 8.75C11.9998 8.888 11.8878 9 11.7498 9Z"
                                fill="#333333"
                              />
                              <path
                                d="M11.75 10.5H0.25C0.112 10.5 0 10.388 0 10.25C0 10.112 0.112 10 0.25 10H11.75C11.888 10 12 10.112 12 10.25C12 10.388 11.888 10.5 11.75 10.5Z"
                                fill="#333333"
                              />
                              <path
                                d="M11.75 12H0.25C0.112 12 0 11.888 0 11.75C0 11.612 0.112 11.5 0.25 11.5H11.75C11.888 11.5 12 11.612 12 11.75C12 11.888 11.888 12 11.75 12Z"
                                fill="#333333"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0">
                                <rect width="12" height="12" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <span>13 min</span>
                        </span>
                      </ParallaxElement>
                    </b-col>
                  </b-row>
                </ParallaxContainer>
              </b-col>
            </b-row>
          </b-col>
          <b-col lg="5" md="9" sm="12" align-self="start" class="pt-2">
            <b-row class="posible-col pb-2">
              <b-col lg="6" md="6" sm="12" v-for="(item, index) in tendencias" :key="index" >
                <ParallaxContainer>
                  <div @click="mostrarContenido(item)" v-b-toggle="`tendencias`">
                    <ParallaxElement :factor="0.09" class="">
                      <b-img-lazy
                        :src="item.imagen_small.url"
                        fluid
                        alt="Responsive image"
                      ></b-img-lazy>
                    </ParallaxElement>
                  </div>
                  <ParallaxElement :factor="0.09" class="">
                    <h3 class="title-image">
                      {{ nombreCategoria(item.area_terapeutica, categorias) }}
                    </h3>
                  </ParallaxElement>
                </ParallaxContainer>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <Collapse id="tendencias" :modelo="contenido" />
      </b-container>
    </Observer>

    <Observer @intersect="intersected" v-if="showRecomendado">
      <b-container class="section-wrap" id="recomendado">
        <b-row align-v="stretch" align-h="center">
          <b-col lg="12" md="12" sm="12">
            <ParallaxContainer>
              <ParallaxElement :factor="0.08" class="" >
                <h2 class="title-section">RECOMENDADO</h2>
              </ParallaxElement>
            </ParallaxContainer>
          </b-col>
          <b-col lg="5" md="10" sm="12" align-self="start">
            <b-row class="focus-col py-2" align-v="stretch">
              <b-col align-self="stretch">
                <ParallaxContainer>
                  <div v-b-toggle="`recomendado`" @click="mostrarContenido(principal_recomendado)">
                    <ParallaxElement :factor="0.05" class="" >
                      <b-img-lazy
                        :src="principal_recomendado.imagen_small.url"
                        fluid
                        alt="Responsive image"
                      ></b-img-lazy>
                    </ParallaxElement>
                  </div>

                  <b-row align-content="stretch" align-v="center" align-h="between">
                    <b-col lg="8" md="7" sm="12">
                      <ParallaxElement :factor="0.04" class="" >
                        <h3 class="title-image">
                          {{ principal_recomendado.titulo }}
                        </h3>
                        <h5 class="text-image" v-html="principal_recomendado.descripcion">
                        </h5>
                      </ParallaxElement>
                    </b-col>
                    <b-col lg="3" md="3" sm="6" class="text-right">
                      <ParallaxElement :factor="0.01" class="" >
                        <span class="like">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.9549 6.80114C11.8518 6.51179 11.6267 6.2824 11.3393 6.17398C11.5791 5.91112 11.6616 5.5408 11.5559 5.20104C11.4021 4.78702 11.0109 4.50906 10.5693 4.50009H7.27695L7.28134 4.48709C7.49231 3.855 7.59975 3.19297 7.59952 2.52661V1.90025C7.59865 1.12747 6.97239 0.501211 6.19961 0.500336H5.79964C5.46828 0.500336 5.19968 0.768944 5.19968 1.1003V2.30022C5.1975 3.65721 4.15272 4.78462 2.79982 4.88986V4.10011C2.79982 3.98967 2.71028 3.90012 2.59984 3.90012H0.199988C0.0895444 3.90012 0 3.98967 0 4.10011V11.2997C0 11.4101 0.0895444 11.4996 0.199988 11.4996H2.59984C2.71028 11.4996 2.79982 11.4101 2.79982 11.2997V10.6237L3.08841 10.7687C3.78461 11.117 4.55222 11.2987 5.33067 11.2997H9.79939C10.3516 11.2992 10.799 10.8512 10.7986 10.299C10.7984 10.0552 10.7092 9.81995 10.5477 9.63737C10.6827 9.58649 10.8053 9.5077 10.9077 9.40618C11.2588 9.05408 11.2978 8.49751 10.9993 8.09986C11.265 8.09971 11.5198 7.99412 11.7077 7.80628C11.97 7.54292 12.0651 7.1561 11.9549 6.80114ZM2.39985 11.0997H0.399975V4.3001H2.39985V11.0997ZM11.1852 7.67084C11.1251 7.69024 11.0624 7.70004 10.9993 7.69986H10.1994H9.39941C9.28897 7.69986 9.19942 7.78941 9.19942 7.89985C9.19942 8.01029 9.28897 8.09984 9.39941 8.09984H10.1994C10.5307 8.09984 10.7993 8.36844 10.7993 8.6998C10.7993 9.03115 10.5307 9.29976 10.1994 9.29976H8.99944C8.88899 9.29976 8.79945 9.38931 8.79945 9.49975C8.79945 9.61019 8.88899 9.69974 8.99944 9.69974H9.79939C10.1307 9.69974 10.3994 9.96835 10.3994 10.2997C10.3994 10.6311 10.1307 10.8997 9.79939 10.8997H5.33067C4.61451 10.8988 3.90836 10.7316 3.2678 10.4113L2.79982 10.1763V5.29344C4.3745 5.18617 5.59763 3.87855 5.59965 2.30022V1.1003C5.59965 0.989855 5.68919 0.900311 5.79964 0.900311H6.19961C6.75158 0.900961 7.1989 1.34828 7.19955 1.90025V2.52661C7.1998 3.14995 7.09931 3.76923 6.90197 4.36049L6.80977 4.63688C6.77488 4.74167 6.83152 4.85491 6.93632 4.88981C6.95672 4.89661 6.97806 4.90006 6.99956 4.90006H10.5693C10.8338 4.90986 11.0687 5.07188 11.1717 5.31564C11.2735 5.63094 11.1005 5.96912 10.7852 6.07096C10.7252 6.09036 10.6624 6.10016 10.5993 6.09999H9.5994C9.48896 6.09999 9.39941 6.18953 9.39941 6.29997C9.39941 6.41042 9.48896 6.49996 9.5994 6.49996H10.9693C11.2338 6.50976 11.4686 6.67178 11.5717 6.91554C11.6735 7.23084 11.5005 7.56902 11.1852 7.67084Z"
                              fill="#333333"
                            />
                            <path
                              d="M1.39989 9.69977C1.06853 9.69977 0.799927 9.96838 0.799927 10.2997C0.799927 10.6311 1.06853 10.8997 1.39989 10.8997C1.73124 10.8997 1.99985 10.6311 1.99985 10.2997C1.99985 9.96838 1.73124 9.69977 1.39989 9.69977ZM1.39989 10.4997C1.28945 10.4997 1.1999 10.4102 1.1999 10.2997C1.1999 10.1893 1.28945 10.0997 1.39989 10.0997C1.51033 10.0997 1.59988 10.1893 1.59988 10.2997C1.59988 10.4102 1.51033 10.4997 1.39989 10.4997Z"
                              fill="#333333"
                            />
                          </svg>
                          <span>22</span>
                        </span>

                        <span class="time-read">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0)">
                              <path
                                d="M11.25 4.5H0.75C0.3365 4.5 0 4.1635 0 3.75V0.75C0 0.3365 0.3365 0 0.75 0H11.25C11.6635 0 12 0.3365 12 0.75V3.75C12 4.1635 11.6635 4.5 11.25 4.5ZM0.75 0.5C0.6125 0.5 0.5 0.612 0.5 0.75V3.75C0.5 3.888 0.6125 4 0.75 4H11.25C11.3875 4 11.5 3.888 11.5 3.75V0.75C11.5 0.612 11.3875 0.5 11.25 0.5H0.75Z"
                                fill="#333333"
                              />
                              <path
                                d="M4.75 9H0.75C0.3365 9 0 8.6635 0 8.25V6.25C0 5.8365 0.3365 5.5 0.75 5.5H4.75C5.1635 5.5 5.5 5.8365 5.5 6.25V8.25C5.5 8.6635 5.1635 9 4.75 9ZM0.75 6C0.6125 6 0.5 6.112 0.5 6.25V8.25C0.5 8.388 0.6125 8.5 0.75 8.5H4.75C4.8875 8.5 5 8.388 5 8.25V6.25C5 6.112 4.8875 6 4.75 6H0.75Z"
                                fill="#333333"
                              />
                              <path
                                d="M11.7498 6H6.74976C6.61176 6 6.49976 5.888 6.49976 5.75C6.49976 5.612 6.61176 5.5 6.74976 5.5H11.7498C11.8878 5.5 11.9998 5.612 11.9998 5.75C11.9998 5.888 11.8878 6 11.7498 6Z"
                                fill="#333333"
                              />
                              <path
                                d="M11.7498 7.5H6.74976C6.61176 7.5 6.49976 7.388 6.49976 7.25C6.49976 7.112 6.61176 7 6.74976 7H11.7498C11.8878 7 11.9998 7.112 11.9998 7.25C11.9998 7.388 11.8878 7.5 11.7498 7.5Z"
                                fill="#333333"
                              />
                              <path
                                d="M11.7498 9H6.74976C6.61176 9 6.49976 8.888 6.49976 8.75C6.49976 8.612 6.61176 8.5 6.74976 8.5H11.7498C11.8878 8.5 11.9998 8.612 11.9998 8.75C11.9998 8.888 11.8878 9 11.7498 9Z"
                                fill="#333333"
                              />
                              <path
                                d="M11.75 10.5H0.25C0.112 10.5 0 10.388 0 10.25C0 10.112 0.112 10 0.25 10H11.75C11.888 10 12 10.112 12 10.25C12 10.388 11.888 10.5 11.75 10.5Z"
                                fill="#333333"
                              />
                              <path
                                d="M11.75 12H0.25C0.112 12 0 11.888 0 11.75C0 11.612 0.112 11.5 0.25 11.5H11.75C11.888 11.5 12 11.612 12 11.75C12 11.888 11.888 12 11.75 12Z"
                                fill="#333333"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0">
                                <rect width="12" height="12" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <span>13 min</span>
                        </span>
                      </ParallaxElement>
                    </b-col>
                  </b-row>
                </ParallaxContainer>
              </b-col>
            </b-row>
          </b-col>
          <b-col lg="5" md="9" sm="12" align-self="start" class="pt-2">
            <b-row class="posible-col pb-2">
              <b-col lg="6" md="6" sm="12" v-for="(item, index) in recomendado" :key="index">
                <ParallaxContainer>
                  <div  v-b-toggle="`recomendado`" @click="mostrarContenido(item)">
                    <ParallaxElement :factor="0.09" class="">
                      <b-img-lazy
                        :src="item.imagen_small.url"
                        fluid
                        alt="Responsive image"
                      ></b-img-lazy>
                    </ParallaxElement>
                  </div>
                  <ParallaxElement :factor="0.09" class="">
                    <h3 class="title-image">
                      {{ nombreCategoria(item.area_terapeutica, categorias) }}
                    </h3>
                  </ParallaxElement>
                </ParallaxContainer>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <Collapse id="recomendado" :modelo="contenido" />
      </b-container>
    </Observer>

    <Observer @intersect="segunda">
      <b-container class="section-wrap bg-gray" id="mas-nuevo">
        <b-row align-v="stretch" align-h="center">
          <b-col lg="12" md="12" sm="12">
            <ParallaxContainer>
              <ParallaxElement :factor="0.08" class="" >
                <h2 class="title-section">LO MÁS NUEVO</h2>
              </ParallaxElement>
            </ParallaxContainer>
          </b-col>
          <b-col lg="5" md="10" sm="12" align-self="start">
            <b-row class="focus-col py-2" align-v="stretch" v-b-toggle="`nuevo`" @click="mostrarContenido(principal_nuevo)">
              <b-col align-self="stretch">
                <ParallaxContainer>
                  <ParallaxElement :factor="0.05" class="" >
                    <b-img-lazy
                      :src="principal_nuevo.imagen_small.url"
                      fluid
                      alt="Responsive image"
                    ></b-img-lazy>
                  </ParallaxElement>
                  <b-row align-content="stretch" align-v="center" align-h="between">
                    <b-col lg="8" md="7" sm="12">
                      <ParallaxElement :factor="0.04" class="" >
                        <h3 class="title-image">{{ principal_nuevo.titulo }}</h3>
                        <h5 class="text-image" v-html="principal_nuevo.descripcion">
                         
                        </h5>
                      </ParallaxElement>
                    </b-col>
                    <b-col lg="3" md="3" sm="6" class="text-right">
                      <ParallaxElement :factor="0.01" class="" >
                        <span class="like">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.9549 6.80114C11.8518 6.51179 11.6267 6.2824 11.3393 6.17398C11.5791 5.91112 11.6616 5.5408 11.5559 5.20104C11.4021 4.78702 11.0109 4.50906 10.5693 4.50009H7.27695L7.28134 4.48709C7.49231 3.855 7.59975 3.19297 7.59952 2.52661V1.90025C7.59865 1.12747 6.97239 0.501211 6.19961 0.500336H5.79964C5.46828 0.500336 5.19968 0.768944 5.19968 1.1003V2.30022C5.1975 3.65721 4.15272 4.78462 2.79982 4.88986V4.10011C2.79982 3.98967 2.71028 3.90012 2.59984 3.90012H0.199988C0.0895444 3.90012 0 3.98967 0 4.10011V11.2997C0 11.4101 0.0895444 11.4996 0.199988 11.4996H2.59984C2.71028 11.4996 2.79982 11.4101 2.79982 11.2997V10.6237L3.08841 10.7687C3.78461 11.117 4.55222 11.2987 5.33067 11.2997H9.79939C10.3516 11.2992 10.799 10.8512 10.7986 10.299C10.7984 10.0552 10.7092 9.81995 10.5477 9.63737C10.6827 9.58649 10.8053 9.5077 10.9077 9.40618C11.2588 9.05408 11.2978 8.49751 10.9993 8.09986C11.265 8.09971 11.5198 7.99412 11.7077 7.80628C11.97 7.54292 12.0651 7.1561 11.9549 6.80114ZM2.39985 11.0997H0.399975V4.3001H2.39985V11.0997ZM11.1852 7.67084C11.1251 7.69024 11.0624 7.70004 10.9993 7.69986H10.1994H9.39941C9.28897 7.69986 9.19942 7.78941 9.19942 7.89985C9.19942 8.01029 9.28897 8.09984 9.39941 8.09984H10.1994C10.5307 8.09984 10.7993 8.36844 10.7993 8.6998C10.7993 9.03115 10.5307 9.29976 10.1994 9.29976H8.99944C8.88899 9.29976 8.79945 9.38931 8.79945 9.49975C8.79945 9.61019 8.88899 9.69974 8.99944 9.69974H9.79939C10.1307 9.69974 10.3994 9.96835 10.3994 10.2997C10.3994 10.6311 10.1307 10.8997 9.79939 10.8997H5.33067C4.61451 10.8988 3.90836 10.7316 3.2678 10.4113L2.79982 10.1763V5.29344C4.3745 5.18617 5.59763 3.87855 5.59965 2.30022V1.1003C5.59965 0.989855 5.68919 0.900311 5.79964 0.900311H6.19961C6.75158 0.900961 7.1989 1.34828 7.19955 1.90025V2.52661C7.1998 3.14995 7.09931 3.76923 6.90197 4.36049L6.80977 4.63688C6.77488 4.74167 6.83152 4.85491 6.93632 4.88981C6.95672 4.89661 6.97806 4.90006 6.99956 4.90006H10.5693C10.8338 4.90986 11.0687 5.07188 11.1717 5.31564C11.2735 5.63094 11.1005 5.96912 10.7852 6.07096C10.7252 6.09036 10.6624 6.10016 10.5993 6.09999H9.5994C9.48896 6.09999 9.39941 6.18953 9.39941 6.29997C9.39941 6.41042 9.48896 6.49996 9.5994 6.49996H10.9693C11.2338 6.50976 11.4686 6.67178 11.5717 6.91554C11.6735 7.23084 11.5005 7.56902 11.1852 7.67084Z"
                              fill="#333333"
                            />
                            <path
                              d="M1.39989 9.69977C1.06853 9.69977 0.799927 9.96838 0.799927 10.2997C0.799927 10.6311 1.06853 10.8997 1.39989 10.8997C1.73124 10.8997 1.99985 10.6311 1.99985 10.2997C1.99985 9.96838 1.73124 9.69977 1.39989 9.69977ZM1.39989 10.4997C1.28945 10.4997 1.1999 10.4102 1.1999 10.2997C1.1999 10.1893 1.28945 10.0997 1.39989 10.0997C1.51033 10.0997 1.59988 10.1893 1.59988 10.2997C1.59988 10.4102 1.51033 10.4997 1.39989 10.4997Z"
                              fill="#333333"
                            />
                          </svg>
                          <span>22</span>
                        </span>

                        <span class="time-read">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0)">
                              <path
                                d="M11.25 4.5H0.75C0.3365 4.5 0 4.1635 0 3.75V0.75C0 0.3365 0.3365 0 0.75 0H11.25C11.6635 0 12 0.3365 12 0.75V3.75C12 4.1635 11.6635 4.5 11.25 4.5ZM0.75 0.5C0.6125 0.5 0.5 0.612 0.5 0.75V3.75C0.5 3.888 0.6125 4 0.75 4H11.25C11.3875 4 11.5 3.888 11.5 3.75V0.75C11.5 0.612 11.3875 0.5 11.25 0.5H0.75Z"
                                fill="#333333"
                              />
                              <path
                                d="M4.75 9H0.75C0.3365 9 0 8.6635 0 8.25V6.25C0 5.8365 0.3365 5.5 0.75 5.5H4.75C5.1635 5.5 5.5 5.8365 5.5 6.25V8.25C5.5 8.6635 5.1635 9 4.75 9ZM0.75 6C0.6125 6 0.5 6.112 0.5 6.25V8.25C0.5 8.388 0.6125 8.5 0.75 8.5H4.75C4.8875 8.5 5 8.388 5 8.25V6.25C5 6.112 4.8875 6 4.75 6H0.75Z"
                                fill="#333333"
                              />
                              <path
                                d="M11.7498 6H6.74976C6.61176 6 6.49976 5.888 6.49976 5.75C6.49976 5.612 6.61176 5.5 6.74976 5.5H11.7498C11.8878 5.5 11.9998 5.612 11.9998 5.75C11.9998 5.888 11.8878 6 11.7498 6Z"
                                fill="#333333"
                              />
                              <path
                                d="M11.7498 7.5H6.74976C6.61176 7.5 6.49976 7.388 6.49976 7.25C6.49976 7.112 6.61176 7 6.74976 7H11.7498C11.8878 7 11.9998 7.112 11.9998 7.25C11.9998 7.388 11.8878 7.5 11.7498 7.5Z"
                                fill="#333333"
                              />
                              <path
                                d="M11.7498 9H6.74976C6.61176 9 6.49976 8.888 6.49976 8.75C6.49976 8.612 6.61176 8.5 6.74976 8.5H11.7498C11.8878 8.5 11.9998 8.612 11.9998 8.75C11.9998 8.888 11.8878 9 11.7498 9Z"
                                fill="#333333"
                              />
                              <path
                                d="M11.75 10.5H0.25C0.112 10.5 0 10.388 0 10.25C0 10.112 0.112 10 0.25 10H11.75C11.888 10 12 10.112 12 10.25C12 10.388 11.888 10.5 11.75 10.5Z"
                                fill="#333333"
                              />
                              <path
                                d="M11.75 12H0.25C0.112 12 0 11.888 0 11.75C0 11.612 0.112 11.5 0.25 11.5H11.75C11.888 11.5 12 11.612 12 11.75C12 11.888 11.888 12 11.75 12Z"
                                fill="#333333"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0">
                                <rect width="12" height="12" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <span>13 min</span>
                        </span>
                      </ParallaxElement>
                    </b-col>
                  </b-row>
                </ParallaxContainer>
              </b-col>
            </b-row>
          </b-col>
          <b-col lg="5" md="9" sm="12" align-self="start" class="pt-2">
            <b-row class="posible-col pb-2">
              <b-col lg="6" md="6" sm="12" v-for="(item, index) in contenido_nuevo" :key="index">
                <ParallaxContainer>
                  <div  v-b-toggle="`nuevo`" @click="mostrarContenido(item)">
                    <ParallaxElement :factor="0.09" class="">
                      <b-img-lazy
                      :src="item.imagen_small.url"
                      fluid
                      alt="Responsive image"
                      ></b-img-lazy>
                      </ParallaxElement>
                  </div>
                  <ParallaxElement :factor="0.09" class="">
                    <h3 class="title-image">
                      {{ nombreCategoria(item.area_terapeutica, categorias) }}
                    </h3>
                  </ParallaxElement>
                </ParallaxContainer>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <Collapse id="nuevo" :modelo="contenido" />
      </b-container>
    </Observer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { CATEGORIA, CONTENIDO } from "~/constants";
import { nombreCategoria, convertirSlug } from "~/helpers";
import ParallaxContainer from '~/components/ParallaxContainer.vue';
import ParallaxElement from '~/components/ParallaElement.vue';
export default {
  data() {
    return {
      id: "",
      categorys: [],
      tendencias: [],
      recomendado: [],
      contenido_nuevo: [],
      showRecomendado: false,
      showTendencia:false,
      array1: [],
      array2: [],
      visitas: [],
      principal: CONTENIDO,
      categoria: CATEGORIA,
      contenido: CONTENIDO,
      principal_recomendado: CONTENIDO,
      principal_nuevo: CONTENIDO,
      filter_etiquetas: [],
      filter_categorias: [],
      secciones: [
        {idSection: "video-banner", nombre: "Inicio"},
        {idSection: "areas-terapeuticas", nombre: "Areas Terapeuticas"},
        {idSection: "tendencias", nombre: "Tendencias"},
        {idSection: "recomendado", nombre: "Recomendados"},
        {idSection: "mas-nuevo", nombre: "Lo Más Nuevo"},
      ],
    };
  },
  components: {
    ParallaxContainer,
    ParallaxElement,
  },
  methods: {
    convertirSlug,
    intersected() {
      console.log("interceptado");
    },
    segunda() {
      console.log("inter");
    },
    ...mapActions({
      cargarLocal: "auth/cargarLocalStorage",
      obtenerContenidos: "contenido/obtenerContenidos",
      obtenerCategorias: "admin/obtenerCategorias",
    }),
    shuffle(array) {
     //console.log(array);
      let j, x, i;
      for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
      }
    },
    nombreCategoria,
    mostrarContenido(item) {
      this.id = item.uid;
      //console.log("id", this.id);
      this.contenido = item;
    },
  },
  computed: {
    ...mapState({
      categorias: (state) => state.admin.categorias,
      logged: (state) => state.auth.logged,
      usuario: (state) => state.auth.usuario,
      contenidos: (state) => state.contenido.contenidos,
      isAdmin: (state) => state.auth.isAdmin,
    }),
    nombre_categoria() {
      let nombre = this.categoria.nombre;
      return nombre;
    },
  },
  async created() {
    console.log(this.secciones);
    await this.cargarLocal();
    await this.obtenerCategorias();
    await this.obtenerContenidos();

    //cambiar orden de array
    this.shuffle(this.contenidos);
    //verificar sesion
    let max;
    if (this.logged && !this.isAdmin) {
      this.showTendencia = true;
      this.showRecomendado = true;
      document.querySelector(`.right-nav li.sections a[href="#recomendado"]`).parentElement.classList.add('logged');
      this.tendencias = this.contenidos.filter(
        (item) => item.area_terapeutica == this.usuario.especialidad
      );
      this.tendencias = this.tendencias
        .sort(function (a, b) {
          return b - a;
        })
        .slice(0, 4);

      this.tendencias.filter((item) => {
        this.visitas.push(item.visitas);
      });
      max = Math.max(...this.visitas);
      //console.log(max)
      //console.log(this.contenidos);

      this.principal = this.contenidos.find(
        (item) =>
          item.area_terapeutica == this.usuario.especialidad &&
          item.visitas == max
      );
      //console.log(this.principal);
      this.categoria = this.categorias.find(
        (item) => item.uid == this.principal.area_terapeutica
      );

      this.recomendado = this.contenidos.filter(item => item.area_terapeutica ==  this.usuario.especialidad);
      this.principal_recomendado = this.recomendado[0];
      this.recomendado = this.recomendado.slice(1,4)
     
      //Si el usuario ya visito algun contenido
      if (
        this.usuario.visitas.etiquetas.length > 0 &&
        this.usuario.visitas.categorias.length > 0
      ) {
        
        //RECOMENDADO
        const filter_recomendado1 = (busqueda) => {
          return this.contenidos.filter(
            (elemento) => elemento.etiquetas.toString().indexOf(busqueda) > -1
          );
        };

        const filter_recomendado2 = (busqueda) => {
          return this.contenidos.find(
            (elemento) =>
              elemento.area_terapeutica.toString().indexOf(busqueda) > -1
          );
        };

        this.usuario.visitas.etiquetas.forEach((item) => {
          this.filter_etiquetas = this.filter_etiquetas.concat(filter_recomendado1(item));
        });
        //console.log("putas etiquetas",this.filter_etiquetas)
        this.usuario.visitas.categorias.forEach((item) => {
          this.filter_categorias.push(filter_recomendado2(item));
        });
        this.filter_etiquetas = this.filter_etiquetas.sort(
          (a, b) => a.fecha_registro > b.fecha_registro
        );

        this.principal_recomendado = this.filter_etiquetas[0];

        this.filter_etiquetas = this.filter_etiquetas.slice(1, 3);
        //console.log(this.filter_etiquetas, "etiquetas");
        this.filter_categorias = this.filter_categorias.slice(0, 2);
        //console.log(this.filter_categorias, " categorias");
        this.recomendado = this.filter_etiquetas;
        this.recomendado = this.recomendado.concat(this.filter_categorias);
      }


       //Lo más nuevo
        this.contenido_nuevo = this.contenidos.filter(
          (item) => item.area_terapeutica == this.usuario.especialidad
        );
        this.contenido_nuevo = this.contenido_nuevo.sort(
          (a, b) => a.fecha_registro > b.fecha_registro
        );
        this.principal_nuevo = this.contenido_nuevo.slice(0, 1);
        this.principal_nuevo = this.principal_nuevo[0];
        this.contenido_nuevo = this.contenido_nuevo.slice(1, 5);
        /*console.log(
          "principal",
          this.principal_nuevo,
          "contenido_nuevo",
          this.contenido_nuevo
        );*/
    } else {
      //TENDENCIAS
      console.log("no logueado en index");
      document.querySelector(`.right-nav li.sections a[href="#tendencias"]`).parentElement.classList.remove('displayed');
      document.querySelector(`.right-nav li.sections a[href="#recomendado"]`).parentElement.classList.remove('displayed');
      this.contenidos.filter((item) => {
        this.visitas.push(item.visitas);
      });

      max = Math.max(...this.visitas);

      this.tendencias = this.contenidos.filter((item) => item.activo == true && item.contenido == 'paciente');
      this.tendencias = this.tendencias
        .sort(function (a, b) {
          return b - a;
        })
        .slice(0, 4);

      this.principal = this.contenidos.find((item) => item.visitas == max && item.contenido == 'paciente');

      //Lo más nuevo
      this.contenido_nuevo = this.contenidos.filter(
        (item) => item.activo == true && item.contenido == 'paciente'
      );
      this.contenido_nuevo = this.contenido_nuevo.sort(
        (a, b) => a.fecha_registro > b.fecha_registro
      );
      this.principal_nuevo = this.contenido_nuevo[0];
      this.contenido_nuevo = this.contenido_nuevo.slice(1, 5);
     /* console.log(
        "principal",
        this.principal_nuevo,
        "contenido_nuevo",
        this.contenido_nuevo
      );*/
    }
  },
};
</script>
<style scoped>
</style>