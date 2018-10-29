<template>
   <div class="message">
        <app-header type="message"></app-header>
        <h1>message</h1>
        <app-footer></app-footer>
   </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import appFooter from "../../components/public/footer.vue";
export default {
   name: 'message',
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
