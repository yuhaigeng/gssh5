<template>
   <div class="home">
        <app-header type="home"></app-header>
        <h1>hello world</h1>
        <app-footer></app-footer>
   </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import appFooter from "../../components/public/footer.vue";
export default {
   name: 'home',
   data() {
       return {}
   },
  components: {
    appHeader,
    appFooter
  }
}
</script>

<style scoped >
    

</style>
