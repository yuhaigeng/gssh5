<template>
   <div class="moreGoods">
        <app-header type = "more"></app-header>
        <h1>more</h1>
        <app-footer-go-shop></app-footer-go-shop>
   </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import appFooterGoShop from "../../components/footerGoShop.vue";
export default {
   name: 'more',
   data() {
       return {}
   },
  components: {
    appHeader,
    appFooterGoShop
  }
}
</script>

<style scoped >
    

</style>
