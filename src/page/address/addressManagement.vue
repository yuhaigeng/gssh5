<template>
     <div class="address">
         <header :type="headerMsg"></header>
     </div>
</template>

<script>
import header from "../../components/public/header.vue";
    export default {
        name:'addressManagement',
        components:{
            header
        },
         data() {
             return {
                headerMsg:{
                    type:"common1",
                    title:'地址管理',
                    jumpFront:"",
                    jumpAfter:'',
                    right:'新增地址',
                    left:'返回'
                },
             }
         },
    }
</script>

<style scoped>
</style>
