<template>
    <div>
        <Area :id="$route.params.id"></Area>
    </div>
</template>

<script>
import Area from './components/Area'
export default {
components:{
    Area
}
}
</script>