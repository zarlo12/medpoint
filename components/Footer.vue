<template>
    <div>
        <b-container class="footer-wrap py-5">
            <b-row class="py-4">
                <b-col md="6">
                    <b-img-lazy :src="require('../assets/img/logo-footer.png')" fluid alt="Responsive image"></b-img-lazy>
                </b-col>
                <b-col md="6">

                </b-col>
            </b-row>
            <b-row class="py-4 second-row" align-v="center" align-content="stretch">
                <b-col md="6" align-self="stretch">
                    <p>© Iniciativa, 2020. Todos los derechos reservados</p>
                    <p>Términos y Condiciones</p>
                    <p>Aviso de Privacidad</p>
                </b-col>
                <b-col md="6">
                    <p>Soy profesional de salud</p>
                    <p>Soy Representante de ventas</p>
                    <p>Soy paciente</p>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>