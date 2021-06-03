<template>
    <Detalle :id="$route.params.id" />
</template>

<script>
import Detalle from './components/Detalle'
export default {
    components:{
        Detalle
    }
}
</script>