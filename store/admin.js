import { db } from "@/plugins/firebase.js";
import {USUARIO,CATEGORIA} from "@/constants/index"
import {ajustaPropiedadesIndefinidas} from '@/helpers/index'
const state = () => ({
  usuario: USUARIO,
  usuarios:[],
  categoria:CATEGORIA,
  categorias:[]
});

const mutations = {
  cargarUsers(state, payload) {
    state.usuarios = payload
  },
  datosUser(state,payload){
    state.usuario = payload;
  },
  cargarCategorias(state, payload){
    state.categorias = payload;
  },
  eliminarCategoria(state, payload) {
    state.categorias = state.categorias.filter(item => item.uid !== payload)
  },
  eliminarUsuario(state, payload) {
    state.usuarios = state.usuarios.filter(item => item.uid !== payload)
  },
};

const actions = {
 async usersLoad({commit}){
   try {
     let docUser =  db.collection('usuarios')
     const users = await docUser.get()
     console.log(users)
     const usersArray = []
     if(users.docs.length > 0){
       for (const user of users.docs ){
         let usuario = user.data()
         if(usuario.activo != false){
            usersArray.push(usuario)
         }
       }
       commit('cargarUsers',usersArray)
     }
   } catch (error) {
     console.log(error);
   }
 },
 async cargarUsuario({commit},uid){
  try {
    let docRef = db.collection("usuarios").doc(uid);
    let user = await docRef.get();
    if(user){
      commit('datosUser',user.data());
    }
  } catch (error) {
    console.log(error)
  }
},
async crearCategoria({commit,dispatch},categoria){
    try {
      let catRef = db.collection("categorias")
      categoria.fecha_registro = new Date()
      delete categoria.uid;
      catRef.add(categoria);
      dispatch('obtenerCategorias')
    } catch (error) {
      console.log(error);
    }
},
async obtenerCategorias({commit}){
  try {
    let catref = db.collection("categorias")
    const categorias = await catref.get()
    const categoriasArray = []
    if(categorias.docs.length > 0){
      for (const categoria of categorias.docs ){
        let cat = categoria.data();
        cat.uid = categoria.id;
        categoriasArray.push(cat)
      }
      commit('cargarCategorias',categoriasArray)
    }
  } catch (error) {
    console.log(error);
  }
},
async editCategoria({commit,dispatch},categoria){
  try {
    categoria.fecha_update = new Date();
    let catref = db.collection("categorias").doc(categoria.uid)
     await catref.update(categoria)
    dispatch('obtenerCategorias')
  } catch (error) {
    console.log(error)
  }
},
async deleteCategoria({commit,dispatch},categorias){
  try {
    categorias.forEach(async (item) => {
      let catref = db.collection("categorias").doc(item.uid)
      await catref.delete()
      commit('eliminarCategoria',item.uid)
   })
  } catch (error) {
    console.log(error)
  }
},
async deleteUsuario({commit,dispatch},usuarios){
  try {
    usuarios.forEach(async (item) => {
      let userRef = db.collection('usuarios').doc(item.uid)
      await userRef.update({activo:false})
      commit('eliminarUsuario',item.uid)
   })
  } catch (error) {
    console.log(error)
  }
}

};


export default {
  state,
  mutations,
  actions
};
