const USUARIO = {
  uid:'',
  nombre: "",
  apellido_materno: "",
  apellido_paterno: "",
  email: "",
  cedula: "",
  especialidad: "",
  estado: "",
  institucion: "",
  sexo: "",
  telefono: "",
  tipo_consulta: "",
  uid: "",
  fecha_registro: "",
  selected: false,
  visitas:{
    etiquetas:[],
    categorias:[]
  },
  favoritos:[],
  isNew:true,
};

const CATEGORIA = {
  uid: "",
  nombre: "",
  imagen:{
    url:"",
    nombre:"",
    ruta:"",
  },
  fecha_registro: ""
};

const CONTENIDO = {
  uid:"",
  contenido: "",
  titulo: "",
  subtitulo: "",
  area_terapeutica: null,
  tipo_contenido: null,
  plataforma: null,
  url_video:null,
  imagen_small: {
    nombre: "",
    url: "",
    ruta: "",
  },
  archivo: {
    nombre: "",
    url: "",
    ruta: "",
  },
  pdf: {
    nombre: "",
    url: "",
    ruta: "",
  },
  articulo: "",
  descripcion: "",
  etiquetas: "",
  articulo: "",
  visitas:0,
};

export { USUARIO, CATEGORIA, CONTENIDO };
