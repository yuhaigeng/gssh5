<template>
   <div class="moreGoods">
        <app-header></app-header>
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
