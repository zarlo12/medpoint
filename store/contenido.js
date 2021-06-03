import { db, firebase } from "@/plugins/firebase.js";

import { CONTENIDO } from "@/constants/index";
import { ID } from "@/helpers/index";
import { ajustaPropiedadesIndefinidas } from "@/helpers/index";
import { merge } from "jquery";
const state = () => ({
  contenido: CONTENIDO,
  contenidos: [],
  uploadValue: 0,
  uploadValue2: 0,
  uploadValue3: 0,
  ubicacion: "",
  load: false
});

const mutations = {
  cargarContenidos(state, payload) {
    state.contenidos = payload;
  },
  loading(state, payload) {
    state.load = payload;
  },
  eliminarContenido(state, payload) {
    state.contenidos = state.contenidos.filter(item => item.uid !== payload)
  },
};

const actions = {
  async crearContenido({ commit, dispatch }, contenido) {
    try {
      contenido.fecha_registro = new Date();
      contenido.activo = true;
      contenido.isNew = true;
      let contRef = db.collection("contenidos");
      contRef.add(contenido);
      //console.log("Super creadote con exitote")
      this.$swal(
        "Contenido Creado",
        "¡Su contenido se ha agregado correctamente!",
        "success"
      ).then((result) => {
        if (result.value) {
          this.$router.replace("/admin/contenidos");
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  async subirArchivo({ commit, dispatch }, datos) {
    try {
      let load = true;
      commit("loading", load);
      let number1 = Math.random();
      let number2 = Math.random();
      let id1 = number1.toString(36).substr(2, 9); // 'xtis06h6'
      let id2 = number2.toString(36).substr(2, 9); // 'xtis06h6'

      let archivos = {
        archivo1: {
          nombre: "",
          url: "",
          ruta: ""
        },
        archivo2: {
          nombre: "",
          url: "",
          ruta: ""
        },
        archivo3: {
          nombre: "",
          url: "",
          ruta: ""
        }
      };
      let archivos_array = datos[0];
      console.log(archivos_array);
      let contenido = datos[1];
      if (archivos_array != null) {
        let imagen1 = archivos_array[0];
        let pdf = archivos_array[1];
        let file = archivos_array[2];
        const storageRef = firebase.storage().ref();
        let tipo_archivo;

        if (file) {
          let number3 = Math.random();
          let id3 = number3.toString(36).substr(2, 9); // 'xtis06h6'
          tipo_archivo = file.type;
          archivos.archivo3.nombre = id3 + file.name;
          if (tipo_archivo.includes("image")) {
            archivos.archivo3.ruta = `imagenes/${id3}${file.name}`;
          }
        }
        let tipo_img = imagen1.type;
        let tipo_pdf = pdf.type;
        if (tipo_img.includes("image")) {
          archivos.archivo1.ruta = `imagenes/${id1}${imagen1.name}`;
        }
        if (tipo_pdf.includes("pdf")) {
          archivos.archivo2.ruta = `archivos/${id2}${pdf.name}`;
        }

        archivos.archivo1.nombre = id1 + imagen1.name;
        archivos.archivo2.nombre = id2 + pdf.name;

        const uploadTask = storageRef.child(archivos.archivo1.ruta);
        const task = uploadTask.put(imagen1);
        if (imagen1) {
          task.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            snapshot => {
              let porcentaje =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              this.uploadValue = porcentaje;
              console.log(this.uploadValue);
            },
            error => {
              console.log(error);
            },
            async () => {
              this.uploadValue = 100;
              const response = await task.snapshot.ref.getDownloadURL();
              archivos.archivo1.url = response;

              //subir archivo 2
              const uploadTask2 = storageRef.child(archivos.archivo2.ruta);
              const task2 = uploadTask2.put(pdf);
              if (pdf) {
                task2.on(
                  firebase.storage.TaskEvent.STATE_CHANGED,
                  snapshot => {
                    let porcentaje2 =
                      (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    this.uploadValue2 = porcentaje2;
                    console.log(this.uploadValue2);
                  },
                  error => {
                    console.log(error);
                  },
                  async () => {
                    this.uploadValue2 = 100;
                    const response2 = await task2.snapshot.ref.getDownloadURL();
                    archivos.archivo2.url = response2;
                    if (file) {
                      const uploadTask3 = storageRef.child(
                        archivos.archivo3.ruta
                      );
                      const task3 = uploadTask3.put(file);
                      task3.on(
                        firebase.storage.TaskEvent.STATE_CHANGED,
                        snapshot => {
                          let porcentaje3 =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                          this.uploadValue3 = porcentaje3;
                          console.log(this.uploadValue3);
                        },
                        error => {
                          console.log(error);
                        },
                        async () => {
                          this.uploadValue3 = 100;
                          const response3 = await task3.snapshot.ref.getDownloadURL();
                          archivos.archivo3.url = response3;
                          console.log("todos los elementos subidos con exito");
                          console.log(archivos);
                          contenido.imagen_small = archivos.archivo1;
                          contenido.pdf = archivos.archivo2;
                          contenido.archivo = archivos.archivo3;
                          console.log(contenido);
                          dispatch("crearContenido", contenido);
                          load = false;
                          commit("loading", load);
                        }
                      );
                    } else {
                      contenido.imagen_small = archivos.archivo1;
                      contenido.pdf = archivos.archivo2;
                      dispatch("crearContenido", contenido);
                      load = false;
                      commit("loading", load);
                    }
                  }
                );
              }
            }
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  async obtenerContenidos({ commit, dispatch }) {
    try {
      let contref = db.collection("contenidos");
      const contenidos = await contref.get();
      const contenidosArray = [];
      if (contenidos.docs.length > 0) {
        for (const contenido of contenidos.docs) {
          let cont = contenido.data();
          cont.uid = contenido.id;
          let response = await dispatch('contenidoIsNew',cont)
          if(response > 5){
            cont.isNew = false;
          }
          if (cont.activo != false) {
            contenidosArray.push(cont);
          }
        }
        //console.log(contenidosArray);
        commit("cargarContenidos", contenidosArray);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async eliminarContenidos({ commit, dispatch }, contenidos) {
    try {
      contenidos.forEach(async item => {
        let contRef = db.collection("contenidos").doc(item.uid);
        await contRef.update({ activo: false });
        commit('eliminarContenido',item.uid)
      });
      
    } catch (error) {
      console.log(error);
    }
  },

  uploadArchivo({ commit }, archivo) {
    return new Promise((resolve, reject) => {
      let load;
      const storageRef = firebase.storage().ref();
      let number = Math.random();
      let id = number.toString(36).substr(2, 9);
      let archivoU = {};
      if (archivo.type.includes("image")) {
        archivoU.ruta = `imagenes/${id}${archivo.name}`;
      } else {
        archivoU.ruta = `archivos/${id}${archivo.name}`;
      }
      archivoU.nombre = id + archivo.name;
      const uploadTask = storageRef.child(archivoU.ruta);
      const task = uploadTask.put(archivo);
      load = true;
      commit("loading", load);
      task.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          let porcentaje =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.uploadValue = porcentaje;
          console.log(this.uploadValue);
        },
        error => {
          reject(error);
        },
        async () => {
          load = false;
          commit("loading", load);
          this.uploadValue = 100;
          const response = await task.snapshot.ref.getDownloadURL();
          archivoU.url = response;
          resolve(archivoU);
        }
      );
    });
  },
  removeFile({ commit }, data) {
    return new Promise((resolve, reject) => {
      const storageRef = firebase.storage().ref();
      const dataRef = storageRef.child(`${data}`);
      resolve(dataRef.delete()),
        error => {
          reject(error);
        };
    });
  },

  async updateVisita({ commit }, contenido) {
    try {
      let contref = db.collection("contenidos").doc(contenido.id);
      await contref.update({
        visitas: contenido.visitas
      });
    } catch (error) {
      console.log(error);
    }
  },

  async editContenido({ commit, dispatch }, contenido) {
    try {
      contenido.fecha_update = new Date();
      let contref = db.collection("contenidos").doc(contenido.uid);
      await contref.update(contenido);
      dispatch("obtenerContenidos");
      this.$swal(
        "Contenido Editado",
        "¡Su contenido se ha editado correctamente!",
        "success"
      ).then((result) => {
        if (result.value) {
          this.$router.replace("/admin/contenidos");
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  async contenidoIsNew({ commit, dispatch }, contenido) {
    return new Promise((resolve, reject) => {
      const unixTime = secs => {
        let t = new Date(1970, 0, 1);
        t.setSeconds(secs);
        return t;
      };
      let fecha_create = unixTime(contenido.fecha_registro.seconds);
      let fecha_hoy = new Date();
      let tiempo = fecha_hoy.getTime() - fecha_create.getTime();
      let diff_in_days = Math.floor(tiempo / (1000 * 60 * 60 * 24));
      if(diff_in_days > 5){
        let contref = db.collection("contenidos").doc(contenido.uid);
        contref.set({
        isNew: false
        },{merge:true});
      }
      resolve(diff_in_days),
        error => {
          reject(error);
        };
    });
  }
};

export default {
  state,
  mutations,
  actions
};
