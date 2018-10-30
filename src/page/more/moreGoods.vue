<template>
   <div class="moreGoods">
        <app-header :type ="headerMsg"></app-header>
        <h1>more</h1>
        <app-footer></app-footer>
   </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import appFooter from "../../components/public/footer.vue";
export default {
   name: 'more',
   data() {
       return {
         headerMsg:{
            type:"common",
            title:'更多商品',
            left:'返回'
         }
       }
   },
  components: {
    appHeader,
    appFooter
  }
}
</script>

<style scoped >
    

</style>
