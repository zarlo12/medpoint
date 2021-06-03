import Vue from 'vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email, min } from "vee-validate/dist/rules";
import { localize } from 'vee-validate';
import es from 'vee-validate/dist/locale/es.json';
localize('es', es);


extend("required", {
  ...required,
  message: "Este campo es obligatorio."
});

extend("email", {
    ...email,
    message: "Correo electrónico invalido"
  });

extend("min", {
  ...min,
  message: "El campo debe tener al menos 6 caracteres"
});

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: 'Tu contraseña no coincide.'
});

extend('email_confirmation', {
    params: ['target'],
    validate(value, { target }) {
      return value === target;
    },
    message: 'Tu correo no coincide.'
  });


// Register it globally
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);