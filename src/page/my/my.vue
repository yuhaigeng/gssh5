<template>
   <div class="my">
        <app-header></app-header>
        <h1>my</h1>
        <app-footer></app-footer>
   </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import appFooter from "../../components/public/footer.vue";
export default {
   name: 'my',
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
