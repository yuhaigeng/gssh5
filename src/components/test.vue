<template>
    <div class="test">
        <h2 v-text="msg"></h2>
        <hr>
        <h3 v-text="count"></h3>
        <button @click="changeCount">增加</button>

    </div>
</template>
<script>
import { mapState , mapMutations , mapActions } from "vuex";
export default {
    name:'test',
    data:function () {
        return{
            msg:'Hello world'
        }
    },
    computed:{
        ...mapState({
            count: state => state.testStore.count

        })
    },
    methods: {
        ...mapMutations([
            'changeCount'
        ]),
    }
}
</script>
