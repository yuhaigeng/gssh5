<template>
   <div class="home">
        <app-header></app-header>
        <h1>hello world</h1>
        <homeGoods></homeGoods>
        <alert></alert>
        <app-footer></app-footer>
   </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import appFooter from "../../components/public/footer.vue";
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
    alert,
    homeGoods
  }
}
</script>

<style scoped >
    

</style>
