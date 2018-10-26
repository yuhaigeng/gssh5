<template>
   <div class="home">
        <app-header></app-header>
        <app-banner></app-banner>
        
        <homeGoods></homeGoods>
        <alert></alert>
        <app-footer></app-footer>
   </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import appFooter from "../../components/public/footer.vue";
import appBanner from "../../page/home/banner.vue"
import alert from "../../components/public/alert.vue";
import homeGoods from "./homeGoods.vue"
export default {
   name: 'home',
   data() {
       return {}
   },
  components: {
    appHeader,
    appFooter,
    appBanner,
    alert,
    homeGoods
  }
}
</script>

<style scoped >
    

</style>
