<template>
   <div class="home">
        <app-header></app-header>
        <app-banner></app-banner>
        <app-footer></app-footer>
   </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import appFooter from "../../components/public/footer.vue";
import appBanner from "../../page/home/banner.vue"
export default {
   name: 'home',
   data() {
       return {}
   },
  components: {
    appHeader,
    appFooter,
    appBanner
  }
}
</script>

<style scoped >
    

</style>
