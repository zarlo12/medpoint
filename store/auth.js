import { db, auth, firebase } from "@/plugins/firebase.js";
import { USUARIO } from "@/constants/index";
const state = () => ({
  usuario: USUARIO,
  logged: null,
  admin: USUARIO,
  isAdmin: null
});

const mutations = {
  asignarUsuario(state, payload) {
    state.usuario = payload;
  },
  asignarAdmin(state, payload) {
    state.admin = payload;
  },
  comprobarLogin(state, payload) {
    state.logged = payload;
  },
  isAdministrador(state, payload) {
    state.isAdmin = payload;
  }
};

const actions = {
  async register({ commit, dispatch }, datos) {
    try {
      await auth.createUserWithEmailAndPassword(datos.email, datos.password);

      const curretUser = auth.currentUser;

      delete datos.password;
      delete datos.password_confirmation;
      delete datos.email_confirmation;

      datos.uid = curretUser.uid;

      datos.fecha_registro = new Date();
      datos.verified = false;
      datos.activo = true;
      datos.visitas = {
        etiquetas: [],
        categorias: []
      };
      datos.favoritos = [];

      
      dispatch("emailVerified", datos);

      db.collection("usuarios")
        .doc(curretUser.uid)
        .set(datos);
      localStorage.setItem("usuario", JSON.stringify(datos));
      commit("asignarUsuario", datos);
      this.$swal({
        title: "¡Su registro se ha completado exitosamente!",
        confirmButtonText: "Cerrar",
        confirmButtonColor: "#FF0000"
      }).then(result => {
        if (result.value) {
          this.app.router.push("/verify-account");
        }
      });
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          this.$swal({
            title: "¡No se ha registrado",
            icon: "error",
            showCloseButton: true,
            closeButtonHtml: "Cerrar x",
            html:
              "Lo sentimos su registro no fue completado exitosamente, vuelva a intentarlo",
            confirmButtonText: "Cerrar",
            confirmButtonColor: "#FF0000"
          });
          break;
      }
    }
  },
  async ingresarUsuario({ dispatch, state, commit }, datos) {
    try {
      const { email, password } = datos;
      await auth.signInWithEmailAndPassword(email, password);
      const curretUser = auth.currentUser;
      if (!datos.admin) {
        dispatch("cargarUsuario", curretUser.uid);
        this.app.router.push("/home");
      } else {
        dispatch("cargarAdmin", curretUser.uid);
        commit("isAdministrador", true);
        this.app.router.push("/admin/users");
      }
    } catch (error) {
      console.log(error);
    }
  },
  async cargarUsuario({ commit }, uid) {
    try {
      localStorage.removeItem("usuario");
      let docRef = db.collection("usuarios").doc(uid);
      let user = await docRef.get();
      if (user.exists) {
        //console.log("existe");
        localStorage.setItem("usuario", JSON.stringify(user.data()));
        let usuario = user.data();
        commit("asignarUsuario", usuario);
        console.log(usuario);
      } else {
        console.log("no encontrado");
      }
    } catch (error) {
      console.log(error);
    }
  },
  async cargarAdmin({ commit }, uid) {
    try {
      let docRef = db.collection("administradores").doc(uid);
      let user = await docRef.get();
      if (user.exists) {
        localStorage.setItem("usuario", JSON.stringify(user.data()));
        commit("isAdministrador", true);
        commit("asignarAdmin", user.data());
      } else {
        console.log("no encontrado");
      }
    } catch (error) {
      console.log(error);
    }
  },
  async verficarSesion({ commit, dispatch }) {
    try {
      await auth.onAuthStateChanged(() => {
        const user = auth.currentUser;
        //console.log("authchanged",user)
        if (user) {
          commit("comprobarLogin", true);
          setTimeout(() => {
            let usuario = JSON.parse(localStorage.getItem("usuario"));
            //console.log(usuario)
            if (usuario.role) {
              console.log("es un admin");
              commit("isAdministrador", true);
            }
          }, 2000);
        } else {
          commit("comprobarLogin", null);
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  async recuperarPassword({}, email) {
    try {
      console.log(email);
      await auth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error);
    }
  },
  cargarLocalStorage({ commit }) {
    if (localStorage.getItem("usuario")) {
      //console.log(localStorage.getItem("usuario"))
      let usuario = JSON.parse(localStorage.getItem("usuario"));
      if (usuario.role == "admin") {
        commit("isAdministrador", true);
        commit("asignarAdmin", usuario);
      } else {
        commit("asignarUsuario", usuario);
      }
    } else {
      return commit("asignarUsuario", USUARIO);
    }
  },
  async logginOut({commit,dispatch},) {
    try {
      await auth.signOut();
      localStorage.removeItem("usuario");
      this.app.router.push("/");
      commit("isAdministrador",null)
      commit("asignarAdmin",USUARIO)
      commit("asignarUsuario", USUARIO);
      return
    } catch (error) {
      console.log;
    }
  },

  emailVerified({}, datos) {
    const { email, uid } = datos;
    const data = new FormData();
    data.append("email", email);
    data.append("id", uid);
    console.log(data);
    try {
      fetch("https://proyectoshm.com/pruebaMail/testMail.php", {
        method: "POST",
        body: data
      }).then(response => {
        console.log(response);
      });
      
    } catch (error) {
      console.log(error);
    }
  },

  async verifiedAccount({commit,dispatch},uid){
      let userRef = db.collection("usuarios").doc(uid);
      await userRef.set(
        {
          verified: true
        },
        { merge: true }
      );
      dispatch("cargarUsuario", uid);
  },
  async updateVisitas({ commit, dispatch }, usuario) {
    try {
      let userRef = db.collection("usuarios").doc(usuario.id);
      await userRef.set(
        {
          visitas: usuario.visitas
        },
        { merge: true }
      );
      dispatch("cargarUsuario", usuario.id);
    } catch (error) {
      console.log(error);
    }
  },

  async addFavorito({ commit, dispatch }, usuario) {
    try {
      let userRef = db.collection("usuarios").doc(usuario.id);
      await userRef.set(
        {
          favoritos: usuario.favoritos
        },
        { merge: true }
      );
      dispatch("cargarUsuario", usuario.id);
    } catch (error) {
      console.log(error);
    }
  }
};

const getters = {
  etiquetas(state) {
    return state.usuario.visitas.etiquetas;
  },
  categorias(state) {
    return state.usuario.visitas.categorias;
  },
  favoritos(state) {
    return state.usuario.favoritos;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
