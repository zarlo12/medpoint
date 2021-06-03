import $ from 'jquery';
import moment from 'moment'
import { CATEGORIA } from '~/constants';
const ajustaPropiedadesIndefinidas = (objetoBase, objetoNuevo) => $.extend(true, objetoBase, objetoNuevo);


const formatoFecha = (fecha, tipo ="normal", idioma='es') => {

    if (fecha === null || fecha===undefined) return "";
  
    let meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio",
    "Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
  
    let dias = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sabado",]
  
    if(idioma !== 'es'){
      dias = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",]
  
      meses = ["January", "February", "March", "April", "May", "June", "July", 
      "August", "September", "October", "November", "December"]
    }
  
    let seconds 
  
    if(typeof fecha !=="string"){
      seconds = fecha.seconds 
    } else {
      const date = moment(fecha);
      seconds = moment(date).unix()
    }
    const f = moment(seconds*1000)
  
    //2020-09-17T22:00:00Z
  
    switch(tipo){
      case "normal":
        return `${f.date()} ${meses[f.month()]} ${f.year()}`
      case "itinerario":
        if(idioma !== 'es'){
          return `${dias[f.day()]}, ${meses[f.month()]} ${f.date()}`
        }else{
          return `${dias[f.day()]} ${f.date()} de ${meses[f.month()]}`
        }
      case "formateada":
        return f.format()
    }
  
  }

  const ID = () =>{
    let number = Math.random() // 0.9394456857981651
    number.toString(36); // '0.xtis06h6'
    let ID = number.toString(36).substr(2, 9);
    return ID;
  };

  const nombreCategoria = (id,categorias) => {
    let categoria = CATEGORIA;
    categoria = categorias.find(item => item.uid == id);
    let nombre = categoria.nombre;
    return nombre;
  }

  const ISADD = (id,favoritos)=>{
    let agregado = false
    console.log(favoritos,id)
    return agregado;
  }




  const convertirSlug = (palabra) => {
  
    var slug = "";
    // Change to lower case
    var titleLower = palabra.toLowerCase();
    
    // Letter "e"
    slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e');
    // Letter "a"
    slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a');
    // Letter "o"
    slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o');
    // Letter "u"
    slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u');

    // Letter "i"
    slug = slug.replace(/i|í|ï|ì/gi, 'i');


    // Letter "d"
    slug = slug.replace(/đ/gi, 'd');
    // Trim the last whitespace
    slug = slug.replace(/\s*$/g, '');
    // Change whitespace to "-"
    slug = slug.replace(/\s+/g, '-');
    
    return slug;

}


export {
    ajustaPropiedadesIndefinidas,
    formatoFecha,
    ID,
    nombreCategoria,
    ISADD,
    convertirSlug
    
}
